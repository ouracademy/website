import { graphql, navigate, StaticQuery } from "gatsby";
import { Anchor, Box } from "grommet";
import { Tag as TagIcon } from "grommet-icons";
import kebabCase from "lodash/kebabCase";
import React from "react";
import styled from "styled-components";

const Container = ({ children }) => (
  <Box direction="row" align="center" gap="small">
    {children}
  </Box>
);

export const Tag = ({ name, ...rest }) => (
  <Anchor label={name} onClick={() => navigate(`/tags/${kebabCase(name)}/`)} />
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

const HorizontalBulletList = styled.ul`
  display: inline-block;
  padding: 0;

  li {
    display: inline;

    :last-child:after {
      content: none;
    }
  }
  li a {
    white-space: nowrap;
  }

  li:after {
    content: " · ";
    letter-spacing: 0.2em;
  }
`;

export const HorizontalBulletTags = ({ tags }) => (
  <HorizontalBulletList>
    {tags.map((tag) => (
      <li key={tag}>
        <Tag name={tag} />
      </li>
    ))}
  </HorizontalBulletList>
);

export const Tags = () => (
  <StaticQuery
    query={query}
    render={({ allMdx: { group } }) => (
      <Box>
        <Container>
          <TagIcon />
          <h2>Tags</h2>
        </Container>
        <HorizontalBulletTags
          tags={group.map((x) => x.fieldValue)}
        ></HorizontalBulletTags>
      </Box>
    )}
  />
);
