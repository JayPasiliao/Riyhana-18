import { NextRequest, NextResponse } from "next/server";

/**
 * Proxies RSVP form data to Google Apps Script Web App.
 * Set env: RSVP_ENDPOINT (or NEXT_PUBLIC_RSVP_ENDPOINT) = your Web App deploy URL.
 * Sheet headers: Timestamp | Full Name | Contact | Attendance | Guest Count | Meal Preference | Notes
 */
export async function POST(request: NextRequest) {
  const endpoint =
    process.env.RSVP_ENDPOINT || process.env.NEXT_PUBLIC_RSVP_ENDPOINT;

  if (!endpoint) {
    return NextResponse.json(
      { error: "RSVP endpoint not configured" },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { error: text || "Failed to submit RSVP" },
        { status: res.status }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Network error" },
      { status: 500 }
    );
  }
}
