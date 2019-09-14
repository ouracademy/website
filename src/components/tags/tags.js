import React from "react";
import { Link } from "gatsby";
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
