/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/external/more-products', // Your internal API route
        destination: 'https://v0-api-endpoint-request.vercel.app/api/more-products', // The actual external API endpoint
      },
      {
        source: '/api/external/products', // For your initial products too, if needed
        destination: 'https://v0-api-endpoint-request.vercel.app/api/products',
      },
    ];
  },
};

module.exports = nextConfig;