// next.config.js
const { BASE_URL, MORE_PRODUCTS_API, PRODUCTS_API } = require("./consts.js");

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: MORE_PRODUCTS_API,
        destination: `${BASE_URL}${MORE_PRODUCTS_API}`,
      },
      {
        source: PRODUCTS_API,
        destination: `${BASE_URL}${PRODUCTS_API}`,
      },
    ];
  },
};

module.exports = nextConfig;
