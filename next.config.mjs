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
    ],
  },
};

export default nextConfig;
