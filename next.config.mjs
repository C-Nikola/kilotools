import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { i18n } = require("./next-i18next.config");

// Here we use the @cloudflare/next-on-pages next-dev module to allow us to use bindings during local development
// (when running the application with `next dev`), for more information see:
// https://github.com/cloudflare/next-on-pages/blob/main/internal-packages/next-dev/README.md
if (process.env.NODE_ENV === "development") {
  await setupDevPlatform();
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@ant-design/icons", "react-syntax-highlighter"],
  i18n,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.producthunt.com",
        port: "",
        pathname: "/widgets/**",
      },
    ],
  },
};

export default nextConfig;
