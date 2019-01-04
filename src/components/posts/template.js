import React from "react";
import { graphql } from "gatsby";
import MDXRenderer from "gatsby-mdx/mdx-renderer";
import Layout from "../layout";
import { At } from "../at";

const Author = ({ name, twitter }) => (
  <div>
    <h4>{name}</h4>
    <At user={twitter} />
  </div>
);

const PostPageTemplate = ({ data: { mdx } }) => (
  <Layout
    title={mdx.frontmatter.title}
    description={mdx.excerpt}
    type="article"
  >
    <h1>{mdx.frontmatter.title}</h1>
    <Author {...mdx.frontmatter.author} />
    <MDXRenderer>{mdx.code.body}</MDXRenderer>
  </Layout>
);

export default PostPageTemplate;

export const query = graphql`
  query($id: String!) {
    mdx(id: { eq: $id }) {
      id
      frontmatter {
        title
        author {
          twitter
          name
        }
      }
      excerpt
      code {
        body
      }
    }
  }
`;
