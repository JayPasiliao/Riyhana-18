"use client";

import { forwardRef } from "react";

interface PillButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "gold" | "outline";
  children: React.ReactNode;
  className?: string;
}

const PillButton = forwardRef<HTMLButtonElement, PillButtonProps>(
  (
    {
      variant = "primary",
      children,
      className = "",
      disabled,
      ...props
    },
    ref
  ) => {
    const base =
      "rounded-full px-6 py-3 font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99]";

    const variants = {
      primary:
        "bg-lavender text-white shadow-soft hover:shadow-glow hover:bg-lavender/90",
      secondary:
        "bg-soft-pink text-white shadow-soft hover:shadow-glow hover:bg-soft-pink/90",
      gold:
        "bg-gold text-white shadow-soft hover:shadow-glow hover:bg-gold-light",
      outline:
        "border-2 border-gold text-gold bg-transparent hover:bg-gold/10",
    };

    return (
      <button
        ref={ref}
        type="button"
        className={`${base} ${variants[variant]} ${className}`}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

PillButton.displayName = "PillButton";

export default PillButton;
