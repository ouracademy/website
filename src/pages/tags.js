import React from "react";
import { Link, graphql } from "gatsby";
import { Box, Button, Text } from "grommet";
import { Tag as TagIcon } from "grommet-icons";
import styled from "styled-components";
import Layout from "../components/layout";
import kebabCase from "lodash/kebabCase";

const TagQuantity = styled.div`
  background: #ababab;
  width: 25px;
  color: white;
  border: 10%;
  text-align: center;
`;

const Container = ({ children }) => (
  <Box direction="row" align="center" gap="small">
    {children}
  </Box>
);

export const Tag = ({ name, children }) => (
  <Link to={`/tags/${kebabCase(name)}/`}>
    <Button hoverIndicator="light-1" onClick={() => {}}>
      <Container>
        <Text>{name}</Text>
        {children}
      </Container>
    </Button>
  </Link>
);

export default ({
  data: {
    allMdx: { group }
  }
}) => (
  <Layout title="Tags">
    <Container>
      <TagIcon />
      <h1>Tags</h1>
    </Container>
    <Box gap="small">
      {group.map(tag => (
        <Tag name={tag.fieldValue} key={tag.fieldValue}>
          <TagQuantity>{tag.totalCount}</TagQuantity>
        </Tag>
      ))}
    </Box>
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
