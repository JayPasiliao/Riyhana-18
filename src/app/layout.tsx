import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ClientErrorBoundary from "@/components/ClientErrorBoundary";

// Load Andrew Elegant font using next/font for consistent loading between dev and prod
// Path is relative to this file (src/app/layout.tsx)
const andrewElegant = localFont({
  src: [
    {
      path: "../../public/fonts/ANDREW ELEGANT Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-andrew-elegant",
  display: "swap",
  fallback: ["cursive", "serif"],
  preload: true,
});

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
    // Android Chrome
    "mobile-web-app-status-bar-style": "default",
    "theme-color": "#F9EEE2",
    // Microsoft Edge Mobile
    "msapplication-TileColor": "#F9EEE2",
    "msapplication-config": "/browserconfig.xml",
  },
  metadataBase: new URL('https://riyhana18.website'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://riyhana18.website',
    siteName: "Riyhana's Debut",
    title: "Riyhana Marielle Velarde | Debut · 18th Birthday Celebration",
    description: "RSVP for Riyhana Marielle Velarde's 18th Birthday Debut Celebration — February 7, 2026, South Drive Baguio Manor",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1, // Prevent zoom issues on iOS in-app browsers
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
    <html lang="en" className={`h-full ${andrewElegant.variable}`} suppressHydrationWarning>
      <body className="min-h-screen antialiased font-sans" suppressHydrationWarning>
        <ClientErrorBoundary>
          {children}
        </ClientErrorBoundary>
      </body>
    </html>
  );
}
