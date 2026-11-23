import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "oliveOutline" | "rustOutline" | "danger" | "cancel";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "bg-navy text-parchment border border-navy hover:bg-navy-dark",
  oliveOutline:
    "bg-parchment/70 text-olive border border-olive hover:bg-olive hover:text-parchment",
  rustOutline:
    "bg-parchment/70 text-rust border border-rust/60 hover:bg-rust hover:border-rust hover:text-parchment",
  danger: "bg-rust text-parchment border border-rust hover:bg-rust-dark",
  cancel: "bg-parchment text-espresso border border-stone-border hover:bg-stone/60",
};

export function Button({
  variant = "primary",
  type = "button",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${VARIANT_CLASSES[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;