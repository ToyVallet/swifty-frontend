import withBundleAnalyzer from '@next/bundle-analyzer';
import path from 'path';

const __dirname = path.resolve();

const prod = process.env.NODE_ENV === 'production';

const withBundleAnalyzerConfig = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@swifty/ui'],
  output: 'standalone',
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../../'),
  },
  productionBrowserSourceMaps: !prod,
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
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'api-storage.cloud.toast.com',
      },
      {
        protocol: 'https',
        hostname: 'webinfo.dankook.ac.kr',
      },
      { protocol: 'https', hostname: 'scontent.cdninstagram.com' },
      { protocol: 'https', hostname: 'sgyoonseul24.notion.site' },
      { protocol: 'https', hostname: 'scontent-den2-1.cdninstagram.com' },
      { protocol: 'https', hostname: 'www.danfesta.com' },
      {
        protocol: 'https',
        hostname: '2024-mentoring.s3.ap-northeast-2.amazonaws.com',
      },
    ],
  },
};

export default withBundleAnalyzerConfig(
  nextConfig,
  {
    silent: true,
    org: 'danfesta',
    project: 'javascript-nextjs',
  },
  {
    widenClientFileUpload: true,
    tunnelRoute: '/monitoring',
    hideSourceMaps: true,
    disableLogger: true,
    automaticVercelMonitors: true,
  },
);
