/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */
require("dotenv").config({
  path: `.env.development`,
})
module.exports = {
  plugins: [
    `gatsby-theme-material-ui`,
    {
      resolve: `gatsby-source-prismic`,
      options: {
        repositoryName: `sharanblog`,
        accessToken: `${process.env.API_KEY}`,
        linkResolver: ({ node, key, value }) => post => `/${post.uid}`,
      },
    },
  ],
};
