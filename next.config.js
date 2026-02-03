/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [],
    unoptimized: false,
  },
  // Ensure proper mobile rendering
  experimental: {
    optimizePackageImports: ['googleapis'],
  },
  // iOS Safari compatibility
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  // Headers for comprehensive mobile browser compatibility
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Accept-CH',
            value: 'DPR, Viewport-Width, Width'
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, must-revalidate'
          },
          // Mobile browser compatibility headers
          {
            key: 'X-UA-Compatible',
            value: 'IE=edge'
          },
          {
            key: 'MobileOptimized',
            value: '320'
          },
          {
            key: 'HandheldFriendly',
            value: 'true'
          },
          // Cross-origin resource sharing for mobile browsers - iOS safe
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'unsafe-none'
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin-allow-popups'
          },
          // Content-Type header for iOS Safari compatibility
          {
            key: 'Content-Type',
            value: 'text/html; charset=utf-8'
          }
        ],
      },
    ];
  },
};

module.exports = nextConfig;
