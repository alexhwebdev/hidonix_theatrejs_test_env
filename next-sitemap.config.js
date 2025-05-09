const config = {
    siteUrl: 'https://hidonix.com/en',
    generateRobotsTxt: true,
    robotsTxtOptions: {
      policies: [
        { userAgent: '*', disallow: '/private/' },
        { userAgent: '*', allow: '/' },
      ],
    },
  };
  
  module.exports = config;