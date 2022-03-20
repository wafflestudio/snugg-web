/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: process.env.NODE_ENV !== "production"
};

module.exports = nextConfig;
