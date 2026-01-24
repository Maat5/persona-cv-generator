/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Set basePath for GitHub Pages project repository
  // For user site (username.github.io repo), use ''
  // For project site (other repos), use '/repo-name'
  basePath: process.env.GITHUB_ACTIONS ? '/persona-cv-generator' : '',
};

export default nextConfig;
