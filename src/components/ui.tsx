import { useId } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

// Komponen dasar dari web-components.md Brand Kit — token lewat utilitas, tanpa hex mentah.

type Variant = "primary" | "secondary" | "ghost" | "outline" | "danger";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-primary text-primary-text hover:bg-primary-hover",
  secondary: "bg-secondary text-secondary-text hover:brightness-110",
  ghost: "text-link hover:bg-surface-2",
  outline: "border border-border-strong text-text hover:bg-surface-2",
  danger: "border border-danger text-danger hover:bg-surface-2",
};
const sizes: Record<Size, string> = {
  sm: "min-h-9 px-3 text-sm",
  md: "min-h-11 px-4 text-base",
  lg: "min-h-12 px-6 text-lg",
};

export const buttonClass = (variant: Variant = "primary", size: Size = "md", className?: string) =>
  cn(
    "inline-flex items-center justify-center gap-2 rounded-sm font-extrabold transition-colors duration-150 ease-out",
    "disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50",
    variants[variant],
    sizes[size],
    className,
  );

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size };

export function Button({ variant = "primary", size = "md", className, type = "button", ...p }: ButtonProps) {
  return <button type={type} className={buttonClass(variant, size, className)} {...p} />;
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  ...p
}: React.ComponentProps<typeof Link> & { variant?: Variant; size?: Size }) {
  return <Link className={buttonClass(variant, size, className)} {...p} />;
}

export function Chip({ n, title, sub, className }: { n?: number | string; title: string; sub?: string; className?: string }) {
  return (
    <div className={cn("inline-flex items-center gap-3 rounded-md border border-border bg-surface py-2 pl-2 pr-4", className)}>
      {n !== undefined && (
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary font-extrabold text-primary-text tabular-nums">
          {n}
        </span>
      )}
      <span className="min-w-0">
        <span className="block text-lg/5 font-extrabold">{title}</span>
        {sub && <span className="block font-serif text-sm italic text-text-muted">{sub}</span>}
      </span>
    </div>
  );
}

export function Card({
  eyebrow,
  title,
  children,
  className,
  as: Tag = "section",
}: {
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  as?: "section" | "div" | "article";
}) {
  return (
    <Tag className={cn("rounded-md border border-border bg-surface p-6 shadow-sm", className)}>
      {eyebrow && <p className="text-label text-text-muted">{eyebrow}</p>}
      {title && <h3 className={cn("text-h3", eyebrow ? "mt-1" : "")}>{title}</h3>}
      {children && <div className={cn(title || eyebrow ? "mt-3" : "")}>{children}</div>}
    </Tag>
  );
}

export function Badge({ children, tone = "secondary", className }: { children: React.ReactNode; tone?: "secondary" | "accent" | "outline" | "primary"; className?: string }) {
  const tones = {
    secondary: "bg-secondary text-secondary-text",
    accent: "bg-accent text-ink",
    primary: "bg-primary text-primary-text",
    outline: "border border-border-strong text-text-muted",
  };
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-extrabold", tones[tone], className)}>
      {children}
    </span>
  );
}

const fieldBase =
  "w-full rounded-sm border border-border-strong bg-surface px-3 text-text placeholder:text-text-muted hover:border-text aria-invalid:border-danger disabled:cursor-not-allowed disabled:bg-surface-2 disabled:opacity-50";

type FieldExtras = { label: string; hint?: string; error?: string };

function FieldShell({ fid, label, hint, error, children }: FieldExtras & { fid: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1">
      <label htmlFor={fid} className="text-sm font-bold">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${fid}-err`} className="text-sm text-danger">
          <span aria-hidden>⚠ </span>
          {error}
        </p>
      ) : hint ? (
        <p id={`${fid}-hint`} className="text-sm text-text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export function Input({ label, hint, error, id, className, ...p }: React.InputHTMLAttributes<HTMLInputElement> & FieldExtras) {
  const uid = useId();
  const fid = id ?? uid;
  return (
    <FieldShell fid={fid} label={label} hint={hint} error={error}>
      <input
        id={fid}
        aria-invalid={!!error || undefined}
        aria-describedby={error ? `${fid}-err` : hint ? `${fid}-hint` : undefined}
        className={cn(fieldBase, "min-h-11", className)}
        {...p}
      />
    </FieldShell>
  );
}

export function Textarea({ label, hint, error, id, className, ...p }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & FieldExtras) {
  const uid = useId();
  const fid = id ?? uid;
  return (
    <FieldShell fid={fid} label={label} hint={hint} error={error}>
      <textarea
        id={fid}
        aria-invalid={!!error || undefined}
        aria-describedby={error ? `${fid}-err` : hint ? `${fid}-hint` : undefined}
        className={cn(fieldBase, "min-h-28 py-2", className)}
        {...p}
      />
    </FieldShell>
  );
}

export function Select({
  label,
  hint,
  error,
  id,
  className,
  children,
  ...p
}: React.SelectHTMLAttributes<HTMLSelectElement> & FieldExtras) {
  const uid = useId();
  const fid = id ?? uid;
  return (
    <FieldShell fid={fid} label={label} hint={hint} error={error}>
      <select
        id={fid}
        aria-invalid={!!error || undefined}
        aria-describedby={error ? `${fid}-err` : hint ? `${fid}-hint` : undefined}
        className={cn(fieldBase, "min-h-11", className)}
        {...p}
      >
        {children}
      </select>
    </FieldShell>
  );
}

export function Checkbox({ label, className, ...p }: React.InputHTMLAttributes<HTMLInputElement> & { label: React.ReactNode }) {
  return (
    <label className={cn("flex min-h-11 cursor-pointer items-start gap-3 py-2", className)}>
      <input type="checkbox" className="mt-1 size-5 shrink-0 accent-[var(--color-primary)]" {...p} />
      <span className="text-sm">{label}</span>
    </label>
  );
}

export function Notice({
  tone,
  title,
  children,
  className,
}: {
  tone: "danger" | "warning" | "success" | "info";
  title?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  const map = {
    danger: { cls: "border-danger text-danger", icon: "⚠" },
    warning: { cls: "border-warning text-warning", icon: "⚠" },
    success: { cls: "border-success text-success", icon: "✓" },
    info: { cls: "border-border-strong text-text", icon: "ℹ" },
  }[tone];
  return (
    <div role={tone === "danger" ? "alert" : "status"} className={cn("flex gap-3 rounded-sm border bg-surface-2 p-4", map.cls, className)}>
      <span aria-hidden className="font-extrabold">
        {map.icon}
      </span>
      <div className="text-sm">
        {title && <p className="font-extrabold">{title}</p>}
        {children && <div className={title ? "mt-1" : ""}>{children}</div>}
      </div>
    </div>
  );
}

export function Eyebrow({ n, children }: { n?: string; children: React.ReactNode }) {
  return (
    <p className="text-label text-text-muted">
      {n && <span className="mr-2 text-link">{n}</span>}
      {children}
    </p>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-xs bg-surface-2", className)} />;
}
