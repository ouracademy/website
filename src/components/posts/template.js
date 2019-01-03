import React from "react";
import { graphql } from "gatsby";
import MDXRenderer from "gatsby-mdx/mdx-renderer";
import Layout from "../layout";

const PostPageTemplate = ({ data: { mdx } }) => (
  <Layout title={mdx.frontmatter.title}>
    <h1>{mdx.frontmatter.title}</h1>
    <MDXRenderer>{mdx.code.body}</MDXRenderer>
  </Layout>
);

export default PostPageTemplate;

// TODO: update when some fix
// see: https://github.com/ChristopherBiscardi/gatsby-mdx/issues/130
export const query = graphql`
  query($id: String!) {
    mdx(id: { eq: $id }) {
      id
      frontmatter {
        title
      }
      code {
        body
      }
    }
  }
`;

// FIXME: warning The GraphQL query in the non-page component
// see: https://github.com/ChristopherBiscardi/gatsby-mdx/issues/214
