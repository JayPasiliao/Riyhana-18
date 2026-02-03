"use client";

import {
  EVENT_TITLE,
  VENUE_NAME,
  EVENT_START,
  EVENT_END,
} from "@/lib/constants";
import PillButton from "./PillButton";

/**
 * Generates a Google Calendar add-event URL.
 */
function getGoogleCalendarUrl(): string {
  const start = new Date(EVENT_START);
  const end = new Date(EVENT_END);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: EVENT_TITLE,
    dates: `${start.toISOString().replace(/[-:]/g, "").slice(0, 15)}Z/${end.toISOString().replace(/[-:]/g, "").slice(0, 15)}Z`,
    details: `${EVENT_TITLE} at ${VENUE_NAME}`,
    location: VENUE_NAME,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Generates ICS file content for download.
 */
function getIcsContent(): string {
  const start = new Date(EVENT_START);
  const end = new Date(EVENT_END);
  const format = (d: Date) =>
    d.toISOString().replace(/-|:|\.\d{3}/g, "").slice(0, 15) + "Z";
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Debut RSVP//EN",
    "BEGIN:VEVENT",
    `DTSTART:${format(start)}`,
    `DTEND:${format(end)}`,
    `SUMMARY:${EVENT_TITLE}`,
    `LOCATION:${VENUE_NAME.replace(/,/g, "\\,")}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

function downloadIcs() {
  const blob = new Blob([getIcsContent()], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "riyhana-debut.ics";
  a.click();
  URL.revokeObjectURL(url);
}

export default function CalendarButtons() {
  return (
    <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-6 calendar-buttons">
      <a
        href={getGoogleCalendarUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block w-full sm:w-auto"
      >
        <PillButton variant="primary" type="button" className="w-full sm:w-auto">
          Add to Google Calendar
        </PillButton>
      </a>
      <PillButton variant="outline" type="button" onClick={downloadIcs} className="w-full sm:w-auto">
        Download ICS
      </PillButton>
    </div>
  );
}
