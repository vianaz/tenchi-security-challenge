/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */
const nextTranslate = require('next-translate')

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ['en', 'pt-br'],
    defaultLocale: 'pt-br'
  },
  images: {
    domains: ['rickandmortyapi.com']
  }
}

module.exports = nextTranslate(nextConfig)
