"use client";

import { useState, FormEvent } from "react";
import PillButton from "./PillButton";
import SectionCard from "./SectionCard";

/**
 * RSVP form submits via /api/rsvp, which forwards to Google Apps Script Web App.
 * Set env: NEXT_PUBLIC_RSVP_ENDPOINT or RSVP_ENDPOINT = your Web App URL (e.g. https://script.google.com/macros/s/.../exec)
 *
 * Google Sheet columns (headers):
 * Timestamp | Full Name | Contact | Attendance | Guest Count | Meal Preference | Notes
 */

type Attendance = "yes" | "no";
type MealPreference = "chicken" | "fish" | "vegetarian" | "other";

interface FormState {
  fullName: string;
  contact: string;
  attendance: Attendance;
  guestCount: number;
  mealPreference: MealPreference;
  notes: string;
}

const INITIAL_STATE: FormState = {
  fullName: "",
  contact: "",
  attendance: "yes",
  guestCount: 1,
  mealPreference: "chicken",
  notes: "",
};

export default function RSVPForm() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setStatus("loading");
    setErrorMessage("");

    try {
      const body = {
        timestamp: new Date().toISOString(),
        fullName: form.fullName.trim(),
        contact: form.contact.trim(),
        attendance: form.attendance,
        guestCount: form.guestCount,
        mealPreference: form.mealPreference,
        notes: form.notes.trim() || "",
      };

      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus("error");
        setErrorMessage((data.error as string) || "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setForm(INITIAL_STATE);
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <SectionCard title="RSVP" id="rsvp">
        <div className="rounded-2xl border border-gold/50 bg-lavender/10 p-8 text-center">
          <p className="text-xl font-serif text-gray-800 mb-2">Thank you for responding!</p>
          <p className="text-gray-600">We&apos;re excited to celebrate with you.</p>
        </div>
      </SectionCard>
    );
  }

  return (
    <SectionCard title="RSVP" id="rsvp">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="rsvp-name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name <span className="text-gold">*</span>
          </label>
          <input
            id="rsvp-name"
            type="text"
            required
            value={form.fullName}
            onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
            className="w-full rounded-xl border border-lavender/40 px-4 py-3 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition duration-200"
            placeholder="Your full name"
            disabled={status === "loading"}
          />
        </div>

        <div>
          <label htmlFor="rsvp-contact" className="block text-sm font-medium text-gray-700 mb-1">
            Email or Phone <span className="text-gold">*</span>
          </label>
          <input
            id="rsvp-contact"
            type="text"
            required
            value={form.contact}
            onChange={(e) => setForm((f) => ({ ...f, contact: e.target.value }))}
            className="w-full rounded-xl border border-lavender/40 px-4 py-3 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition duration-200"
            placeholder="Email or phone number"
            disabled={status === "loading"}
          />
        </div>

        <div>
          <span className="block text-sm font-medium text-gray-700 mb-2">
            Attendance <span className="text-gold">*</span>
          </span>
          <div className="flex gap-4">
            {(["yes", "no"] as const).map((opt) => (
              <label key={opt} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="attendance"
                  value={opt}
                  checked={form.attendance === opt}
                  onChange={(e) => setForm((f) => ({ ...f, attendance: e.target.value as Attendance }))}
                  disabled={status === "loading"}
                  className="rounded-full border-gold text-gold focus:ring-gold"
                />
                <span className="capitalize">{opt}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="rsvp-guests" className="block text-sm font-medium text-gray-700 mb-1">
            Guest Count (1–5)
          </label>
          <select
            id="rsvp-guests"
            value={form.guestCount}
            onChange={(e) => setForm((f) => ({ ...f, guestCount: Number(e.target.value) }))}
            className="w-full rounded-xl border border-lavender/40 px-4 py-3 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition duration-200"
            disabled={status === "loading"}
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="rsvp-meal" className="block text-sm font-medium text-gray-700 mb-1">
            Meal Preference
          </label>
          <select
            id="rsvp-meal"
            value={form.mealPreference}
            onChange={(e) => setForm((f) => ({ ...f, mealPreference: e.target.value as MealPreference }))}
            className="w-full rounded-xl border border-lavender/40 px-4 py-3 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition duration-200"
            disabled={status === "loading"}
          >
            <option value="chicken">Chicken</option>
            <option value="fish">Fish</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="rsvp-notes" className="block text-sm font-medium text-gray-700 mb-1">
            Notes (optional)
          </label>
          <textarea
            id="rsvp-notes"
            value={form.notes}
            onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
            rows={3}
            className="w-full rounded-xl border border-lavender/40 px-4 py-3 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition duration-200 resize-none"
            placeholder="Any dietary requirements or message..."
            disabled={status === "loading"}
          />
        </div>

        {status === "error" && (
          <div className="rounded-xl bg-soft-pink/20 border border-soft-pink/40 px-4 py-3 text-gray-700 text-sm">
            {errorMessage}
          </div>
        )}

        <PillButton
          type="submit"
          variant="gold"
          disabled={status === "loading"}
          className="w-full sm:w-auto"
        >
          {status === "loading" ? "Sending…" : "Submit RSVP"}
        </PillButton>
      </form>
    </SectionCard>
  );
}
