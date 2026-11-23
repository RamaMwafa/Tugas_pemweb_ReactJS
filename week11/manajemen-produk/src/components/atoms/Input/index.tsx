import type { InputHTMLAttributes } from "react";

export function Input({ className = "", ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`w-full rounded-lg border border-stone-border bg-parchment-light px-3.5 py-2 text-sm text-espresso placeholder:text-muted/70 outline-none transition focus:border-navy focus:ring-3 focus:ring-navy/15 ${className}`}
      {...props}
    />
  );
}

export default Input;