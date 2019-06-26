import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../layout";
import { Heading, Text } from "grommet";

const Tags = ({ pageContext, data }) => {
  const { tag } = pageContext;
  const { edges, totalCount } = data.allMdx;

  return (
    <Layout title={tag}>
      <Heading level="1">
        {tag} <Text>{`${totalCount} post${totalCount === 1 ? "" : "s"} `}</Text>
      </Heading>
      <ul>
        {edges.map(({ node }) => {
          const { title } = node.frontmatter;
          const path = `posts${node.fields.slug}`;

          return (
            <li key={path}>
              <Link to={path}>{title}</Link>
            </li>
          );
        })}
      </ul>
    </Layout>
  );
};

export default Tags;

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
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
