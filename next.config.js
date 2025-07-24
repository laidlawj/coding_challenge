// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {

  async rewrites() {
    console.log("Rewrites called");
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
      // IMPORTANT: If you ever make client-side fetches to these paths
      // AND those client-side fetches are somehow locale-prefixed by Next.js (unlikely for direct API calls)
      // or if your middleware *does* prefix them before they hit rewrites,
      // you might need additional locale-aware rewrite rules like these:
      // {
      //   source: '/:locale(uk|us)/api/external/more-products',
      //   destination: 'https://v0-api-endpoint-request.vercel.app/api/more-products',
      // },
      // {
      //   source: '/:locale(uk|us)/api/external/products',
      //   destination: 'https://v0-api-endpoint-request.vercel.app/api/products',
      // },
      // However, based on your current network tab screenshot, the simpler, direct rules above are what's needed.
    ];
  },

 

};

module.exports = nextConfig;
