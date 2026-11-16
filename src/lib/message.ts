import { formatIdr } from "@/lib/format";
import { paymentSchemeLabel, RETAINER_MONTHS, type Estimate } from "@/lib/pricing";

export type BriefPayload = {
  referenceCode: string;
  brandName: string;
  brandIndustry: string;
  picName: string;
  picContact: string;
  briefSummary: string;
  targetPublishDate?: string | null;
  retainer: boolean;
  estimate: Estimate;
};

export function buildBriefMessage(p: BriefPayload) {
  const e = p.estimate;
  const lines = [
    `Halo Perbekasian, saya mau ajukan brief kerja sama.`,
    ``,
    `Kode referensi: ${p.referenceCode}`,
    `Brand: ${p.brandName} (${p.brandIndustry})`,
    `PIC: ${p.picName} · ${p.picContact}`,
    p.targetPublishDate ? `Target tayang: ${p.targetPublishDate}` : null,
    ``,
    `Rincian paket${p.retainer ? " (per bulan)" : ""}:`,
    ...e.lines.map((l) =>
      l.percent ? `- ${l.name} (+${l.percent}%): ${formatIdr(l.lineTotal)}` : `- ${l.qty}× ${l.name}: ${formatIdr(l.lineTotal)}`,
    ),
    ``,
    p.retainer
      ? `Kontrak ${RETAINER_MONTHS} bulan: ${formatIdr(e.contractSubtotal)} − diskon 15% ${formatIdr(e.discount)} = ${formatIdr(e.total)} (${formatIdr(e.monthlyAfterDiscount)}/bulan)`
      : `Estimasi total: ${formatIdr(e.total)}`,
    `Ketentuan bayar: ${paymentSchemeLabel(e.paymentScheme)}`,
    ``,
    `Ringkasan brief:`,
    p.briefSummary,
    ``,
    `(Estimasi dari rate card website, harga gross. Saya sudah membaca ketentuan kerja sama.)`,
  ].filter((l) => l !== null);
  return lines.join("\n");
}

export function waLink(number: string, text: string) {
  const n = number.replace(/\D/g, "").replace(/^0/, "62");
  return `https://wa.me/${n}?text=${encodeURIComponent(text)}`;
}

export function mailtoLink(email: string, subject: string, body: string) {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
