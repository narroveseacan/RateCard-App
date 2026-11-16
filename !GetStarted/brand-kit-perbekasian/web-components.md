# Komponen web (React + Tailwind v4)

Sumber siap salin. Butuh `globals.css` dari `web-ui.md` dan helper kecil:

```ts
// lib/cn.ts
export const cn = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");
```

## Button

```tsx
import { cn } from "@/lib/cn";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
};

const variants = {
  primary: "bg-primary text-primary-text hover:bg-primary-hover",
  secondary: "bg-secondary text-secondary-text hover:brightness-110",
  ghost: "text-link hover:bg-surface-2",
};
const sizes = { sm: "min-h-9 px-3 text-sm", md: "min-h-11 px-4 text-base", lg: "min-h-12 px-6 text-lg" };

export function Button({ variant = "primary", size = "md", className, ...p }: Props) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-sm font-extrabold transition-colors",
        "disabled:pointer-events-none disabled:opacity-50",
        variants[variant], sizes[size], className,
      )}
      {...p}
    />
  );
}
```

`sm` hanya untuk antarmuka padat di desktop; di mobile pakai `md` ke atas (target sentuh 44px).

## Chip

```tsx
export function Chip({ n, title, sub }: { n?: number | string; title: string; sub?: string }) {
  return (
    <div className="inline-flex items-center gap-3 rounded-md border border-border bg-surface py-2 pl-2 pr-4">
      {n !== undefined && (
        <span className="grid size-10 place-items-center rounded-full bg-primary font-extrabold text-primary-text">{n}</span>
      )}
      <span>
        <span className="block text-lg/5 font-extrabold">{title}</span>
        {sub && <span className="block font-serif text-sm italic text-text-muted">{sub}</span>}
      </span>
    </div>
  );
}
```

## Card

```tsx
export function Card({ eyebrow, title, children }: { eyebrow?: string; title?: string; children?: React.ReactNode }) {
  return (
    <section className="rounded-md border border-border bg-surface p-6 shadow-sm">
      {eyebrow && <p className="text-label text-text-muted">{eyebrow}</p>}
      {title && <h3 className="mt-1 text-h3">{title}</h3>}
      <div className="mt-3 text-text-muted">{children}</div>
    </section>
  );
}
```

## Input

```tsx
import { useId } from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & { label: string; hint?: string; error?: string };

export function Input({ label, hint, error, id, ...p }: Props) {
  const uid = useId();
  const fid = id ?? uid;
  const describedBy = error ? `${fid}-err` : hint ? `${fid}-hint` : undefined;
  return (
    <div className="grid gap-1">
      <label htmlFor={fid} className="text-sm font-bold">{label}</label>
      <input
        id={fid}
        aria-invalid={!!error || undefined}
        aria-describedby={describedBy}
        className="min-h-11 w-full rounded-sm border border-border-strong bg-surface px-3 text-text placeholder:text-text-muted aria-invalid:border-danger"
        {...p}
      />
      {error ? <p id={`${fid}-err`} className="text-sm text-danger">{error}</p>
        : hint ? <p id={`${fid}-hint`} className="text-sm text-text-muted">{hint}</p> : null}
    </div>
  );
}
```

Cincin fokus datang dari aturan `:focus-visible` di `globals.css`. Pesan galat sebaiknya diawali ikon agar tidak bergantung pada warna.
