import path from 'path';

const __dirname = path.resolve();

const production = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@swifty/ui'],
  output: production ? 'standalone' : undefined,
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../../'),
  },
  productionBrowserSourceMaps: !production,
  crossOrigin: 'use-credentials',
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '2024-mentoring.s3.ap-northeast-2.amazonaws.com',
      },
    ],
  },
};

export default nextConfig;
