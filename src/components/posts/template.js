import React from "react";
import { Link, graphql } from "gatsby";
import MDXRenderer from "gatsby-mdx/mdx-renderer";
import { DiscussionEmbed } from "disqus-react";
import { Box, Text } from "grommet";
import { Tag as TagIcon } from "grommet-icons";

import Layout from "../layout";
import { At } from "../at";
import SocialLinks from "./social-links";

import DesignSystem from "../design-system";

const Author = ({ name, twitter }) => (
  <Box pad="small" direction="row" align="center" gap="small">
    <h4>{name}</h4>
    <At user={twitter} />
  </Box>
);

const Tags = ({ tags }) => (
  <Box pad="small" direction="row" align="center" gap="small">
    <TagIcon />
    {tags.map(tag => (
      <Tag key={tag} tag={tag} />
    ))}
  </Box>
);

const Tag = ({ tag }) => (
  <Link to={`/tags/${tag}`}>
    <Text>{tag}</Text>
  </Link>
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
      <h1>{title}</h1>
      <Box
        as="div"
        direction="row"
        align="center"
        width="xlarge"
        alignSelf="center"
        justify="between"
      >
        <Author {...author} />
        <Tags tags={tags} />
      </Box>
      <Box>
        <SocialLinks title={title} description={description} url={url} />
        <MDXRenderer
          components={{
            pre: DesignSystem.Code
          }}
        >
          {code.body}
        </MDXRenderer>
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
          twitter
          name
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
