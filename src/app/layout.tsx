import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Riyhana Marielle Velarde | Debut · 18th Birthday Celebration",
  description: "RSVP for Riyhana Marielle Velarde's 18th Birthday Debut Celebration — February 7, 2026, South Drive Baguio Manor",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Riyhana's Debut",
  },
  formatDetection: {
    telephone: false,
    date: false,
    address: false,
    email: false,
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F9EEE2" },
    { media: "(prefers-color-scheme: dark)", color: "#F9EEE2" },
  ],
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
