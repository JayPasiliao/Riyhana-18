"use client";

import { useId } from "react";

/* ——— Curved HUD dividers (decorative only, no layout) ——— */

/** Thin curved arc under section headers — soft bezier arc */
export function CurvedArcDivider({ className = "" }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg
      className={`curved-hud-arc ${className}`}
      viewBox="0 0 200 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="200"
      height="24"
      preserveAspectRatio="xMidYMid meet"
      style={{ maxWidth: '12rem', height: '1.5rem', display: 'block' }}
      aria-hidden
    >
      <defs>
        <linearGradient id={`arc-grad-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(249,238,226,0.4)" />
          <stop offset="50%" stopColor="rgba(221,179,152,0.6)" />
          <stop offset="100%" stopColor="rgba(248,197,173,0.5)" />
        </linearGradient>
      </defs>
      <path
        d="M 0 18 Q 50 0 100 18 Q 150 22 200 18"
        stroke={`url(#arc-grad-${id})`}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        className="curved-arc-path"
      />
    </svg>
  );
}

/** Soft wave line — replaces straight HR between sections — enhanced HUD style */
export function WaveLineDivider({ className = "" }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg
      className={`curved-hud-wave ${className}`}
      viewBox="0 0 400 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="400"
      height="24"
      preserveAspectRatio="none"
      style={{ width: '100%', height: '0.75rem', display: 'block' }}
      aria-hidden
    >
      <defs>
        <linearGradient id={`wave-grad-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="20%" stopColor="rgba(221,179,152,0.2)" />
          <stop offset="50%" stopColor="rgba(248,197,173,0.35)" />
          <stop offset="80%" stopColor="rgba(221,179,152,0.2)" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
        <linearGradient id={`wave-grad-secondary-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="25%" stopColor="rgba(248,197,173,0.15)" />
          <stop offset="50%" stopColor="rgba(255,203,188,0.2)" />
          <stop offset="75%" stopColor="rgba(248,197,173,0.15)" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
      {/* Secondary wave layer (softer, offset) */}
      <path
        d="M 0 14 C 45 6 95 20 145 14 C 195 6 245 20 295 14 C 345 6 400 14 400 14"
        stroke={`url(#wave-grad-secondary-${id})`}
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
        opacity="0.6"
        className="curved-wave-path-secondary"
      />
      {/* Primary wave layer — thin stroke */}
      <path
        d="M 0 12 C 50 4 100 18 150 12 C 200 4 250 18 300 12 C 350 4 400 12 400 12"
        stroke={`url(#wave-grad-${id})`}
        strokeWidth="0.9"
        strokeLinecap="round"
        fill="none"
        className="curved-wave-path"
      />
    </svg>
  );
}

/** Halo Band Divider — soft elliptical glow centered horizontally */
export function HaloBandDivider({ className = "" }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <div className={`curved-hud-halo-band ${className}`} aria-hidden style={{ display: 'block', width: '100%', height: '6px', margin: '0.5rem 0' }}>
      <svg
        viewBox="0 0 400 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width="400"
        height="16"
        preserveAspectRatio="none"
        style={{ width: '100%', height: '100%' }}
      >
        <defs>
        <radialGradient id={`halo-band-${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
          <stop offset="40%" stopColor="rgba(221,179,152,0.2)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        </defs>
        <ellipse cx="200" cy="8" rx="180" ry="6" fill={`url(#halo-band-${id})`} />
      </svg>
    </div>
  );
}

/** Gradient Curve Stroke Divider — bezier curve with Sunset Terra palette */
export function GradientCurveDivider({ className = "" }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg
      className={`curved-hud-gradient-curve ${className}`}
      viewBox="0 0 400 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="400"
      height="20"
      preserveAspectRatio="none"
      style={{ width: '100%', height: '0.75rem', display: 'block' }}
      aria-hidden
    >
      <defs>
        <linearGradient id={`curve-grad-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(249,238,226,0.25)" />
          <stop offset="33%" stopColor="rgba(221,179,152,0.35)" />
          <stop offset="66%" stopColor="rgba(255,203,188,0.3)" />
          <stop offset="100%" stopColor="rgba(249,238,226,0.25)" />
        </linearGradient>
      </defs>
      <path
        d="M 0 10 Q 100 2 200 10 T 400 10"
        stroke={`url(#curve-grad-${id})`}
        strokeWidth="0.8"
        strokeLinecap="round"
        fill="none"
        className="curved-gradient-path"
      />
    </svg>
  );
}

/** Double arc lines — slightly offset, ceremonial */
export function DoubleArcDivider({ className = "" }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg
      className={`curved-hud-double ${className}`}
      viewBox="0 0 200 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="200"
      height="20"
      preserveAspectRatio="xMidYMid meet"
      style={{ maxWidth: '10rem', height: '1.25rem', display: 'block' }}
      aria-hidden
    >
      <defs>
        <linearGradient id={`double-grad-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(249,238,226,0.35)" />
          <stop offset="50%" stopColor="rgba(255,203,188,0.4)" />
          <stop offset="100%" stopColor="rgba(221,179,152,0.35)" />
        </linearGradient>
      </defs>
      <path d="M 0 14 Q 50 2 100 14 Q 150 18 200 14" stroke={`url(#double-grad-${id})`} strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.9" />
      <path d="M 0 16 Q 50 4 100 16 Q 150 20 200 16" stroke={`url(#double-grad-${id})`} strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.5" />
    </svg>
  );
}

/** Semi-circular halo behind title (decorative backdrop) */
export function HaloBehindTitle({ className = "" }: { className?: string }) {
  return (
    <span
      className={`curved-hud-halo ${className}`}
      aria-hidden
    />
  );
}

/** Elliptical outline framing a section/card group — use as wrapper class or ::before on container */
export function EllipticalFrameSVG({ className = "" }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg
      className={`curved-hud-elliptical ${className}`}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="100"
      height="100"
      preserveAspectRatio="none"
      style={{ position: 'absolute', inset: '-2px', width: 'calc(100% + 4px)', height: 'calc(100% + 4px)' }}
      aria-hidden
    >
      <defs>
        <linearGradient id={`ellipse-grad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(249,238,226,0.35)" />
          <stop offset="50%" stopColor="rgba(255,203,188,0.35)" />
          <stop offset="100%" stopColor="rgba(221,179,152,0.3)" />
        </linearGradient>
      </defs>
      <ellipse cx="50" cy="50" rx="48" ry="48" stroke={`url(#ellipse-grad-${id})`} strokeWidth="1" fill="none" className="curved-ellipse-path" />
    </svg>
  );
}

/** Floral SVG divider: gradient line with small petal motifs */
export function FloralDivider({ className = "" }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg
      className={className ? `decorative-floral ${className}` : "decorative-floral"}
      viewBox="0 0 160 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="160"
      height="20"
      preserveAspectRatio="xMidYMid meet"
      style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
      aria-hidden
    >
      <defs>
        <linearGradient id={`floral-line-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(249, 238, 226, 0.4)" />
          <stop offset="50%" stopColor="rgba(221, 179, 152, 0.5)" />
          <stop offset="100%" stopColor="rgba(249, 238, 226, 0.4)" />
        </linearGradient>
      </defs>
      <line x1="0" y1="10" x2="160" y2="10" stroke={`url(#floral-line-${id})`} strokeWidth="1" strokeLinecap="round" />
      <ellipse cx="40" cy="10" rx="6" ry="3" fill="rgba(255, 203, 188, 0.35)" stroke="rgba(249, 238, 226, 0.5)" strokeWidth="0.8" />
      <ellipse cx="80" cy="10" rx="8" ry="4" fill="rgba(248, 197, 173, 0.4)" stroke="rgba(249, 238, 226, 0.6)" strokeWidth="0.8" />
      <ellipse cx="120" cy="10" rx="6" ry="3" fill="rgba(255, 203, 188, 0.35)" stroke="rgba(249, 238, 226, 0.5)" strokeWidth="0.8" />
    </svg>
  );
}

/** Curved HUD dots divider — replaces flat dots with curved arc arrangement */
export function GoldDotsDivider({ className = "" }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg
      className={`curved-hud-dots ${className}`}
      viewBox="0 0 200 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="200"
      height="16"
      preserveAspectRatio="xMidYMid meet"
      style={{ maxWidth: '14rem', height: '1rem', display: 'block' }}
      aria-hidden
    >
      <defs>
        <linearGradient id={`dots-grad-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(249,238,226,0.35)" />
          <stop offset="50%" stopColor="rgba(255,203,188,0.4)" />
          <stop offset="100%" stopColor="rgba(221,179,152,0.35)" />
        </linearGradient>
      </defs>
      {/* Curved path with dots along it */}
      <path
        d="M 0 8 Q 50 2 100 8 Q 150 12 200 8"
        stroke={`url(#dots-grad-${id})`}
        strokeWidth="0.8"
        strokeLinecap="round"
        fill="none"
        opacity="0.4"
        className="curved-dots-path"
      />
      {/* Dots positioned along curve */}
      <circle cx="25" cy="6" r="1.5" fill="rgba(249,238,226,0.5)" className="curved-dot" />
      <circle cx="50" cy="3" r="2" fill="rgba(255,203,188,0.45)" className="curved-dot" />
      <circle cx="75" cy="5" r="1.5" fill="rgba(221,179,152,0.4)" className="curved-dot" />
      <circle cx="100" cy="8" r="2.5" fill="rgba(248,197,173,0.5)" className="curved-dot" />
      <circle cx="125" cy="10" r="1.5" fill="rgba(221,179,152,0.4)" className="curved-dot" />
      <circle cx="150" cy="11" r="2" fill="rgba(255,203,188,0.45)" className="curved-dot" />
      <circle cx="175" cy="9" r="1.5" fill="rgba(249,238,226,0.5)" className="curved-dot" />
    </svg>
  );
}

/** Very light floating glitter dots (decorative only) */
export function GlitterParticles() {
  const positions = [
    { left: "10%", top: "20%", delay: "0s" },
    { left: "85%", top: "15%", delay: "1s" },
    { left: "25%", top: "60%", delay: "2s" },
    { left: "70%", top: "55%", delay: "0.5s" },
    { left: "50%", top: "35%", delay: "1.5s" },
    { left: "15%", top: "80%", delay: "2.5s" },
    { left: "90%", top: "75%", delay: "0.8s" },
    { left: "40%", top: "10%", delay: "1.2s" },
    { left: "60%", top: "85%", delay: "2s" },
  ];
  return (
    <div className="glitter-wrap" aria-hidden>
      {positions.map((pos, i) => (
        <span
          key={i}
          className="glitter-dot"
          style={{
            left: pos.left,
            top: pos.top,
            animationDelay: pos.delay,
            animationDuration: `${10 + i * 1.5}s`,
          }}
        />
      ))}
    </div>
  );
}
