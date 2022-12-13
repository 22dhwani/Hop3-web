/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['hop3-s3-bucket.s3.us-west-1.amazonaws.com'],
  },
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
};

module.exports = nextConfig;
