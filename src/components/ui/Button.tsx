import type { ComponentPropsWithoutRef } from "react";

type ButtonVariant = "quartz" | "ghost" | "soft" | "outline";

const variantClasses: Record<ButtonVariant, string> = {
  quartz: "quartz-button",
  ghost: "glass-card text-white hover:bg-white/10 transition-colors",
  soft: "bg-primary/20 border border-primary/50 text-white transition-colors hover:bg-primary hover:text-black",
  outline: "bg-white/5 border-2 border-white/20 text-white hover:bg-white/10 transition-colors",
};

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: ButtonVariant;
  href?: string;
};

export function Button({ variant = "quartz", href, className = "", children, ...props }: ButtonProps) {
  const classes = `${variantClasses[variant]} ${className}`.trim();

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
