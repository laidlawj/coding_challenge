// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {

  async rewrites() {
    return [
      // Rewrite for the non-locale-prefixed API calls made by server components.
      // The screenshot confirms requests like '/api/external/more-products' are being made.
      {
        source: '/api/external/more-products',
        destination: 'https://v0-api-endpoint-request.vercel.app/api/more-products',
      },
      {
        source: '/api/external/products',
        destination: 'https://v0-api-endpoint-request.vercel.app/api/products',
      },
    ];
  },

 

};

module.exports = nextConfig;
