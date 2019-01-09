import React from "react";
import { Link, graphql } from "gatsby";

import Layout from "../components/layout";
import kebabCase from "lodash/kebabCase";

export default ({
  data: {
    allMdx: { group }
  }
}) => (
  <Layout title="Tags">
    <h1>Tags</h1>
    <ul>
      {group.map(tag => (
        <li key={tag.fieldValue}>
          <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
            {tag.fieldValue} ({tag.totalCount})
          </Link>
        </li>
      ))}
    </ul>
  </Layout>
);

export const pageQuery = graphql`
  query {
    allMdx(limit: 2000, filter: { fields: { isPublic: { eq: true } } }) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
