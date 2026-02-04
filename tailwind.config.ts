import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/hooks/**/*.{js,ts,jsx,tsx}",
  ],
  // Ensure all dynamic classes are detected (prevents dev/prod mismatch)
  safelist: [
    'details-section-visible',
    'is-inview',
    'rotate-180',
    'details-card-enter',
    'entourage-designation-block',
    // Hero section rounded classes
    'rounded-b',
    'rounded-t',
    'rounded-br',
    'rounded-bl',
    'rounded-tr',
    'rounded-tl',
    'rounded',
    // Responsive variants
    'md:rounded-br',
    'md:rounded-bl',
    'md:rounded-tr',
    'md:rounded-tl',
    'lg:rounded-br',
    'lg:rounded',
    'lg:rounded-bl',
  ],
  theme: {
    extend: {
      colors: {
        ivory: "#F9EEE2",
        "soft-cream": "#F9EEE2",
        "blush-peach": "#FFCBBC",
        "warm-taupe": "#DDB398",
        "soft-nude-beige": "#FBE0D2",
        "peach-tan": "#F8C5AD",
        gold: "#DDB398",
        "gold-light": "#F8C5AD",
        lavender: "#DDB398",
        "soft-pink": "#FFCBBC",
        "lavender-glow": "#F8C5AD",
        "light-pink": "#FFCBBC",
        "hot-pink": "#F8C5AD",
        background: "#F9EEE2",
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"],
        sans: [
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(221, 179, 152, 0.35)",
        glow: "0 0 20px rgba(221, 179, 152, 0.25)",
        "glow-lavender": "0 0 24px rgba(248, 197, 173, 0.25)",
        "glow-pink": "0 0 24px rgba(255, 203, 188, 0.25)",
        "gold-ring": "0 0 0 2px #DDB398",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "underline-draw": "underlineDraw 0.6s ease-out forwards",
        "glitter-float": "glitterFloat 8s ease-in-out infinite",
        "float-slow": "floatSlow 12s ease-in-out infinite",
        "shimmer-subtle": "shimmerSubtle 3s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        underlineDraw: {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
        glitterFloat: {
          "0%, 100%": { opacity: "0.4", transform: "translate(0, 0)" },
          "25%": { opacity: "0.8", transform: "translate(2px, -3px)" },
          "50%": { opacity: "0.5", transform: "translate(-1px, 2px)" },
          "75%": { opacity: "0.7", transform: "translate(3px, 1px)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(4px, -6px)" },
        },
        shimmerSubtle: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },
      transitionDuration: {
        200: "200ms",
        300: "300ms",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
