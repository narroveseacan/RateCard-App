// Kalkulator estimasi — dipakai di klien (UI) dan server (POST /api/inquiries) agar hasilnya identik.

export const RETAINER_MONTHS = 3;
export const RETAINER_DISCOUNT = 0.15;
export const DP_THRESHOLD_IDR = 500_000;

export type PricedService = {
  id: string;
  code: string;
  name: string;
  category: "ENDORSE" | "PAID_PROMOTE" | "BUNDLE" | "ADDON";
  pricingType: "FIXED" | "PERCENT";
  basePriceIdr: number;
  percentOfContent: number | null;
};

export type Selection = Record<string, number>; // serviceId -> qty (add-on persen: 0/1)

export type LineItem = {
  serviceId: string;
  code: string;
  name: string;
  qty: number;
  unitPrice: number;
  lineTotal: number;
  percent?: number;
};

export type PaymentSchemeKey = "FULL_UPFRONT" | "DP_50_SPLIT";

export type Estimate = {
  lines: LineItem[];
  contentSubtotal: number; // per bulan: item konten + paket
  addonPercentTotal: number; // persen add-on dijumlahkan, bukan dikalikan
  addonTotal: number;
  monthlySubtotal: number;
  months: number;
  contractSubtotal: number;
  discount: number;
  total: number;
  monthlyAfterDiscount: number;
  paymentScheme: PaymentSchemeKey;
  dpAmount: number;
  isEmpty: boolean;
};

export function computeEstimate(services: PricedService[], selection: Selection, retainer: boolean): Estimate {
  const byId = new Map(services.map((s) => [s.id, s]));
  const lines: LineItem[] = [];
  const percentItems: PricedService[] = [];
  let contentSubtotal = 0;
  let fixedAddon = 0;

  for (const [id, rawQty] of Object.entries(selection)) {
    const s = byId.get(id);
    const qty = Math.max(0, Math.min(99, Math.floor(Number(rawQty) || 0)));
    if (!s || qty === 0) continue;
    if (s.pricingType === "PERCENT") {
      percentItems.push(s);
      continue;
    }
    const lineTotal = s.basePriceIdr * qty;
    lines.push({ serviceId: s.id, code: s.code, name: s.name, qty, unitPrice: s.basePriceIdr, lineTotal });
    if (s.category === "ADDON") fixedAddon += lineTotal;
    else contentSubtotal += lineTotal;
  }

  // Add-on persen dihitung dari harga konten terkait, persentasenya dijumlahkan.
  let pct = 0;
  let percentAmount = 0;
  for (const s of percentItems) {
    const p = s.percentOfContent ?? 0;
    const lineTotal = Math.round((contentSubtotal * p) / 100);
    pct += p;
    percentAmount += lineTotal;
    lines.push({ serviceId: s.id, code: s.code, name: s.name, qty: 1, unitPrice: lineTotal, lineTotal, percent: p });
  }

  const monthlySubtotal = contentSubtotal + percentAmount + fixedAddon;
  const months = retainer ? RETAINER_MONTHS : 1;
  const contractSubtotal = monthlySubtotal * months;
  const discount = retainer ? Math.round(contractSubtotal * RETAINER_DISCOUNT) : 0;
  const total = contractSubtotal - discount;
  // Ambang DP dievaluasi pada nilai kontrak/tagihan yang disepakati (total kontrak 3 bulan bila retainer).
  const paymentScheme: PaymentSchemeKey = total >= DP_THRESHOLD_IDR ? "DP_50_SPLIT" : "FULL_UPFRONT";

  return {
    lines,
    contentSubtotal,
    addonPercentTotal: pct,
    addonTotal: percentAmount + fixedAddon,
    monthlySubtotal,
    months,
    contractSubtotal,
    discount,
    total,
    monthlyAfterDiscount: Math.round(total / months),
    paymentScheme,
    dpAmount: paymentScheme === "DP_50_SPLIT" ? Math.round(total / 2) : total,
    isEmpty: monthlySubtotal === 0,
  };
}

export const paymentSchemeLabel = (s: PaymentSchemeKey) =>
  s === "DP_50_SPLIT" ? "DP 50% di awal, pelunasan 50% setelah preview disetujui (sebelum tayang)" : "Pelunasan 100% di depan saat booking";

export const paymentSchemeShort = (s: PaymentSchemeKey) => (s === "DP_50_SPLIT" ? "DP 50%" : "Lunas 100%");
