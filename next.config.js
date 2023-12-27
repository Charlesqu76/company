/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: false,
  output: "standalone",
  i18n: {
    defaultLocale: "zh", // 默认语言
    locales: ["en", "zh"], // 语言变量
  },
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
