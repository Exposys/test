/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  experimental: {
    taint: true,
  },
  crossOrigin: "anonymous",
  images: {
    unoptimized: true,
  },
  optimizeFonts: false,
  async rewrites() {
    return [
      {
        source: "/api/assets/resources.json",
        destination: "https://apikuslabs.com/assets/resources.json",
      },
    ];
  },

};

module.exports = nextConfig;
