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
      "rounded-full px-6 py-3 sm:px-6 sm:py-3 font-medium transition-colors duration-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed min-h-[44px] touch-manipulation";

    const variants = {
      primary:
        "bg-warm-taupe text-white shadow-soft hover:shadow-glow hover:bg-warm-taupe/90 transition-shadow duration-300",
      secondary:
        "bg-blush-peach text-white shadow-soft hover:shadow-glow hover:bg-blush-peach/90 transition-shadow duration-300",
      gold:
        "bg-gradient-to-r from-gold via-gold-light to-gold text-white shadow-soft hover:shadow-glow btn-gold-shimmer bg-[length:200%_100%] active:opacity-90",
      outline:
        "border-2 border-gold text-gold bg-transparent hover:bg-gold/20 hover:shadow-glow transition-colors duration-400 active:opacity-90",
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
