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
};

module.exports = nextConfig;
