import React from "react";
import { Link, graphql, StaticQuery } from "gatsby";
import { Box, Button } from "grommet";
import { Tag as TagIcon } from "grommet-icons";
import kebabCase from "lodash/kebabCase";

const Container = ({ children }) => (
  <Box direction="row" align="center" gap="small">
    {children}
  </Box>
);

export const Tag = ({ name, ...rest }) => (
  <Box pad="xxsmall">
    <Link to={`/tags/${kebabCase(name)}/`}>
      <Button label={name} {...rest} />
    </Link>
  </Box>
);

const query = graphql`
  query {
    allMdx(filter: { fields: { isPublic: { eq: true } } }) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;

export const Tags = () => (
  <StaticQuery
    query={query}
    render={({ allMdx: { group } }) => (
      <Box>
        <Container>
          <TagIcon />
          <h2>Tags</h2>
        </Container>
        <Box gap="xsmall" direction="row" wrap={true}>
          {group.map(tag => (
            <Tag name={tag.fieldValue} key={tag.fieldValue}></Tag>
          ))}
        </Box>
      </Box>
    )}
  />
);
