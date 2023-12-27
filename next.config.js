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
        hostname: "**",
        port: "",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
        port: "",
        pathname: "**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:slug*",
        destination: `http://43.143.254.158/api/:slug*`,
      },
    ];
  },
};
