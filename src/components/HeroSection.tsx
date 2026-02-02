"use client";

import Image from "next/image";
import {
  DEBUTANT_NAME,
  EVENT_DATE_LINE,
  EVENT_TIME,
  VENUE_NAME,
  VENUE_ADDRESS,
} from "@/lib/constants";

/**
 * Hero name font: Andrew Elegant Regular — loaded via @font-face in globals.css.
 * File: public/fonts/ANDREW ELEGANT Regular.ttf (or .otf; update url in globals.css if needed).
 */

/**
 * Hero section: full-width 4-column photo grid.
 * Image source: /public/PHOTO CARDS/
 *
 * To change image filenames later, edit the HERO_PHOTOS array below.
 * Path is relative to public: use "/PHOTO CARDS/filename.ext"
 */
const PHOTO_CARDS_BASE = "/PHOTO CARDS";

const HERO_PHOTOS = [
  { src: `${PHOTO_CARDS_BASE}/GEP00021.jpeg`, alt: `${DEBUTANT_NAME} - Debut celebration photo 1` },
  { src: `${PHOTO_CARDS_BASE}/GEP00029.jpeg`, alt: `${DEBUTANT_NAME} - Debut celebration photo 2` },
  { src: `${PHOTO_CARDS_BASE}/GEP00298.jpeg`, alt: `${DEBUTANT_NAME} - Debut celebration photo 3` },
  { src: `${PHOTO_CARDS_BASE}/GEP00467.jpeg`, alt: `${DEBUTANT_NAME} - Debut celebration photo 4` },
];

/** Edit hero tagline here (appears above the name). */
const HERO_TAGLINE = "BEAUTY AND SOPHISTICATION";

/** Rounded corners only on inner edges (not outer page edges). Index 0..3. */
function getRoundedClasses(index: number): string {
  const mobile = ["rounded-b", "rounded-b", "rounded-b", "rounded-t"];
  const tablet = ["rounded-br", "rounded-bl", "rounded-tr", "rounded-tl"];
  const desktop = ["rounded-br", "rounded", "rounded", "rounded-bl"];
  return `${mobile[index]} md:${tablet[index]} lg:${desktop[index]}`;
}

export default function HeroSection() {
  return (
    <section
      className="relative w-full min-h-screen overflow-hidden"
      aria-label="Hero"
    >
      {/* ——— 4-column photo grid (unchanged) ——— */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-rows-4 md:grid-rows-2 lg:grid-rows-1 min-h-screen h-screen w-full">
        {HERO_PHOTOS.map((photo, index) => (
          <div
            key={photo.src}
            className="relative w-full h-full min-h-0 overflow-hidden"
            style={{
              animation: "heroColumnFadeUp 0.6s ease-out forwards",
              animationDelay: `${index * 0.1}s`,
              opacity: 0,
            }}
          >
            <div
              className={`relative w-full h-full ${getRoundedClasses(index)} overflow-hidden transition-all duration-300 ease-out hover:scale-105 hover:shadow-[0_0_30px_rgba(212,175,55,0.35)]`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                priority
              />
            </div>
          </div>
        ))}
      </div>

      {/* Sunset Terra: light warm overlay */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: "linear-gradient(180deg, rgba(249, 238, 226, 0.25) 0%, transparent 40%, rgba(248, 197, 173, 0.2) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Vignette: subtle darkening at edges */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, rgba(0,0,0,0.15) 100%)",
        }}
        aria-hidden="true"
      />

      {/* ——— Centered typography overlay (luxury poster aesthetic) ——— */}
      <div className="absolute inset-0 z-[2] flex items-center justify-center px-4 sm:px-6 pointer-events-none">
        <div className="text-center w-full max-w-5xl">
          {/* 1. Top tagline — edit HERO_TAGLINE constant above */}
          <p
            className="text-[0.65rem] sm:text-xs tracking-[0.35em] uppercase text-warm-taupe font-sans animate-fade-up opacity-0 [animation-fill-mode:forwards]"
            style={{
              animationDelay: "0.2s",
              textShadow: "0 1px 4px rgba(255,255,255,0.5)",
            }}
          >
            {HERO_TAGLINE}
          </p>

          {/* 2. Main name — primary focus; base text always visible, shine overlay via ::after */}
          <h1
            className="font-andrew-elegant hero-name-gradient mt-1 sm:mt-2 text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-tight animate-fade-up opacity-0 [animation-fill-mode:forwards]"
            style={{
              letterSpacing: "-0.02em",
              animationDelay: "0.35s",
            }}
            data-text={DEBUTANT_NAME}
            aria-label={`${DEBUTANT_NAME}, 18th Birthday Debut Celebration`}
          >
            {DEBUTANT_NAME}
          </h1>

          {/* 3. Age marker — 18, larger font */}
          <p
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-warm-taupe mt-0.5 sm:mt-1 animate-fade-up opacity-0 [animation-fill-mode:forwards]"
            style={{
              animationDelay: "0.5s",
              textShadow: "0 2px 12px rgba(255,255,255,0.4)",
            }}
          >
            18
          </p>

          {/* 4. Date and time — edit via EVENT_DATE_LINE & EVENT_TIME in constants */}
          <p
            className="mt-4 sm:mt-6 text-xs sm:text-sm tracking-[0.15em] uppercase text-warm-taupe/90 font-sans animate-fade-up opacity-0 [animation-fill-mode:forwards]"
            style={{
              animationDelay: "0.65s",
              textShadow: "0 1px 6px rgba(255,255,255,0.4)",
            }}
          >
            {EVENT_DATE_LINE} • {EVENT_TIME}
          </p>

          {/* 5. Venue — edit via VENUE_NAME & VENUE_ADDRESS in constants */}
          <p
            className="mt-3 sm:mt-4 text-[0.65rem] sm:text-xs text-warm-taupe/85 font-sans tracking-wide leading-relaxed animate-fade-up opacity-0 [animation-fill-mode:forwards]"
            style={{
              animationDelay: "0.8s",
              textShadow: "0 1px 4px rgba(255,255,255,0.4)",
            }}
          >
            {VENUE_NAME}
            <br />
            {VENUE_ADDRESS}
          </p>
        </div>
      </div>
    </section>
  );
}
