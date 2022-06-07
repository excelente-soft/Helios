/* eslint-disable @typescript-eslint/no-var-requires */
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

/** @type {import('next').NextConfig} */
module.exports = withPWA({
  reactStrictMode: false,
  pwa: {
    dest: 'public',
  },
  runtimeCaching,
  disable: process.env.NODE_ENV === 'development',
  images: {
    domains: ['res.cloudinary.com'],
  },
})
