/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed 'output: export' to enable dynamic pages
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    // Keep unoptimized if you're not using Next.js image optimization
    unoptimized: true,
    // Alternatively, you can configure remote patterns for Sanity images:
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
      },
    ],
  },
};

module.exports = nextConfig;