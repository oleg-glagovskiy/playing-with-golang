/** @type {import('next').NextConfig} */

const path = require('path');

const nextConfig = {
  output: 'standalone',
  experimental: {
      serverActions: true,
  },
}

module.exports = nextConfig
