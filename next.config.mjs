import createNextIntlPlugin from "next-intl/plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "localhost", protocol: "http" },
      { hostname: "res.cloudinary.com", protocol: "https" },
      { hostname: "plus.unsplash.com", protocol: "https" },
      { hostname: "images.unsplash.com", protocol: "https" },
      { hostname: "lh3.googleusercontent.com", protocol: "https" },
      { hostname: "avatars.githubusercontent.com", protocol: "https" },
      { hostname: "pink-main-limpet-182.mypinata.cloud", protocol: "https" },
      {
        hostname: "www.instagram.com",
      },
      {
        hostname: "images.pexels.com",
      },
      {
        hostname: "static.cdninstagram.com",
      },
      {
        hostname: "instagram.fccu9-3.fna.fbcdn.net",
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
