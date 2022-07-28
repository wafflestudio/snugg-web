/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/question",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
