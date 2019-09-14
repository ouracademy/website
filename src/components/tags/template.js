import React from "react";
import { graphql } from "gatsby";
import Layout from "../layout";
import { Heading, Text } from "grommet";
import { Tags } from "./tags";
import { Posts } from "../../pages/articles";

export default ({ pageContext, data }) => {
  const { tag } = pageContext;
  const { edges, totalCount } = data.allMdx;

  return (
    <Layout title={tag}>
      <Heading level="1">
        {tag} <Text>{`${totalCount} post${totalCount === 1 ? "" : "s"} `}</Text>
      </Heading>
      <Tags />
      <Posts posts={edges} />
    </Layout>
  );
};

export const pageQuery = graphql`
  query($tag: String) {
    allMdx(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          ...PostInfo
        }
      }
    }
  }
`;
