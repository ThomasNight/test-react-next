/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/truc/:path*",
        destination: "https://blooming-riders-backend.azurewebsites.net/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
