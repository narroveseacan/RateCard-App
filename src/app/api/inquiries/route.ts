import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getActiveServices, toPriced } from "@/lib/data";
import { computeEstimate } from "@/lib/pricing";
import { BLOCKED_MESSAGE, findBlockedCategories } from "@/lib/policy";

const schema = z.object({
  brandName: z.string().trim().min(2).max(120),
  brandIndustry: z.string().trim().min(2).max(120),
  picName: z.string().trim().min(2).max(120),
  picContact: z.string().trim().min(5).max(120),
  contactChannel: z.enum(["whatsapp", "email"]).default("whatsapp"),
  targetPublishDate: z.string().optional().nullable(),
  briefSummary: z.string().trim().min(20).max(4000),
  policyAccepted: z.literal(true),
  website: z.string().optional(), // honeypot
  selection: z.record(z.string(), z.number().int().min(0).max(99)),
  retainer: z.boolean().default(false),
});

async function nextReferenceCode() {
  const year = new Date().getFullYear();
  const count = await prisma.bookingInquiry.count({ where: { referenceCode: { startsWith: `PBK-${year}-` } } });
  return `PBK-${year}-${String(count + 1).padStart(4, "0")}`;
}

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Data brief belum lengkap atau tidak valid. Periksa kembali isian kamu." }, { status: 400 });
  }
  const d = parsed.data;
  if (d.website) return NextResponse.json({ error: "Permintaan ditolak." }, { status: 400 });

  // Validasi kategori terlarang di server (anti-bypass UI).
  if (findBlockedCategories(d.brandName, d.brandIndustry, d.briefSummary).length) {
    return NextResponse.json({ error: BLOCKED_MESSAGE }, { status: 422 });
  }

  const services = (await getActiveServices()).map(toPriced);
  const estimate = computeEstimate(services, d.selection, d.retainer);
  if (estimate.isEmpty) {
    return NextResponse.json({ error: "Pilih minimal satu layanan atau paket." }, { status: 400 });
  }

  for (let attempt = 0; attempt < 3; attempt++) {
    const referenceCode =
      attempt === 0 ? await nextReferenceCode() : `${await nextReferenceCode()}-${Math.random().toString(36).slice(2, 5).toUpperCase()}`;
    try {
      await prisma.bookingInquiry.create({
        data: {
          referenceCode,
          brandName: d.brandName,
          brandIndustry: d.brandIndustry,
          picName: d.picName,
          picContact: d.picContact,
          contactChannel: d.contactChannel,
          selectedItemsJson: estimate.lines,
          isRetainer3Months: d.retainer,
          subtotalIdr: estimate.contractSubtotal,
          discountIdr: estimate.discount,
          totalEstimateIdr: estimate.total,
          paymentScheme: estimate.paymentScheme,
          briefSummary: d.briefSummary,
          targetPublishDate: d.targetPublishDate ? new Date(d.targetPublishDate) : null,
          policyAccepted: true,
        },
      });
      return NextResponse.json({ referenceCode, estimate }, { status: 201 });
    } catch (e) {
      if ((e as { code?: string }).code !== "P2002") throw e;
    }
  }
  return NextResponse.json({ error: "Gagal membuat kode referensi. Coba lagi." }, { status: 500 });
}
