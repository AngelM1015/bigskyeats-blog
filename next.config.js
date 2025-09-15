/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  env: {
    NEXT_PUBLIC_SITE_URL: 'https://bigskyeats.com',
    NEXT_PUBLIC_API_URL: 'https://bigskyeats.app/api/v1'
  }
}

module.exports = nextConfig
