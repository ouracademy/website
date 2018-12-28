const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);
const componentWithMDXScope = require("gatsby-mdx/component-with-mdx-scope");

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `Mdx`) {
    const slug = createFilePath({ node, getNode });
    createNodeField({
      node,
      name: `slug`,
      value: slug
    });
  }
};
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            allMdx {
              edges {
                node {
                  id
                  fields {
                    slug
                  }
                  code {
                    scope
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }
        // Create blog posts pages.
        result.data.allMdx.edges.forEach(({ node }) => {
          createPage({
            path: node.fields.slug,
            component: componentWithMDXScope(
              path.resolve("./src/components/posts/template.js"),
              node.code.scope
            ),
            context: { id: node.id }
          });
        });
      })
    );
  });
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"],
      alias: { $components: path.resolve(__dirname, "src/components") }
    }
  });
};
