module.exports = {
  siteUrl: process.env.FRONTEND_URL || 'https://patrykczech.me',
  generateRobotsTxt: true,
  exclude: ['/icon.svg', '/opengraph-image'],

  additionalPaths: async (config) => {
    const result = []
    
    const sections = ['#about-me', '#skills', '#projects', '#contact']

    for (const section of sections) {
      result.push(await config.transform(config, '/' + section))
    }

    return result
  },
}