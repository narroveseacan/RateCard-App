"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import { formatIdr } from "@/lib/format";
import { buildBriefMessage, mailtoLink, waLink } from "@/lib/message";
import {
  computeEstimate,
  DP_THRESHOLD_IDR,
  paymentSchemeLabel,
  paymentSchemeShort,
  RETAINER_MONTHS,
  type Estimate,
  type PricedService,
  type Selection,
} from "@/lib/pricing";
import { BLOCKED_INDUSTRY_OPTIONS, BLOCKED_MESSAGE, findBlockedCategories, INDUSTRY_OPTIONS } from "@/lib/policy";
import { Badge, Button, buttonClass, Checkbox, Input, Notice, Select, Textarea } from "@/components/ui";

export type BuilderService = PricedService & {
  description: string;
  deliverables: string[];
  compareAtPriceIdr: number | null;
  unitLabel: string;
  badge: string | null;
};

const GROUPS: { key: BuilderService["category"]; title: string; sub: string }[] = [
  { key: "ENDORSE", title: "Endorse", sub: "Dibuat tim kami, gaya Perbekasian (IG + TikTok)." },
  { key: "PAID_PROMOTE", title: "Paid Promote", sub: "Materi dari brand, tayang di akun kami." },
  { key: "BUNDLE", title: "Paket Hemat", sub: "Harga coret = jumlah harga item asli." },
  { key: "ADDON", title: "Add-on", sub: "Persentase add-on dijumlahkan, dihitung dari harga konten." },
];

type FormState = {
  brandName: string;
  brandIndustry: string;
  picName: string;
  picContact: string;
  contactChannel: "whatsapp" | "email";
  targetPublishDate: string;
  briefSummary: string;
  policyAccepted: boolean;
  website: string; // honeypot
};

type Success = { referenceCode: string; estimate: Estimate; retainer: boolean; form: FormState };

export function RateCardBuilder({
  services,
  businessWa,
  businessEmail,
}: {
  services: BuilderService[];
  businessWa: string;
  businessEmail: string;
  validTo: string;
}) {
  const [selection, setSelection] = useState<Selection>({});
  const [retainer, setRetainer] = useState(false);
  const [form, setForm] = useState<FormState>({
    brandName: "",
    brandIndustry: "",
    picName: "",
    picContact: "",
    contactChannel: "whatsapp",
    targetPublishDate: "",
    briefSummary: "",
    policyAccepted: false,
    website: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState<Success | null>(null);

  const est = useMemo(() => computeEstimate(services, selection, retainer), [services, selection, retainer]);
  const blocked = useMemo(
    () => findBlockedCategories(form.brandName, form.brandIndustry, form.briefSummary),
    [form.brandName, form.brandIndustry, form.briefSummary],
  );

  const setQty = (id: string, qty: number) => setSelection((s) => ({ ...s, [id]: Math.max(0, Math.min(99, qty)) }));
  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  function validate() {
    const e: typeof errors = {};
    if (form.brandName.trim().length < 2) e.brandName = "Isi nama brand (minimal 2 huruf).";
    if (!form.brandIndustry) e.brandIndustry = "Pilih industri brand kamu.";
    if (form.picName.trim().length < 2) e.picName = "Isi nama PIC yang bisa kami hubungi.";
    const c = form.picContact.trim();
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c);
    const isPhone = /^\+?[0-9\s-]{9,16}$/.test(c);
    if (!isEmail && !isPhone) e.picContact = "Tulis nomor WhatsApp (contoh 0812xxxx) atau email yang valid.";
    if (form.briefSummary.trim().length < 20) e.briefSummary = "Ceritakan produk, tujuan, dan pesan utama (minimal 20 karakter).";
    if (!form.policyAccepted) e.policyAccepted = "Centang pernyataan kepatuhan untuk melanjutkan.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function submit(ev: React.FormEvent) {
    ev.preventDefault();
    setServerError(null);
    if (est.isEmpty || blocked.length || !validate()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, selection, retainer }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setServerError(json.error ?? "Brief belum terkirim. Coba lagi sebentar lagi.");
        if (json.fieldErrors) setErrors(json.fieldErrors);
        return;
      }
      setSuccess({ referenceCode: json.referenceCode, estimate: json.estimate, retainer, form });
      requestAnimationFrame(() => document.getElementById("brief")?.scrollIntoView({ behavior: "smooth", block: "start" }));
    } catch {
      setServerError("Koneksi terputus saat mengirim brief. Periksa internet kamu lalu coba lagi.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mt-8 grid gap-6 pb-24 md:grid-cols-[3fr_2fr] md:pb-0">
      {/* Kiri: katalog layanan */}
      <div className="grid content-start gap-8">
        {GROUPS.map((g) => {
          const items = services.filter((s) => s.category === g.key);
          if (!items.length) return null;
          return (
            <section key={g.key} aria-labelledby={`grp-${g.key}`}>
              <h3 id={`grp-${g.key}`} className="text-h3">
                {g.title}
              </h3>
              <p className="text-sm text-text-muted">{g.sub}</p>
              <ul className={cn("mt-4 grid gap-3", g.key === "ADDON" && "sm:grid-cols-2")}>
                {items.map((s) => (
                  <li key={s.id}>
                    <ServiceRow s={s} qty={selection[s.id] ?? 0} onQty={(q) => setQty(s.id, q)} compact={g.key === "ADDON"} />
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      {/* Kanan: ringkasan + brief (sticky di desktop) */}
      <div className="md:relative">
        <div className="grid gap-4 md:sticky md:top-4">
          <SummaryCard est={est} retainer={retainer} onRetainer={setRetainer} />

          <section id="brief" aria-labelledby="brief-title" className="scroll-mt-4 rounded-md border border-border bg-surface p-6 shadow-sm">
            {success ? (
              <SuccessPanel success={success} businessWa={businessWa} businessEmail={businessEmail} onReset={() => setSuccess(null)} />
            ) : (
              <form onSubmit={submit} noValidate className="grid gap-4">
                <div>
                  <p className="text-label text-text-muted">Form brief</p>
                  <h3 id="brief-title" className="mt-1 text-h3">
                    Ceritakan kampanye kamu
                  </h3>
                </div>
                <Input label="Nama brand" value={form.brandName} onChange={(e) => set("brandName", e.target.value)} error={errors.brandName} autoComplete="organization" required />
                <Select label="Industri" value={form.brandIndustry} onChange={(e) => set("brandIndustry", e.target.value)} error={errors.brandIndustry} required>
                  <option value="">Pilih industri…</option>
                  {INDUSTRY_OPTIONS.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                  <optgroup label="Kategori yang tidak kami terima">
                    {BLOCKED_INDUSTRY_OPTIONS.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </optgroup>
                </Select>
                <Input label="Nama PIC" value={form.picName} onChange={(e) => set("picName", e.target.value)} error={errors.picName} autoComplete="name" required />
                <Input
                  label="Kontak PIC (WhatsApp atau email)"
                  value={form.picContact}
                  onChange={(e) => set("picContact", e.target.value)}
                  error={errors.picContact}
                  hint="Contoh: 0812 3456 7890 atau nama@brand.co.id"
                  inputMode="email"
                  required
                />
                <Input
                  label="Target tanggal tayang"
                  type="date"
                  value={form.targetPublishDate}
                  min={new Date().toISOString().slice(0, 10)}
                  onChange={(e) => set("targetPublishDate", e.target.value)}
                  hint="Opsional. Reels Dedicated 3D butuh 7–10 hari kerja."
                />
                <Textarea
                  label="Ringkasan brief"
                  value={form.briefSummary}
                  onChange={(e) => set("briefSummary", e.target.value)}
                  error={errors.briefSummary}
                  hint="Produk, tujuan kampanye, pesan utama, dan hal yang wajib/tidak boleh disebut."
                  rows={5}
                  required
                />
                <fieldset className="grid gap-1">
                  <legend className="text-sm font-bold">Kirim ringkasan lewat</legend>
                  <div className="flex gap-2">
                    {(["whatsapp", "email"] as const).map((c) => (
                      <label key={c} className={cn("flex min-h-11 flex-1 cursor-pointer items-center justify-center gap-2 rounded-sm border px-3 font-bold", form.contactChannel === c ? "border-primary bg-surface-2" : "border-border-strong")}>
                        <input type="radio" name="channel" value={c} checked={form.contactChannel === c} onChange={() => set("contactChannel", c)} className="accent-[var(--color-primary)]" />
                        {c === "whatsapp" ? "WhatsApp" : "Email"}
                      </label>
                    ))}
                  </div>
                </fieldset>
                {/* honeypot anti-bot */}
                <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                  <label>
                    Website
                    <input tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => set("website", e.target.value)} />
                  </label>
                </div>
                <div>
                  <Checkbox
                    checked={form.policyAccepted}
                    onChange={(e) => set("policyAccepted", e.target.checked)}
                    aria-invalid={!!errors.policyAccepted || undefined}
                    label={
                      <>
                        Saya menyatakan produk/kampanye ini <strong>bukan</strong> judi online, pinjol/investasi ilegal, rokok/vape, alkohol, politik praktis,
                        produk kesehatan tanpa izin edar, atau konten SARA, dan saya menyetujui ketentuan kerja sama.
                      </>
                    }
                  />
                  {errors.policyAccepted && (
                    <p className="text-sm text-danger">
                      <span aria-hidden>⚠ </span>
                      {errors.policyAccepted}
                    </p>
                  )}
                </div>

                {blocked.length > 0 && (
                  <Notice tone="danger" title="Kategori tidak dapat diterima">
                    {BLOCKED_MESSAGE}
                    <span className="mt-1 block text-xs">Terdeteksi: {blocked.join(", ")}</span>
                  </Notice>
                )}
                {est.isEmpty && (
                  <p className="text-sm text-text-muted">
                    <span aria-hidden>ℹ </span>Pilih minimal satu layanan atau paket di sebelah kiri sebelum mengirim brief.
                  </p>
                )}
                {serverError && <Notice tone="danger">{serverError}</Notice>}

                <Button type="submit" size="lg" disabled={est.isEmpty || blocked.length > 0 || submitting} className="w-full">
                  {submitting ? "Menyimpan brief…" : form.contactChannel === "whatsapp" ? "Kirim Brief via WhatsApp" : "Kirim Brief via Email"}
                </Button>
                <p className="text-xs text-text-muted">Brief disimpan dengan kode referensi, lalu kamu diarahkan ke WhatsApp/Email dengan pesan siap kirim.</p>
              </form>
            )}
          </section>
        </div>
      </div>

      {/* Bilah ringkasan bawah (mobile) */}
      {!success && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface px-4 py-3 md:hidden">
          <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-3">
            <div aria-live="polite">
              <p className="text-xs text-text-muted">{retainer ? `Total kontrak ${RETAINER_MONTHS} bulan` : "Estimasi total"}</p>
              <p className="text-lg font-extrabold tabular-nums">{formatIdr(est.total)}</p>
            </div>
            <a href="#brief" className={buttonClass("secondary", "md")} aria-disabled={est.isEmpty || undefined}>
              Isi brief
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

function Stepper({ value, onChange, label }: { value: number; onChange: (v: number) => void; label: string }) {
  return (
    <div className="inline-flex items-center rounded-sm border border-border-strong" role="group" aria-label={`Jumlah ${label}`}>
      <button type="button" className="grid size-11 place-items-center text-xl font-extrabold text-link hover:bg-surface-2 disabled:opacity-40" onClick={() => onChange(value - 1)} disabled={value <= 0} aria-label={`Kurangi ${label}`}>
        −
      </button>
      <output className="w-8 text-center font-extrabold tabular-nums" aria-live="polite">
        {value}
      </output>
      <button type="button" className="grid size-11 place-items-center text-xl font-extrabold text-link hover:bg-surface-2" onClick={() => onChange(value + 1)} aria-label={`Tambah ${label}`}>
        +
      </button>
    </div>
  );
}

function ServiceRow({ s, qty, onQty, compact }: { s: BuilderService; qty: number; onQty: (q: number) => void; compact?: boolean }) {
  const active = qty > 0;
  const isPercent = s.pricingType === "PERCENT";
  return (
    <div className={cn("flex h-full flex-col gap-3 rounded-md border bg-surface p-4 transition-colors sm:p-5", active ? "border-primary" : "border-border")}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="font-extrabold">{s.name}</h4>
            {s.badge && <Badge tone="accent">{s.badge}</Badge>}
          </div>
          {!compact || s.description ? <p className="mt-1 text-sm text-text-muted">{s.description}</p> : null}
        </div>
        <div className="shrink-0 text-right">
          {s.compareAtPriceIdr && <p className="text-sm text-text-muted line-through tabular-nums">{formatIdr(s.compareAtPriceIdr)}</p>}
          <p className="font-extrabold tabular-nums">{isPercent ? `+${s.percentOfContent}%` : formatIdr(s.basePriceIdr)}</p>
          {!isPercent && <p className="text-xs text-text-muted">{s.unitLabel}</p>}
        </div>
      </div>
      {s.deliverables.length > 0 && (
        <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-text-muted">
          {s.deliverables.map((d) => (
            <li key={d} className="flex items-center gap-2">
              <span aria-hidden className="size-2 rounded-full bg-primary" />
              {d}
            </li>
          ))}
        </ul>
      )}
      <div className="mt-auto flex justify-end">
        {isPercent ? (
          <label className="flex min-h-11 cursor-pointer items-center gap-3 font-bold">
            <input type="checkbox" checked={active} onChange={(e) => onQty(e.target.checked ? 1 : 0)} className="size-5 accent-[var(--color-primary)]" />
            Tambahkan
          </label>
        ) : (
          <Stepper value={qty} onChange={onQty} label={s.name} />
        )}
      </div>
    </div>
  );
}

function SummaryCard({ est, retainer, onRetainer }: { est: Estimate; retainer: boolean; onRetainer: (v: boolean) => void }) {
  return (
    <section aria-labelledby="sum-title" className="rounded-md border border-border bg-surface p-6 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <h3 id="sum-title" className="text-h3">
          Ringkasan estimasi
        </h3>
        {!est.isEmpty && <Badge tone={est.paymentScheme === "DP_50_SPLIT" ? "secondary" : "primary"}>{paymentSchemeShort(est.paymentScheme)}</Badge>}
      </div>

      <label className="mt-4 flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded-sm border border-border-strong px-3 py-2">
        <span>
          <span className="block font-extrabold">Kontrak {RETAINER_MONTHS} Bulan (Hemat 15%)</span>
          <span className="block text-xs text-text-muted">Konten rutin tiap bulan, jadwal dikunci di awal kontrak.</span>
        </span>
        <span className="relative inline-flex shrink-0">
          <input type="checkbox" role="switch" checked={retainer} onChange={(e) => onRetainer(e.target.checked)} className="peer sr-only" />
          <span className="h-7 w-12 rounded-full border border-border-strong bg-surface-2 transition-colors peer-checked:border-primary peer-checked:bg-primary peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-focus" />
          <span className="absolute left-1 top-1 size-5 rounded-full bg-text transition-transform peer-checked:translate-x-5 peer-checked:bg-primary-text" />
        </span>
      </label>

      <div aria-live="polite" className="mt-4">
        {est.isEmpty ? (
          <p className="text-sm text-text-muted">Pilih minimal satu layanan atau paket untuk menghitung estimasi biaya dan melihat ketentuan pembayaran.</p>
        ) : (
          <>
            <ul className="grid gap-2 text-sm">
              {est.lines.map((l) => (
                <li key={l.serviceId} className="flex justify-between gap-3">
                  <span className="text-text-muted">{l.percent ? `${l.name} (+${l.percent}%)` : `${l.qty}× ${l.name}`}</span>
                  <span className="shrink-0 font-bold tabular-nums">{formatIdr(l.lineTotal)}</span>
                </li>
              ))}
            </ul>
            <dl className="mt-4 grid gap-1 border-t border-border pt-4 text-sm">
              <Row label={retainer ? "Subtotal per bulan" : "Subtotal"} value={formatIdr(est.monthlySubtotal)} />
              {retainer && (
                <>
                  <Row label={`× ${RETAINER_MONTHS} bulan`} value={formatIdr(est.contractSubtotal)} />
                  <Row label="Diskon kontrak 15%" value={`− ${formatIdr(est.discount)}`} tone="success" />
                </>
              )}
            </dl>
            <div className="mt-3 flex items-end justify-between gap-3 border-t border-border pt-3">
              <span className="font-bold">{retainer ? `Total kontrak ${RETAINER_MONTHS} bulan` : "Estimasi total (gross)"}</span>
              <span className="text-h2 tabular-nums">{formatIdr(est.total)}</span>
            </div>
            {retainer && <p className="mt-1 text-right text-sm text-text-muted tabular-nums">setara {formatIdr(est.monthlyAfterDiscount)}/bulan</p>}

            <div className="mt-4 rounded-sm bg-surface-2 p-3 text-sm">
              <p className="font-extrabold">
                {est.paymentScheme === "DP_50_SPLIT" ? "✓ DP 50% + pelunasan 50%" : "✓ Pelunasan 100% di depan"}
              </p>
              <p className="mt-1 text-text-muted">{paymentSchemeLabel(est.paymentScheme)}.</p>
              {est.paymentScheme === "DP_50_SPLIT" && <p className="mt-1 tabular-nums">DP saat booking: {formatIdr(est.dpAmount)}</p>}
              <p className="mt-2 text-xs text-text-muted">
                Aturan: total {retainer ? "nilai kontrak" : "tagihan"} {est.total >= DP_THRESHOLD_IDR ? "≥" : "<"} {formatIdr(DP_THRESHOLD_IDR)}
                {retainer ? ` (dihitung dari total kontrak ${RETAINER_MONTHS} bulan setelah diskon, bukan per bulan)` : ""}.
              </p>
            </div>
          </>
        )}
      </div>
      <p className="mt-4 text-xs text-text-muted">Harga gross, sudah termasuk produksi. Views organik tidak dijamin; laporan insight dikirim H+7.</p>
    </section>
  );
}

function Row({ label, value, tone }: { label: string; value: string; tone?: "success" }) {
  return (
    <div className="flex justify-between gap-3">
      <dt className="text-text-muted">{label}</dt>
      <dd className={cn("font-bold tabular-nums", tone === "success" && "text-success")}>{value}</dd>
    </div>
  );
}

function SuccessPanel({ success, businessWa, businessEmail, onReset }: { success: Success; businessWa: string; businessEmail: string; onReset: () => void }) {
  const { form, estimate, referenceCode, retainer } = success;
  const message = buildBriefMessage({
    referenceCode,
    brandName: form.brandName,
    brandIndustry: form.brandIndustry,
    picName: form.picName,
    picContact: form.picContact,
    briefSummary: form.briefSummary,
    targetPublishDate: form.targetPublishDate || null,
    retainer,
    estimate,
  });
  const wa = businessWa ? waLink(businessWa, message) : null;
  const mail = mailtoLink(businessEmail, `Brief kerja sama ${form.brandName} — ${referenceCode}`, message);
  const primaryIsWa = form.contactChannel === "whatsapp" && wa;
  return (
    <div className="grid gap-4" role="status">
      <p className="text-h3 text-success">
        <span aria-hidden>✓ </span>Brief tersimpan
      </p>
      <div className="rounded-sm bg-surface-2 p-4">
        <p className="text-label text-text-muted">Kode referensi</p>
        <p className="mt-1 text-h2 tabular-nums">{referenceCode}</p>
        <p className="mt-2 text-sm text-text-muted">
          Total {retainer ? `kontrak ${RETAINER_MONTHS} bulan` : "estimasi"}: <strong className="text-text tabular-nums">{formatIdr(estimate.total)}</strong> ·{" "}
          {paymentSchemeLabel(estimate.paymentScheme)}.
        </p>
      </div>
      <p className="text-sm text-text-muted">Satu langkah lagi: kirim ringkasan ini ke tim Perbekasian supaya bisa langsung kami proses.</p>
      {primaryIsWa ? (
        <>
          <a href={wa!} target="_blank" rel="noopener noreferrer" className={buttonClass("primary", "lg", "w-full")}>
            Buka WhatsApp
          </a>
          <a href={mail} className={buttonClass("secondary", "md", "w-full")}>
            Kirim via Email
          </a>
        </>
      ) : (
        <>
          <a href={mail} className={buttonClass("primary", "lg", "w-full")}>
            Kirim via Email
          </a>
          {wa && (
            <a href={wa} target="_blank" rel="noopener noreferrer" className={buttonClass("secondary", "md", "w-full")}>
              Buka WhatsApp
            </a>
          )}
        </>
      )}
      <details className="text-sm">
        <summary className="min-h-11 cursor-pointer py-2 font-bold text-link">Lihat isi pesan</summary>
        <pre className="mt-2 whitespace-pre-wrap rounded-sm bg-surface-2 p-3 font-sans text-xs">{message}</pre>
      </details>
      <Button variant="ghost" onClick={onReset}>
        Buat brief lain
      </Button>
    </div>
  );
}
