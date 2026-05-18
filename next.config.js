/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image Optimization
  images: {
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

  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
