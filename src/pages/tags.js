import React from "react";
import { Link, graphql } from "gatsby";
import { Box, Button } from "grommet";
import { Tag as TagIcon } from "grommet-icons";
import Layout from "../components/layout";
import kebabCase from "lodash/kebabCase";

const Container = ({ children }) => (
  <Box direction="row" align="center" gap="small">
    {children}
  </Box>
);

export const Tag = ({ name }) => (
  <Box pad="xxsmall">
    <Link to={`/tags/${kebabCase(name)}/`}>
      <Button label={name} />
    </Link>
  </Box>
);

export default ({
  data: {
    allMdx: { group }
  }
}) => (
  <Layout title="Tags">
    <Tags tags={group} />
  </Layout>
);

export const Tags = ({ tags }) => (
  <Box>
    <Container>
      <TagIcon />
      <h2>Tags</h2>
    </Container>
    <Box gap="xsmall" direction="row" wrap={true}>
      {tags.map(tag => (
        <Tag name={tag.fieldValue} key={tag.fieldValue}></Tag>
      ))}
    </Box>
  </Box>
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
