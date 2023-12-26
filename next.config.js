/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: false,

  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:slug*",
        destination: `http://127.0.0.1:3001/:slug*`,
      },
    ];
  },
};
