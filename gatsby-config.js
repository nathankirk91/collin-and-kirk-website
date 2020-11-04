require('dotenv').config({
  path: `.env`,
})
module.exports = {
  siteMetadata: {
    title: `Collin & Kirk Optometrists`,
    description: `Your local small business optometrists`,
    author: `@kirky1423`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_TOKEN
      }
    },
    `gatsby-plugin-graphql-codegen`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `colin-and-kirk`,
        short_name: `colin-and-kirk-optometrists`,
        start_url: `/`,
        background_color: `#FFFFFF`,
        theme_color: `#FFFFFF`,
        display: `minimal-ui`,
        icon: `src/images/icon.png` // This path is relative to the root of the site.
      }
    },
    `gatsby-plugin-offline`,
  ]
}
