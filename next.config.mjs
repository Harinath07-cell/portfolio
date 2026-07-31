/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "leetcode.com" },
      { protocol: "https", hostname: "assets.leetcode.com" },
      { protocol: "https", hostname: "**.leetcode.com" },
    ],
  },
};

export default nextConfig;
