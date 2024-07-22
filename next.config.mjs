/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nearcatalog.xyz",
      },
    ],
  },
};

export default nextConfig;
