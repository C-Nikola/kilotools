import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { i18n } = require("./next-i18next.config");

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@ant-design/icons", "react-syntax-highlighter"],
  i18n,
};

export default nextConfig;
