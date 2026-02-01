"use client";

import { useEffect, useRef, useState } from "react";

export type TabId =
  | "details"
  | "program"
  | "entourage"
  | "venue"
  | "rsvp"
  | "faqs";

const TABS: { id: TabId; label: string }[] = [
  { id: "details", label: "Details" },
  { id: "program", label: "Program" },
  { id: "entourage", label: "Entourage" },
  { id: "venue", label: "Venue" },
  { id: "rsvp", label: "RSVP" },
  { id: "faqs", label: "FAQs" },
];

interface PillTabNavProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export default function PillTabNav({ activeTab, onTabChange }: PillTabNavProps) {
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const tabListRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Map<TabId, HTMLButtonElement>>(new Map());

  useEffect(() => {
    const el = tabRefs.current.get(activeTab);
    const list = tabListRef.current;
    if (el && list) {
      const listRect = list.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      setIndicatorStyle({
        left: elRect.left - listRect.left,
        width: elRect.width,
      });
    }
  }, [activeTab]);

  return (
    <nav
      className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-lavender/20 shadow-soft"
      aria-label="Section navigation"
    >
      <div className="max-w-5xl mx-auto px-4 py-3">
        <div
          ref={tabListRef}
          role="tablist"
          className="relative flex flex-wrap justify-center gap-2 sm:gap-3"
        >
          {TABS.map((tab, index) => (
            <button
              type="button"
              key={tab.id}
              ref={(node) => {
                if (node) tabRefs.current.set(tab.id, node);
              }}
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={activeTab === tab.id}
              aria-controls={tab.id}
              tabIndex={activeTab === tab.id ? 0 : -1}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(tab.id);
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                onTabChange(tab.id);
              }}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                  e.preventDefault();
                  const next = TABS[(index + 1) % TABS.length];
                  const el = document.getElementById(next.id);
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                  onTabChange(next.id);
                  tabRefs.current.get(next.id)?.focus();
                } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                  e.preventDefault();
                  const prev = TABS[(index - 1 + TABS.length) % TABS.length];
                  const el = document.getElementById(prev.id);
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                  onTabChange(prev.id);
                  tabRefs.current.get(prev.id)?.focus();
                }
              }}
              className={`
                relative rounded-full px-4 sm:px-5 py-2.5 text-sm font-medium
                transition-all duration-300 ease-out
                focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2
                ${
                  activeTab === tab.id
                    ? "text-gold bg-lavender/20 shadow-soft"
                    : "text-gray-600 hover:text-lavender hover:bg-lavender/10"
                }
                hover:scale-[1.02] active:scale-[0.98]
              `}
            >
              {tab.label}
            </button>
          ))}
          {/* Animated indicator pill */}
          <div
            className="absolute bottom-0 h-full rounded-full border border-gold/40 bg-gold/10 pointer-events-none transition-all duration-300 ease-out"
            style={{
              left: indicatorStyle.left,
              width: indicatorStyle.width,
              top: 0,
            }}
            aria-hidden="true"
          />
        </div>
      </div>
    </nav>
  );
}

export { TABS };
