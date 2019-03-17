const siteUrl = "https://our-academy.org";

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`
});

module.exports = {
  siteMetadata: {
    title: `Ouracademy`,
    image: `${siteUrl}/icon.png`,
    description:
      "Una academia para aprender de ingeniería de software, desde métodos y prácticas hasta las últimas tecnologías en el desarrollo de software"
  },
  plugins: [
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-mdx`,
      options: {
        extensions: [".mdx", ".md"]
      }
    },

    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/src/posts/`
      }
    },
    `gatsby-plugin-styled-components`,
    {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "GitHub",
        fieldName: "github",
        url: "https://api.github.com/graphql",
        headers: {
          Authorization: `bearer ${process.env.GITHUB_TOKEN}`
        }
      }
    },
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
        icon: "static/icon.png" // This path is relative to the root of the site.
      }
    },
    "gatsby-plugin-offline",
    {
      resolve: `gatsby-plugin-google-tagmanager`,
      options: {
        // TODO: only working on reload page (not in client <Link/>)
        // Solution:
        // To automatically track page changes, in GA for instance, you can
        // configure your tags in GTM to trigger on History Change.
        id: "GTM-K7D2R6R"
      }
    }
  ],
  mapping: {
    "Mdx.frontmatter.author": `AuthorYaml`
  }
};
