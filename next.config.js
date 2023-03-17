/** @type {import('next').NextConfig} */
module.exports = {
  typescript: {
    ignoreBuildErrors: true,
  },
  
  reactStrictMode: true,
  images: {
    domains: ['www.google.com', 'lh3.googleusercontent.com'],
  }
}
