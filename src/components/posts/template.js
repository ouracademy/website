import React from "react";
import { graphql } from "gatsby";
import MDXRenderer from "gatsby-mdx/mdx-renderer";
import { DiscussionEmbed } from "disqus-react";
import { Box, Heading } from "grommet";
import { Tag as TagIcon } from "grommet-icons";
import { Tag } from "../../pages/tags";

import Layout from "../layout";
import SocialLinks from "./social-links";
import { Card } from "../../pages/about";

import DesignSystem from "../design-system";

const Tags = ({ tags }) => (
  <Box pad="small" direction="row" align="center" gap="small" wrap>
    <TagIcon />
    {tags.map(tag => (
      <Tag key={tag} name={tag} />
    ))}
  </Box>
);

const Author = ({ name, avatar, description }) => (
  <Card name={name} avatar={avatar} description={description} />
);

const PostPageTemplate = ({ data: { mdx }, location }) => {
  const { id, code, frontmatter, excerpt } = mdx;
  const { title, author, tags, image = null } = frontmatter;
  const url = location.href;
  const description = frontmatter.description || excerpt;

  return (
    <Layout
      description={description}
      title={title}
      image={image}
      type="article"
    >
      <Box as="article">
        <Heading>{title}</Heading>

        <MDXRenderer
          components={{
            pre: DesignSystem.Code
          }}
        >
          {code.body}
        </MDXRenderer>
        <SocialLinks title={title} description={description} url={url} />
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
        description
      }
      excerpt
      code {
        body
      }
    }
  }
`;
