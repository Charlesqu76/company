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
        protocol: "http",
        hostname: "43.143.254.158",
        port: "",
        pathname: "/**",
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
