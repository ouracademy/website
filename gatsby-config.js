module.exports = {
  siteMetadata: {
    title: `Ouracademy`
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `src/pages`
      }
    },
    {
      resolve: `gatsby-mdx`,
      options: {
        extensions: [".mdx", ".md"]
      }
    },
    `gatsby-plugin-styled-components`
  ]
};
