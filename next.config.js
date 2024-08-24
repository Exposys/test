/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  optimizeFonts: false,

  async rewrites() {
    return [
      {
        source: '/api/resources',
        destination: 'https://apikuslabs.com/assets/resources.json',
      },
    ];
  },
};

module.exports = nextConfig;
