import React from "react";
import styled from "styled-components";
import Layout from "../components/layout";
import { graphql } from "gatsby";

const Title = styled.h1`
  display: inline-block;
  border-bottom: 1px solid;
`;

const PostHeader = styled.h3`
  margin-bottom: 1rem;
`;

export default ({ data }) => (
  <Layout>
    <div>
      <Title>Amazing Pandas Eating Things</Title>
      <h4>{data.allMdx.totalCount} Posts</h4>
      {data.allMdx.edges.map(({ node }) => (
        <div key={node.id}>
          <PostHeader>
            {node.frontmatter.title}{" "}
            <span
              style={{
                color: "#bbb"
              }}
            >
              — {node.frontmatter.date}
            </span>
          </PostHeader>
          <p>{node.excerpt}</p>
        </div>
      ))}
    </div>
  </Layout>
);

export const query = graphql`
  query {
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          excerpt
        }
      }
    }
  }
`;
