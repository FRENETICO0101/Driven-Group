/** @type {import('next').NextConfig} */
const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig = {
  // Image Optimization
  images: {
    // The property catalog already ships pre-compressed WebP assets. Serving
    // them directly avoids making availability depend on Vercel's image
    // transformation quota (which returns HTTP 402 when exhausted).
    unoptimized: true,
    // Hero carousels are the primary visual surface of the site. Keep their
    // optimized derivatives at source-like quality instead of the default
    // lossy setting used for smaller editorial images.
    qualities: [75, 85, 90, 100],
    formats: ['image/avif', 'image/webp'],
    // Property photos are reused across the listing, map and detail pages.
    // Cache optimized variants at the edge so repeat visits do not reprocess
    // the original source files.
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
        pathname: '/**',
      },
    ],
  },

  // Vercel Deployment Configuration
  poweredByHeader: false,

  // Performance
  compress: true,
  productionBrowserSourceMaps: false,

};

module.exports = withNextIntl(nextConfig);
