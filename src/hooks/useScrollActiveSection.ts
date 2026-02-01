"use client";

import { useEffect, useRef } from "react";

const SECTION_IDS = ["details", "program", "entourage", "venue", "rsvp", "faqs"] as const;
export type SectionId = (typeof SECTION_IDS)[number];

/**
 * Scroll sync: when a section reaches ~45% from the top of the viewport,
 * set activeTab to that section's id. Only one active at a time.
 * Uses requestAnimationFrame so fast scrolling doesn't desync.
 */
export function useScrollActiveSection(
  setActiveTab: (id: SectionId) => void
): void {
  const rafRef = useRef<number | null>(null);
  const setActiveRef = useRef(setActiveTab);
  setActiveRef.current = setActiveTab;

  useEffect(() => {
    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el != null
    );
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => {
          rafRef.current = null;
          const byId = new Map<string, IntersectionObserverEntry>();
          for (const e of entries) {
            const id = e.target.id as SectionId;
            if (!SECTION_IDS.includes(id)) return;
            const existing = byId.get(id);
            if (!existing || e.intersectionRatio > (existing?.intersectionRatio ?? 0))
              byId.set(id, e);
          }
          const visible = Array.from(byId.entries())
            .filter(([, e]) => e.isIntersecting)
            .sort(([, a], [, b]) => a.boundingClientRect.top - b.boundingClientRect.top);
          const top = visible[0];
          if (top) setActiveRef.current(top[0] as SectionId);
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -55% 0px",
        threshold: [0, 0.1, 0.5, 1],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);
}

export { SECTION_IDS };
