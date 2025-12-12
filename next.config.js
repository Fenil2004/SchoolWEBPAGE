/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'res.cloudinary.com',      // Cloudinary CDN
      'images.unsplash.com',     // Unsplash (temporary fallback)
    ],
  },
}

module.exports = nextConfig

