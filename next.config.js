const urlPrefix = process.env.URL_PREFIX ? '/' + process.env.URL_PREFIX : '';

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "ts", "tsx"],
  assetPrefix: urlPrefix,
  basePath: urlPrefix,
  trailingSlash: true,
};

module.exports = config;
