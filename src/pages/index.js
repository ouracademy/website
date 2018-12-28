import React from "react";
import styled from "styled-components";
import Layout from "../components/layout";
import { graphql, Link } from "gatsby";

const Title = styled.h1`
  display: inline-block;
  border-bottom: 1px solid;
`;

const PostHeader = styled.h3`
  margin-bottom: 1rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const PostTitle = styled.span`
  font-size: 1.5rem;
`;

export default ({ data }) => (
  <Layout>
    <div>
      <Title>Amazing Pandas Eating Things</Title>
      <h4>{data.allMdx.totalCount} Posts</h4>
      {data.allMdx.edges.map(({ node }) => (
        <PostItem key={node.id} {...node} />
      ))}
    </div>
  </Layout>
);

const PostItem = ({ fields, frontmatter, excerpt }) => (
  <div>
    <PostHeader>
      <StyledLink to={`posts${fields.slug}`}>
        <PostTitle>{frontmatter.title}</PostTitle>
      </StyledLink>{" "}
      <span
        style={{
          color: "#bbb"
        }}
      >
        — {frontmatter.date}
      </span>
    </PostHeader>
    <p>{excerpt}</p>
  </div>
);

export const query = graphql`
  query {
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          fields {
            slug
          }
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
