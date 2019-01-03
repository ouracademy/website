import React from "react";
import { graphql } from "gatsby";
import MDXRenderer from "gatsby-mdx/mdx-renderer";
import Layout from "../layout";

const PostPageTemplate = ({ data: { mdx } }) => (
  <Layout
    title={mdx.frontmatter.title}
    description={mdx.excerpt}
    type="article"
  >
    <h1>{mdx.frontmatter.title}</h1>
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
      }
      excerpt
      code {
        body
      }
    }
  }
`;
