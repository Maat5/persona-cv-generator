/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Served at the root of the custom domain https://persona-cv.com,
  // so no basePath is needed in any environment.
};

export default nextConfig;
