/* eslint-disable @typescript-eslint/no-var-requires */
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

/** @type {import('next').NextConfig} */
const settings = {
  reactStrictMode: false,
  pwa: {
    dest: 'public',
  },
  runtimeCaching,
  images: {
    domains: ['res.cloudinary.com'],
  },
}

module.exports = process.env.NODE_ENV === 'development' ? settings : withPWA(settings)
