"use client";

import { useState, FormEvent } from "react";
import PillButton from "./PillButton";
import SectionCard from "./SectionCard";

/**
 * RSVP form submits to /api/rsvp, which saves directly to Google Sheets.
 *
 * Google Sheet columns (headers):
 * Name | Address | Contact Number | Email Address | Facebook Profile | Confirmation | Message | No. of Guest | Relationship
 */

type Confirmation = "yes" | "no";

interface FormState {
  name: string;
  address: string;
  contactNumber: string;
  emailAddress: string;
  facebookProfile: string;
  confirmation: Confirmation;
  message: string;
  guestCount: number;
  relationship: string;
}

const INITIAL_STATE: FormState = {
  name: "",
  address: "",
  contactNumber: "",
  emailAddress: "",
  facebookProfile: "",
  confirmation: "yes",
  guestCount: 1,
  message: "",
  relationship: "",
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
        name: form.name.trim(),
        address: form.address.trim(),
        contactNumber: form.contactNumber.trim(),
        emailAddress: form.emailAddress.trim(),
        facebookProfile: form.facebookProfile.trim(),
        confirmation: form.confirmation,
        message: form.message.trim(),
        guestCount: form.guestCount,
        relationship: form.relationship.trim(),
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
        <div className="rounded-2xl border border-warm-taupe/50 bg-soft-nude-beige/40 p-8 sm:p-10 text-center">
          <div className="mb-4">
            <svg 
              className="w-16 h-16 mx-auto text-warm-taupe mb-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif text-warm-taupe mb-3 font-semibold">
            Thank you for responding!
          </h3>
          <p className="text-lg text-gray-700 mb-2">
            Your RSVP has been received and saved.
          </p>
          <p className="text-base text-gray-600">
            We&apos;re excited to celebrate with you on this special day.
          </p>
        </div>
      </SectionCard>
    );
  }

  return (
    <SectionCard title="RSVP" id="rsvp">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="rsvp-name" className="block text-sm font-medium text-gray-700 mb-1">
            Name <span className="text-gold">*</span>
          </label>
          <input
            id="rsvp-name"
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="w-full rounded-xl border border-gold/25 bg-white/50 px-4 py-3 focus:border-gold focus:ring-2 focus:ring-gold/25 focus:bg-white/80 outline-none transition-all duration-300 placeholder:text-gray-400"
            placeholder="Your full name"
            disabled={status === "loading"}
          />
        </div>

        <div>
          <label htmlFor="rsvp-address" className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <input
            id="rsvp-address"
            type="text"
            value={form.address}
            onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
            className="w-full rounded-xl border border-gold/25 bg-white/50 px-4 py-3 focus:border-gold focus:ring-2 focus:ring-gold/25 focus:bg-white/80 outline-none transition-all duration-300 placeholder:text-gray-400"
            placeholder="Your address"
            disabled={status === "loading"}
          />
        </div>

        <div>
          <label htmlFor="rsvp-contact-number" className="block text-sm font-medium text-gray-700 mb-1">
            Contact Number <span className="text-gold">*</span>
          </label>
          <input
            id="rsvp-contact-number"
            type="tel"
            required
            value={form.contactNumber}
            onChange={(e) => setForm((f) => ({ ...f, contactNumber: e.target.value }))}
            className="w-full rounded-xl border border-gold/25 bg-white/50 px-4 py-3 focus:border-gold focus:ring-2 focus:ring-gold/25 focus:bg-white/80 outline-none transition-all duration-300 placeholder:text-gray-400"
            placeholder="Phone number"
            disabled={status === "loading"}
          />
        </div>

        <div>
          <label htmlFor="rsvp-email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address <span className="text-gold">*</span>
          </label>
          <input
            id="rsvp-email"
            type="email"
            required
            value={form.emailAddress}
            onChange={(e) => setForm((f) => ({ ...f, emailAddress: e.target.value }))}
            className="w-full rounded-xl border border-gold/25 bg-white/50 px-4 py-3 focus:border-gold focus:ring-2 focus:ring-gold/25 focus:bg-white/80 outline-none transition-all duration-300 placeholder:text-gray-400"
            placeholder="your.email@example.com"
            disabled={status === "loading"}
          />
        </div>

        <div>
          <label htmlFor="rsvp-facebook" className="block text-sm font-medium text-gray-700 mb-1">
            Facebook Profile
          </label>
          <input
            id="rsvp-facebook"
            type="url"
            value={form.facebookProfile}
            onChange={(e) => setForm((f) => ({ ...f, facebookProfile: e.target.value }))}
            className="w-full rounded-xl border border-gold/25 bg-white/50 px-4 py-3 focus:border-gold focus:ring-2 focus:ring-gold/25 focus:bg-white/80 outline-none transition-all duration-300 placeholder:text-gray-400"
            placeholder="https://facebook.com/yourprofile"
            disabled={status === "loading"}
          />
        </div>

        <div>
          <span className="block text-sm font-medium text-gray-700 mb-2">
            Confirmation <span className="text-gold">*</span>
          </span>
          <div className="flex gap-4">
            {(["yes", "no"] as const).map((opt) => (
              <label key={opt} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="confirmation"
                  value={opt}
                  checked={form.confirmation === opt}
                  onChange={(e) => setForm((f) => ({ ...f, confirmation: e.target.value as Confirmation }))}
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
            No. of Guest
          </label>
          <select
            id="rsvp-guests"
            value={form.guestCount}
            onChange={(e) => setForm((f) => ({ ...f, guestCount: Number(e.target.value) }))}
            className="w-full rounded-xl border border-gold/25 bg-white/50 px-4 py-3 focus:border-gold focus:ring-2 focus:ring-gold/25 outline-none transition-all duration-300"
            disabled={status === "loading"}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="rsvp-relationship" className="block text-sm font-medium text-gray-700 mb-1">
            Relationship
          </label>
          <input
            id="rsvp-relationship"
            type="text"
            value={form.relationship}
            onChange={(e) => setForm((f) => ({ ...f, relationship: e.target.value }))}
            className="w-full rounded-xl border border-gold/25 bg-white/50 px-4 py-3 focus:border-gold focus:ring-2 focus:ring-gold/25 focus:bg-white/80 outline-none transition-all duration-300 placeholder:text-gray-400"
            placeholder="e.g., Friend, Family, Colleague"
            disabled={status === "loading"}
          />
        </div>

        <div>
          <label htmlFor="rsvp-message" className="block text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          <textarea
            id="rsvp-message"
            value={form.message}
            onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
            rows={3}
            className="w-full rounded-xl border border-gold/25 bg-white/50 px-4 py-3 focus:border-gold focus:ring-2 focus:ring-gold/25 focus:bg-white/80 outline-none transition-all duration-300 resize-none placeholder:text-gray-400"
            placeholder="Any message or special requests..."
            disabled={status === "loading"}
          />
        </div>

        {status === "error" && (
          <div className="rounded-xl bg-blush-peach/25 border border-blush-peach/40 px-4 py-3 text-gray-700 text-sm">
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
