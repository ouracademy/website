import React from "react";
import { Link, graphql } from "gatsby";
import MDXRenderer from "gatsby-mdx/mdx-renderer";
import { DiscussionEmbed } from "disqus-react";
import { Box, Button, Heading, Text } from "grommet";
import { Tag as TagIcon } from "grommet-icons";

import Layout from "../layout";
import SocialLinks from "./social-links";
import { Card } from "../../pages/about";

import DesignSystem from "../design-system";

const Tags = ({ tags }) => (
  <Box pad="small" direction="row" align="center" gap="small" wrap>
    <TagIcon />
    {tags.map(tag => (
      <Tag key={tag} tag={tag} />
    ))}
  </Box>
);

const Tag = ({ tag }) => (
  <Link to={`/tags/${tag}`}>
    <Button hoverIndicator="light-1" onClick={() => {}}>
      <Box pad="small" direction="row" align="center" gap="small">
        <Text>{tag}</Text>
      </Box>
    </Button>
  </Link>
);

const Author = ({ name, avatar, description }) => (
  <Card name={name} avatar={avatar} description={description} />
);

const PostPageTemplate = ({ data: { mdx }, location }) => {
  const { id, code, excerpt: description } = mdx;
  const { title, author, tags, image = null } = mdx.frontmatter;
  const url = location.href;

  return (
    <Layout
      description={description}
      title={title}
      image={image}
      type="article"
    >
      <Box as="article">
        <Heading>{title}</Heading>
        <SocialLinks title={title} description={description} url={url} />
        <MDXRenderer
          components={{
            pre: DesignSystem.Code
          }}
        >
          {code.body}
        </MDXRenderer>
        <Tags tags={tags} />
        <Author {...author} />
      </Box>
      <Comments id={id} title={title} url={url} />
    </Layout>
  );
};

const disqusShortname = "academyforus";

const Comments = ({ id, url, title }) => (
  <DiscussionEmbed
    shortname={disqusShortname}
    config={{
      url,
      identifier: id,
      title
    }}
  />
);

export default PostPageTemplate;

export const query = graphql`
  query($id: String!) {
    mdx(id: { eq: $id }) {
      id
      frontmatter {
        title
        author {
          avatar
          name
          description
        }
        tags
        image
      }
      excerpt
      code {
        body
      }
    }
  }
`;
