/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  reactStrictMode: true,
  output: 'export', // Enable static export
  distDir: 'out', // Specify the output directory for the export
  basePath: isProd ? '/portfolio' : '', // Adjust the repository name to match yours
  assetPrefix: isProd ? '/portfolio/' : '', // Adjust the repository name to match yours
  images: {
    unoptimized: true, // Required for static export on GitHub Pages
    domains: [],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days for longer caching
    dangerouslyAllowSVG: true, // Allow SVG which can be helpful for icons
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Enable page speed optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['react-icons'],
  },
};

module.exports = nextConfig;
