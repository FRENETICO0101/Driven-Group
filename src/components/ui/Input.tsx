import type { ComponentPropsWithoutRef } from "react";

export function Input({ className = "", ...props }: ComponentPropsWithoutRef<"input">) {
  return (
    <input
      {...props}
      className={`bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder:text-slate-500 focus:border-primary focus:ring-0 outline-none ${className}`.trim()}
    />
  );
}
