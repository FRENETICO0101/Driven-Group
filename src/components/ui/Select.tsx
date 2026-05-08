import type { ComponentPropsWithoutRef } from "react";

export function Select({ className = "", ...props }: ComponentPropsWithoutRef<"select">) {
  return (
    <select
      {...props}
      className={`bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary focus:ring-0 outline-none ${className}`.trim()}
    />
  );
}
