const config = {
    siteUrl: 'https://hidonix.vercel.app/en',
    generateRobotsTxt: true,
    robotsTxtOptions: {
      policies: [
        { userAgent: '*', disallow: '/private/' },
        { userAgent: '*', allow: '/' },
      ],
    },
  };
  
  module.exports = config;