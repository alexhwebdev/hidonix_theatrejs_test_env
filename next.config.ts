import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  images: {
    // domains: ['images.ctfassets.net'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.datocms-assets.com',
        port: '',
        pathname: '/**',
      }
    ],

    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "ik.imagekit.io",
    //     port: "",
    //   },
    // ],
  }
  // // Extend Webpack configuration
  // webpack: (config) => {
  //   config.module.rules.push({
  //     test: /\.(graphql|gql)$/,
  //     exclude: /node_modules/,
  //     use: {
  //       loader: "@graphql-tools/webpack-loader",
  //     },
  //   });
  //   return config;
  // },
};

// export default nextConfig;

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
