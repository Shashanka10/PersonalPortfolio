/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  env: {
    NEXT_PUBLIC_BUILD_DATE: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn-images.dzcdn.net",
      },
      {
        protocol: "https",
        hostname: "image.tmdb.org",
      },
    ],
  },
};

export default nextConfig;
