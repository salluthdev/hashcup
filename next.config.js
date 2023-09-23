require("dotenv").config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["tokens-data.1inch.io"],
  },
};

module.exports = nextConfig;
