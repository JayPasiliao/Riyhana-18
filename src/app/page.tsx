"use client";

import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import PillTabNav, { type TabId } from "@/components/PillTabNav";
import SectionCard from "@/components/SectionCard";
import RSVPForm from "@/components/RSVPForm";
import CalendarButtons from "@/components/CalendarButtons";
import VenueMapEmbed from "@/components/VenueMapEmbed";
import { useScrollActiveSection } from "@/hooks/useScrollActiveSection";
import { EVENT_DATE_LINE, VENUE_NAME } from "@/lib/constants";

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>("details");
  useScrollActiveSection(setActiveTab);

  return (
    <main className="min-h-screen">
      <HeroSection />

      <PillTabNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Details — full-width section (edge-to-edge bg); id for scroll + active state */}
      <section
        id="details"
        role="tabpanel"
        aria-labelledby="tab-details"
        className={`w-full py-8 sm:py-10 md:py-12 lg:py-16 ${activeTab === "details" ? "details-section-visible" : ""}`}
        style={{ backgroundColor: "#F3EEFF" }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* When & Where card */}
            <article
              className="details-card-wrap details-card-enter focus-within:outline-none focus-within:ring-2 focus-within:ring-lavender/50 focus-within:ring-offset-2 focus-within:ring-offset-[#F3EEFF] rounded-2xl"
              tabIndex={0}
            >
              <div className="details-card-inner">
                <h2 className="details-heading text-xl sm:text-2xl font-serif font-semibold mb-3">
                  When & Where
                </h2>
                <div className="details-title-divider w-full mb-6" aria-hidden="true" />
                <div className="space-y-4">
                  <p className="details-body flex flex-wrap items-baseline gap-2">
                    <span className="details-pill inline-flex items-center rounded-full px-3 py-1 text-sm font-medium">
                      Date
                    </span>
                    <span>{EVENT_DATE_LINE}</span>
                  </p>
                  <p className="details-body flex flex-wrap items-baseline gap-2">
                    <span className="details-pill inline-flex items-center rounded-full px-3 py-1 text-sm font-medium">
                      Venue
                    </span>
                    <span>{VENUE_NAME}</span>
                  </p>
                </div>
              </div>
            </article>

            {/* Celebration card — decorative quote in background */}
            <article
              className="details-card-wrap details-card-enter focus-within:outline-none focus-within:ring-2 focus-within:ring-lavender/50 focus-within:ring-offset-2 focus-within:ring-offset-[#F3EEFF] rounded-2xl relative overflow-hidden"
              tabIndex={0}
            >
              <div
                className="absolute top-4 left-4 text-6xl sm:text-7xl font-serif text-lavender/10 select-none pointer-events-none leading-none"
                aria-hidden="true"
              >
                “
              </div>
              <div className="details-card-inner relative">
                <h2 className="details-heading text-xl sm:text-2xl font-serif font-semibold mb-3">
                  Celebration
                </h2>
                <div className="details-title-divider w-full mb-6" aria-hidden="true" />
                <p className="details-body leading-relaxed">
                  Join us in celebrating Riyhana Velarde&apos;s 18th birthday—a milestone debut filled with elegance, gratitude, and joy. We can&apos;t wait to share this special evening with you.
                </p>
              </div>
            </article>
            </div>
          </div>
        </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* Subtle animated gradient blobs in background */}
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="absolute top-1/4 -left-1/4 w-96 h-96 rounded-full bg-lavender/10 blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 rounded-full bg-soft-pink/10 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        {/* Program */}
        <section
          id="program"
          role="tabpanel"
          aria-labelledby="tab-program"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <SectionCard title="Program">
              <ul className="space-y-4 text-gray-700">
                <li className="flex gap-3">
                  <span className="text-gold font-serif">6:00 PM</span>
                  <span>Guests Arrival & Cocktails</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-gold font-serif">7:00 PM</span>
                  <span>Opening & Grand Entrance</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-gold font-serif">7:30 PM</span>
                  <span>Dinner & Program</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-gold font-serif">9:00 PM</span>
                  <span>Dance & Celebration</span>
                </li>
              </ul>
              <p className="mt-4 text-sm text-gray-500">
                Edit program times in the Program section content (page or component).
              </p>
            </SectionCard>
            <SectionCard title="Dress Code">
              <p className="text-gray-700">
                Semi-formal / Elegant attire. We invite you to dress in shades that complement our lavender and gold theme.
              </p>
            </SectionCard>
          </div>
        </section>

        {/* Entourage */}
        <section
          id="entourage"
          role="tabpanel"
          aria-labelledby="tab-entourage"
        >
          <SectionCard title="Entourage">
            <p className="text-gray-600 mb-6">
              Our beloved entourage who will share this special night with Riyhana. (Edit names and roles in the Entourage section.)
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {["Parents of the Debutante", "18 Roses", "18 Candles", "18 Treasures", "Special Friends"].map((role, i) => (
                <div
                  key={role}
                  className="rounded-xl border border-gold/20 bg-white/60 px-4 py-3 transition duration-300 hover:border-gold/40 hover:shadow-soft"
                >
                  <span className="text-gold font-serif text-sm">{role}</span>
                  <p className="text-gray-600 text-sm mt-1">— To be announced</p>
                </div>
              ))}
            </div>
          </SectionCard>
        </section>

        {/* Venue */}
        <section
          id="venue"
          role="tabpanel"
          aria-labelledby="tab-venue"
        >
          <SectionCard title="Venue">
            <p className="text-gray-700 mb-6">
              <strong className="text-gold">{VENUE_NAME}</strong>
              <br />
              Replace the map embed URL in <code className="text-sm bg-lavender/20 px-1 rounded">src/lib/constants.ts</code> (VENUE_MAP_EMBED_URL) with your venue&apos;s Google Maps embed link.
            </p>
            <VenueMapEmbed />
          </SectionCard>
        </section>

        {/* RSVP: Calendar buttons + Form */}
        <section
          id="rsvp"
          role="tabpanel"
          aria-labelledby="tab-rsvp"
        >
          <div className="space-y-6">
            <SectionCard title="Save the Date">
              <p className="text-gray-700 mb-4">
                Add the event to Google Calendar or download an ICS file.
              </p>
              <CalendarButtons />
            </SectionCard>
            <RSVPForm />
          </div>
        </section>

        {/* FAQs */}
        <section
          id="faqs"
          role="tabpanel"
          aria-labelledby="tab-faqs"
        >
          <SectionCard title="FAQs">
            <ul className="space-y-6">
              <li>
                <h3 className="font-serif font-semibold text-gold mb-1">What time should I arrive?</h3>
                <p className="text-gray-700 text-sm">Doors open at 6:00 PM. We recommend arriving by 6:30 PM.</p>
              </li>
              <li>
                <h3 className="font-serif font-semibold text-gold mb-1">Is there parking?</h3>
                <p className="text-gray-700 text-sm">Yes, venue parking is available. Details will be shared closer to the date.</p>
              </li>
              <li>
                <h3 className="font-serif font-semibold text-gold mb-1">Can I bring a plus-one?</h3>
                <p className="text-gray-700 text-sm">Please indicate your guest count (1–5) in the RSVP form so we can prepare accordingly.</p>
              </li>
              <li>
                <h3 className="font-serif font-semibold text-gold mb-1">Who do I contact for questions?</h3>
                <p className="text-gray-700 text-sm">Reach out via the contact details provided in your invitation, or add a note in the RSVP form.</p>
              </li>
            </ul>
          </SectionCard>
        </section>
      </div>

      <footer className="border-t border-lavender/20 py-8 text-center text-gray-500 text-sm">
        <p>Riyhana Velarde • Debut • 18th Birthday Celebration</p>
      </footer>
    </main>
  );
}
