import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Riyhana Marielle Velarde | Debut · 18th Birthday Celebration",
  description: "RSVP for Riyhana Marielle Velarde's 18th Birthday Debut Celebration — February 7, 2026, South Drive Baguio Manor",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
