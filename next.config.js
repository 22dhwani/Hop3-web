/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["hop3-s3-bucket.s3.us-west-1.amazonaws.com"],
  }
}

module.exports = nextConfig

