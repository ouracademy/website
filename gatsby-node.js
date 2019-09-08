const path = require(`path`);
const get = require("lodash/get");
const kebabCase = require("lodash/kebabCase");
const uniq = require("lodash/uniq");

const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `Mdx`) {
    const slug = createFilePath({ node, getNode });
    createNodeField({
      node,
      name: `slug`,
      value: slug
    });

    createNodeField({
      node,
      name: "isPublic",
      value: "isPublic" in node.frontmatter ? node.frontmatter.isPublic : true
    });
  }
};

const getTags = posts => {
  const tags = posts.reduce((ac, edge) => {
    return get(edge, "node.frontmatter.tags")
      ? ac.concat(edge.node.frontmatter.tags)
      : ac;
  }, []);

  return uniq(tags);
};

const orderBy = require("lodash/orderBy");
const levenshtein = require("js-levenshtein");

const index = ({ frontmatter }) =>
  frontmatter.title + " " + frontmatter.tags.join();

const getSimilar = (posts, post, limit = 3) => {
  return orderBy(
    posts
      .filter(x => x.id !== post.id) // except the same
      .map(x => ({ ...x, cost: levenshtein(index(x), index(post)) })),
    ["cost"],
    ["asc"]
  ).slice(0, limit);
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  const result = await graphql(
    `
      {
        allMdx {
          edges {
            node {
              id
              parent {
                ... on File {
                  name
                  sourceInstanceName
                  relativePath
                }
              }
              frontmatter {
                tags
                title
                description
              }
              fields {
                slug
              }
              excerpt
            }
          }
        }
      }
    `
  );

  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query');
  }

  // Create blog posts pages.
  const posts = result.data.allMdx.edges.map(x => x.node);
  posts.forEach(node => {
    createPage({
      path: `/${node.parent.sourceInstanceName}/${node.parent.name}`,
      component: path.resolve("./src/components/posts/template.js"),
      context: {
        id: node.id,
        workspacePath: `src/${node.parent.sourceInstanceName}/${node.parent.relativePath}`,
        recommendedContent: getSimilar(posts, node)
      }
    });
  });

  const tags = getTags(posts);
  tags.forEach(tag => {
    createPage({
      path: `/tags/${kebabCase(tag)}/`,
      component: path.resolve("./src/components/tags/template.js"),
      context: {
        tag
      }
    });
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
