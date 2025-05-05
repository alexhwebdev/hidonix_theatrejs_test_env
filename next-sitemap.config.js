const config = {
    siteUrl: 'https://hidonix-nextjs-v1.vercel.app/en',
    generateRobotsTxt: true,
    robotsTxtOptions: {
      policies: [
        { userAgent: '*', disallow: '/private/' },
        { userAgent: '*', allow: '/' },
      ],
    },
  };
  
  module.exports = config;