import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.affiliateProduct.updateMany({ where: { id, isActive: true }, data: { clickCount: { increment: 1 } } }).catch(() => {});
  return new NextResponse(null, { status: 204 });
}
