"use client";

import { useState, useEffect, useRef } from "react";

// iOS detection and error handling
if (typeof window !== 'undefined') {
  // Detect iOS
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  
  if (isIOS) {
    document.documentElement.classList.add('ios');
  }
  
  // Global error handler to prevent iOS Safari from stopping rendering
  window.addEventListener('error', (event) => {
    // Log but don't break rendering
    console.error('Error caught:', event.error);
    // Return true to prevent default error handling
    return true;
  });
  
  // Prevent unhandled promise rejections from breaking iOS Safari
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    event.preventDefault();
  });
}
import HeroSection from "@/components/HeroSection";
import PillTabNav, { type TabId } from "@/components/PillTabNav";
import SectionCard from "@/components/SectionCard";
import EntourageCard from "@/components/EntourageCard";
import RSVPForm from "@/components/RSVPForm";
import CalendarButtons from "@/components/CalendarButtons";
import VenueMapEmbed from "@/components/VenueMapEmbed";
import { FloralDivider, GoldDotsDivider, GlitterParticles, CurvedArcDivider, DoubleArcDivider, HaloBehindTitle } from "@/components/DecorativeElements";
import { useScrollActiveSection } from "@/hooks/useScrollActiveSection";
import { EVENT_DATE_LINE, VENUE_NAME, PARENTS, ROSES, CANDLES, ENVELOPES } from "@/lib/constants";

const IconCalendar = () => (
  <svg className="w-5 h-5 shrink-0 text-gold flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: '1.25rem', height: '1.25rem', display: 'inline-block', flexShrink: 0 }}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const IconPin = () => (
  <svg className="w-5 h-5 shrink-0 text-gold flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: '1.25rem', height: '1.25rem', display: 'inline-block', flexShrink: 0 }}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const IconClock = () => (
  <svg className="w-5 h-5 shrink-0 text-gold flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: '1.25rem', height: '1.25rem', display: 'inline-block', flexShrink: 0 }}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>("details");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [inviewBlocks, setInviewBlocks] = useState<Set<number>>(new Set());
  const entourageBlockRefs = useRef<(HTMLDivElement | null)[]>([]);
  useScrollActiveSection(setActiveTab);

  useEffect(() => {
    const observers = entourageBlockRefs.current
      .filter(Boolean)
      .map((el, i) => ({
        el: el as HTMLDivElement,
        i,
      }));
    if (observers.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const i = (entry.target as HTMLDivElement).dataset.blockIndex;
          if (i === undefined) return;
          const idx = Number(i);
          setInviewBlocks((prev) => {
            const next = new Set(prev);
            if (entry.isIntersecting) next.add(idx);
            return next;
          });
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    observers.forEach(({ el, i }) => {
      el.dataset.blockIndex = String(i);
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const faqs = [
    { q: "What time should I arrive?", a: "Doors open at 6:00 PM. We recommend arriving by 6:30 PM." },
    { q: "Is there parking?", a: "Yes, venue parking is available. Details will be shared closer to the date." },
    { q: "Can I bring a plus-one?", a: "Please indicate your guest count (1–5) in the RSVP form so we can prepare accordingly." },
    { q: "Who do I contact for questions?", a: "Reach out via the contact details provided in your invitation, or add a note in the RSVP form." },
  ];

  return (
    <main className="min-h-screen relative dreamy-bg">
      <GlitterParticles />
      <div className="main-reveal relative z-10">
      <HeroSection />

      <PillTabNav activeTab={activeTab} onTabChange={setActiveTab} />

      <section
        id="details"
        role="tabpanel"
        aria-labelledby="tab-details"
        className={`w-full py-8 sm:py-10 md:py-12 lg:py-16 section-gradient-details ${activeTab === "details" ? "details-section-visible" : ""}`}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* When & Where card */}
            <article
              className="details-card-enter card-glass card-group-curved-frame focus-within:outline-none focus-within:ring-2 focus-within:ring-gold/40 focus-within:ring-offset-2 rounded-2xl p-6 sm:p-8 relative"
              tabIndex={0}
            >
              <h2 className="details-heading text-xl sm:text-2xl font-serif font-semibold mb-4 section-title-underline w-fit">
                When & Where
              </h2>
              <div className="space-y-4">
                <p className="details-body flex items-start gap-3">
                  <IconCalendar />
                  <span><strong className="text-gold font-medium">Date</strong><br />{EVENT_DATE_LINE}</span>
                </p>
                <p className="details-body flex items-start gap-3">
                  <IconPin />
                  <span><strong className="text-gold font-medium">Venue</strong><br />{VENUE_NAME}</span>
                </p>
              </div>
            </article>

            {/* Celebration card — decorative quote in background */}
            <article
              className="details-card-enter card-glass card-group-curved-frame focus-within:outline-none focus-within:ring-2 focus-within:ring-gold/40 focus-within:ring-offset-2 rounded-2xl relative overflow-hidden p-6 sm:p-8"
              tabIndex={0}
            >
              <span className="absolute top-4 left-4 text-5xl sm:text-6xl font-serif text-gold/10 select-none pointer-events-none" aria-hidden>&ldquo;</span>
              <h2 className="details-heading text-xl sm:text-2xl font-serif font-semibold mb-4 section-title-underline w-fit relative">
                Celebration
              </h2>
              <p className="details-body leading-relaxed relative">
                Join us in celebrating Riyhana Velarde&apos;s 18th birthday—a milestone debut filled with elegance, gratitude, and joy. We can&apos;t wait to share this special evening with you.
              </p>
            </article>
            </div>
          </div>
        </section>

      <div className="w-full py-1" aria-hidden />

      <section
        id="program"
        role="tabpanel"
        aria-labelledby="tab-program"
        className="w-full py-10 sm:py-14 section-gradient-program"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-6">
            <SectionCard title="Program">
              <div className="relative pl-8">
                <div className="absolute left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-gold/60 via-gold/40 to-gold/20" aria-hidden />
                <ul className="space-y-5 text-gray-700">
                  {[
                    { time: "6:00 PM", label: "Guests Arrival & Cocktails" },
                    { time: "7:00 PM", label: "Opening & Grand Entrance" },
                    { time: "7:30 PM", label: "Dinner & Program" },
                    { time: "9:00 PM", label: "Dance & Celebration" },
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4 relative items-start">
                      <span className="absolute left-0 w-3 h-3 rounded-full bg-gold/80 border-2 border-white shadow-soft -translate-x-[calc(0.5rem+4px)] mt-1.5" aria-hidden />
                      <span className="font-serif text-gold font-semibold text-base shrink-0">{item.time}</span>
                      <span>{item.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </SectionCard>
            <SectionCard title="Dress Code">
              <p className="text-gray-700 mb-4">
                Semi-formal / Elegant attire. Kindly wear neutral tones inspired by warm sunset hues.
              </p>
              <div className="flex flex-wrap gap-3 items-center" aria-label="Approved dress code colors">
                {[
                  { label: "Ivory", hex: "#F9EEE2" },
                  { label: "Sand", hex: "#FBE0D2" },
                  { label: "Nude", hex: "#F8C5AD" },
                  { label: "Taupe", hex: "#DDB398" },
                ].map(({ label, hex }) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-2 rounded-full border border-white/30 px-3 py-1.5 text-sm font-medium shadow-sm"
                    style={{ backgroundColor: hex, color: "rgba(60,45,40,0.9)" }}
                  >
                    <span className="w-3 h-3 rounded-full border border-white/50 shrink-0" style={{ backgroundColor: hex }} aria-hidden />
                    {label}
                  </span>
                ))}
              </div>
            </SectionCard>
          </div>
        </div>
        </section>

      <div className="w-full py-1" aria-hidden />

      <section
        id="entourage"
        role="tabpanel"
        aria-labelledby="tab-entourage"
        className="w-full py-10 sm:py-14 section-gradient-entourage"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
          <SectionCard title="Entourage" className="overflow-visible card-group-curved-frame">
            <p className="text-gray-600 mb-8 max-w-xl text-center mx-auto">
              Our beloved entourage who will share this special night with Riyhana.
            </p>

            <div className="space-y-8">
              <div
                ref={(el) => { entourageBlockRefs.current[0] = el; }}
                className={`entourage-designation-block card-group-curved-frame ${inviewBlocks.has(0) ? "is-inview" : ""}`}
              >
                <header className="text-center mb-6 section-header-curved">
                  <div className="relative inline-block">
                    <HaloBehindTitle className="curved-halo-behind-title" />
                    <h3 className="text-gold font-serif text-lg font-semibold section-title-underline inline-block pb-1 relative">
                      Parents of the Debutante
                    </h3>
                  </div>
                  <div className="flex justify-center mt-3">
                    <CurvedArcDivider className="w-40" />
                  </div>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 max-w-2xl mx-auto">
                  {PARENTS.map((name, i) => (
                    <EntourageCard key={name} name={name} role="parents" index={i} parentIndex={i} animationGroupDelay={0} />
                  ))}
                </div>
              </div>

              <div
                ref={(el) => { entourageBlockRefs.current[1] = el; }}
                className={`entourage-designation-block card-group-curved-frame ${inviewBlocks.has(1) ? "is-inview" : ""}`}
              >
                <header className="text-center mb-6 section-header-curved">
                  <div className="relative inline-block">
                    <HaloBehindTitle className="curved-halo-behind-title" />
                    <h3 className="text-blush-peach font-serif text-lg font-semibold section-title-underline inline-block pb-1 relative">
                      18 Roses
                    </h3>
                  </div>
                  <div className="flex justify-center mt-3">
                    <DoubleArcDivider className="w-40" />
                  </div>
                </header>
                <div className="entourage-grid">
                  {ROSES.map((name, i) => (
                    <EntourageCard key={name} name={name} number={i + 1} role="roses" index={i} animationGroupDelay={80} />
                  ))}
                </div>
              </div>

              <div
                ref={(el) => { entourageBlockRefs.current[2] = el; }}
                className={`entourage-designation-block card-group-curved-frame ${inviewBlocks.has(2) ? "is-inview" : ""}`}
              >
                <header className="text-center mb-6 section-header-curved">
                  <div className="relative inline-block">
                    <HaloBehindTitle className="curved-halo-behind-title" />
                    <h3 className="text-warm-taupe font-serif text-lg font-semibold section-title-underline inline-block pb-1 relative">
                      18 Candles
                    </h3>
                  </div>
                  <div className="flex justify-center mt-3">
                    <CurvedArcDivider className="w-40" />
                  </div>
                </header>
                <div className="entourage-grid">
                  {CANDLES.map((name, i) => (
                    <EntourageCard key={name} name={name} number={i + 1} role="candles" index={i} animationGroupDelay={160} />
                  ))}
                </div>
              </div>

              <div
                ref={(el) => { entourageBlockRefs.current[3] = el; }}
                className={`entourage-designation-block card-group-curved-frame ${inviewBlocks.has(3) ? "is-inview" : ""}`}
              >
                <header className="text-center mb-6 section-header-curved">
                  <div className="relative inline-block">
                    <HaloBehindTitle className="curved-halo-behind-title" />
                    <h3 className="text-warm-taupe font-serif text-lg font-semibold section-title-underline inline-block pb-1 relative">
                      18 Envelopes
                    </h3>
                  </div>
                  <div className="flex justify-center mt-3">
                    <DoubleArcDivider className="w-40" />
                  </div>
                </header>
                <div className="entourage-grid">
                  {ENVELOPES.map((name, i) => (
                    <EntourageCard key={name} name={name} number={i + 1} role="envelopes" index={i} animationGroupDelay={240} />
                  ))}
                </div>
              </div>
            </div>
          </SectionCard>
        </div>
        </section>

      <div className="w-full py-1" aria-hidden />

      <section
        id="venue"
        role="tabpanel"
        aria-labelledby="tab-venue"
        className="w-full py-10 sm:py-14 section-gradient-venue"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <SectionCard title="Venue">
            <p className="text-gray-700 mb-6">
              <strong className="text-gold">{VENUE_NAME}</strong>
            </p>
            <VenueMapEmbed />
          </SectionCard>
        </div>
        </section>

      <div className="w-full py-1" aria-hidden />

      <section
        id="rsvp"
        role="tabpanel"
        aria-labelledby="tab-rsvp"
        className="w-full py-10 sm:py-14 section-gradient-rsvp"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="space-y-6">
            <SectionCard title="Save the Date">
              <p className="text-gray-700 mb-4">
                Add the event to Google Calendar or download an ICS file.
              </p>
              <CalendarButtons />
            </SectionCard>
            <RSVPForm />
          </div>
        </div>
        </section>

      <div className="w-full py-1" aria-hidden />

      <section
        id="faqs"
        role="tabpanel"
        aria-labelledby="tab-faqs"
        className="w-full py-10 sm:py-14 section-gradient-faqs"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <SectionCard title="FAQs">
            <ul className="space-y-2">
              {faqs.map((faq, i) => (
                <li key={i} className="faq-item rounded-xl border overflow-hidden bg-white/30">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="faq-accordion-trigger w-full flex items-center justify-between gap-3 px-4 py-3 sm:px-4 sm:py-3 text-left font-serif font-semibold text-gold hover:bg-gold/5 transition-colors min-h-[44px] touch-manipulation"
                    aria-expanded={openFaq === i}
                  >
                    {faq.q}
                    <svg
                      className={`w-5 h-5 shrink-0 text-gold transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  <div
                    className="faq-accordion-content"
                    data-open={openFaq === i}
                    style={{ maxHeight: openFaq === i ? 200 : 0 }}
                  >
                    <p className="text-gray-700 text-sm px-4 pb-3 pt-0">{faq.a}</p>
                  </div>
                </li>
              ))}
            </ul>
          </SectionCard>
        </div>
        </section>

      <footer
        className="footer-elegant w-full relative z-10 section-gradient-footer"
      >
        <div className="footer-divider-top" aria-hidden />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-24">
          <p className="footer-main-text">
            <span className="footer-name font-andrew-elegant">Riyhana Velarde</span>
            <span className="footer-separator" aria-hidden>•</span>
            <span className="footer-event font-andrew-elegant">Debut</span>
            <span className="footer-separator" aria-hidden>•</span>
            <span className="footer-celebration font-andrew-elegant">18th Birthday Celebration</span>
          </p>
          <div className="footer-ornaments" aria-hidden>
            <span className="footer-sparkle footer-sparkle-1">✦</span>
            <span className="footer-sparkle footer-sparkle-2">✦</span>
            <span className="footer-sparkle footer-sparkle-3">✦</span>
          </div>
        </div>
      </footer>
      </div>
    </main>
  );
}
