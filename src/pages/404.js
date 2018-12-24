import React from "react";
import Layout from "../components/layout";
import { graphql } from "gatsby";

export default ({ data }) => (
  <Layout>
    <h1>Página no encontrada</h1>
    <p>Quisiste decir?</p>
    <ul>
      {data.allSitePage.edges.map(({ node }, i) => (
        <li key={node.id}>{node.path}</li>
      ))}
    </ul>
  </Layout>
);

export const query = graphql`
  query {
    # TODO: filter: { path: { regex: "/a/i" } }, or use Algolia to suggest
    allSitePage(limit: 5) {
      edges {
        node {
          id
          path
        }
      }
    }
  }
`;
