"use client";

import { VENUE_NAME, VENUE_MAP_EMBED_URL } from "@/lib/constants";

/**
 * Google Maps iframe embed.
 * Replace VENUE_MAP_EMBED_URL in src/lib/constants.ts with your venue's embed URL from Google Maps (Share → Embed map).
 */
export default function VenueMapEmbed() {
  return (
    <div className="rounded-2xl overflow-hidden border border-gold/30 shadow-soft bg-gray-100">
      <div className="aspect-video w-full">
        <iframe
          src={VENUE_MAP_EMBED_URL}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Map: ${VENUE_NAME}`}
          className="min-h-[280px] sm:min-h-[320px]"
        />
      </div>
      <p className="p-4 text-sm text-gray-600 bg-white border-t border-gold/20">
        <strong className="text-gold">{VENUE_NAME}</strong>
      </p>
    </div>
  );
}
