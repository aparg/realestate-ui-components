/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rets.dolphy.ca",
        port: "",
        pathname: "/residentialPhotos/**",
      },
      {
        protocol: "https",
        hostname: "rets.dolphy.ca",
        port: "",
        pathname: "/commercialPhotos/**",
      },
    ],
  },
};

export default nextConfig;
