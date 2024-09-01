/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  basePath: "/Linked-Posts",
  output: "export",
  distDir: "dist",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
