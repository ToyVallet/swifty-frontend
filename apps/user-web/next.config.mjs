import withBundleAnalyzer from '@next/bundle-analyzer';
import withPlaiceholder from '@plaiceholder/next';
import withPWA from 'next-pwa';

const prod = process.env.NODE_ENV === 'production';

const withPWAConfig = withPWA({
  dest: 'public',
  disable: !prod,
});

const withBundleAnalyzerConfig = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
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
    ],
  },
};

export default withBundleAnalyzerConfig(
  withPWAConfig(withPlaiceholder(nextConfig)),
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
