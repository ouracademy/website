import React from "react";
import { graphql } from "gatsby";
import MDXRenderer from "gatsby-mdx/mdx-renderer";

function PostPageTemplate({ data: { mdx } }) {
  return <MDXRenderer>{mdx.code.body}</MDXRenderer>;
}

export default PostPageTemplate;

// TODO: update when some fix
// see: https://github.com/ChristopherBiscardi/gatsby-mdx/issues/130
export const query = graphql`
  query($id: String!) {
    mdx(id: { eq: $id }) {
      id
      code {
        body
      }
    }
  }
`;

// FIXME: warning The GraphQL query in the non-page component
// see: https://github.com/ChristopherBiscardi/gatsby-mdx/issues/214
