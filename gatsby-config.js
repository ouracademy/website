module.exports = {
  siteMetadata: {
    title: `Ouracademy`
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`
      }
    },
    `gatsby-plugin-styled-components`
  ]
};
