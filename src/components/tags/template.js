import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../layout";

const header = (totalCount, tag) =>
  `${totalCount} post${totalCount === 1 ? "" : "s"} tagged with "${tag}"`;

const Tags = ({ pageContext, data }) => {
  const { tag } = pageContext;
  const { edges, totalCount } = data.allMdx;

  return (
    <Layout title={tag}>
      <h1>{header(totalCount, tag)}</h1>
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
      <Link to="/tags">All tags</Link>
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
