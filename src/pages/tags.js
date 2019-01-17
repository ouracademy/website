import React from "react";
import { Link, graphql } from "gatsby";
import { Box } from "grommet";
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

export default ({
    data: {
        allMdx: { group }
    }
}) => (
    <Layout title="Tags">
        <h1>Tags</h1>
        <Box direction="column" gap="small">
            {group.map(tag => (
                <Box
                    direction="row"
                    align="center"
                    gap="small"
                    key={tag.fieldValue}
                >
                    <TagIcon />
                    <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                        <Box direction="row" align="center" gap="small">
                            {tag.fieldValue}
                            <TagQuantity>{tag.totalCount}</TagQuantity>
                        </Box>
                    </Link>
                </Box>
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
