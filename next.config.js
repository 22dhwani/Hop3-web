/** @type {import('next').NextConfig} */
const path = require('path')
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'drive.google.com',
        pathname: '/',
      },
    ],
    domains: ['hop3-s3-bucket.s3.us-west-1.amazonaws.com','drive.google.com'],
  },
};

module.exports = nextConfig;
