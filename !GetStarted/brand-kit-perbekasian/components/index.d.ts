export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** primary = cyan, satu per tampilan; secondary = grape; ghost = teks tautan. */
  variant?: "primary" | "secondary" | "ghost";
  /** md (44px) bawaan; sm hanya untuk UI padat desktop. */
  size?: "sm" | "md" | "lg";
}
export interface ChipProps { n?: number | string; title: string; sub?: string }
export interface CardProps { eyebrow?: string; title?: string; children?: React.ReactNode }
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> { label: string; hint?: string; error?: string }
