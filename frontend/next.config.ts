import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    loader: 'akamai',
    domains: ['locahost'],
    path: '/',
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'https://res.cloudinary.com',
        port: '',
        pathname: '/**', 
      },
    ]
  }
};

export default nextConfig;
