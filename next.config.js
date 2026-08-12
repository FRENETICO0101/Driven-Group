/** @type {import('next').NextConfig} */
const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig = {
  // Image Optimization
  images: {
    // Hero carousels are the primary visual surface of the site. Keep their
    // optimized derivatives at source-like quality instead of the default
    // lossy setting used for smaller editorial images.
    qualities: [90, 100],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
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
