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
    <Anchor
        style={{
            color: "#4d5a75",
            background: "#f4f6fa",
            padding: "5px",
            marginRight: "6px",
            lineheight: 1,
            textTransform: "uppercase",
            letterSpacing: "1px",
            fontSize: "11px"
        }}
        label={name}
        onClick={() => navigate(`/tags/${kebabCase(name)}/`)}
    />
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
    display: block;
    padding: 0;

    li {
        display: inline-block;
        margin: 3px 3px;
    }
    li a {
        white-space: nowrap;
    }
`;

export const HorizontalBulletTags = ({ tags }) => (
    <HorizontalBulletList>
        {tags.map(tag => (
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
                <HorizontalBulletTags tags={group.map(x => x.fieldValue)} />
            </Box>
        )}
    />
);
