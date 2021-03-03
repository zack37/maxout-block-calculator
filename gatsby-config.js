/* eslint-disable camelcase */
const path = require('path')
const packageJson = require('./package.json')

module.exports = {
  pathPrefix: '/maxout-block-calculator',
  siteMetadata: {
    title: `Maxout Block Calculator`,
    description: packageJson.description,
    author: packageJson.author,
    version: packageJson.version,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.join(__dirname, 'src', 'images'),
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `maxout-block-calculator`,
        short_name: `Block Calculator`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
  ],
}
