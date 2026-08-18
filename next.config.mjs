/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn-images.dzcdn.net",
      },
    ],
  },
};

export default nextConfig;
