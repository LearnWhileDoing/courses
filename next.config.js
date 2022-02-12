const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

module.exports =
  process.env.NODE_ENV === "development"
    ? { swcMinify: true }
    : withPWA({
        swcMinify: true,
        pwa: {
          dest: "public",
          runtimeCaching,
        },
      });
