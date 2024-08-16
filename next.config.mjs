/** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "*",
//       },
//     ],
//   },
// };


const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "*",
      },
      {
        protocol: "https",
        hostname:"web.archive.org"
      },
      {
        protocol: "https",
        hostname:"pbs.twimg.com"
      },
      {
        protocol: "https",
        hostname:"assets.coingecko.com"
      }
    ],
  },
};

export default nextConfig;
