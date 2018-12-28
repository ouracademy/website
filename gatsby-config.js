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
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Ouracademy",
        short_name: "Ouracademy",
        start_url: "/",
        background_color: "#5c5e5f",
        theme_color: "#5c5e5f",
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: "standalone",
        icon: "src/images/icon.png" // This path is relative to the root of the site.
      }
    },
    "gatsby-plugin-offline"
  ]
};
