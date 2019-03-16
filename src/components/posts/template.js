import React from "react";
import { graphql, Link } from "gatsby";
import MDXRenderer from "gatsby-mdx/mdx-renderer";
import { Box, Heading } from "grommet";
import { Tag as TagIcon } from "grommet-icons";
import { Tag } from "../../pages/tags";

import Layout from "../layout";
import SocialLinks from "./social-links";
import { Avatar } from "../../pages/about";

import DesignSystem from "../design-system";

const Tags = ({ tags }) => (
  <Box pad="small" direction="row" align="center" gap="small" wrap>
    <TagIcon />
    {tags.map(tag => (
      <Tag key={tag} name={tag} />
    ))}
  </Box>
);

const Author = ({ name, avatar }) => (
  <Link to="/about" style={{ textDecoration: "none" }}>
    <Box pad="small" direction="row" gap="xsmall" align="center">
      <Avatar src={avatar} alt="foto" size="50px" />
      <span>{name}</span>
    </Box>
  </Link>
);

const PostPageTemplate = ({ data: { mdx }, location }) => {
  const { code, frontmatter, excerpt } = mdx;
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
        <Box direction="row-responsive" align="center" justify="between">
          <Author {...author} />
          <Tags tags={tags} />
        </Box>
        <MDXRenderer
          components={{
            pre: DesignSystem.Code,
            blockquote: DesignSystem.Blockquote
          }}
        >
          {code.body}
        </MDXRenderer>
        <Share title={title} description={description} url={url} />
      </Box>
      {/* <Comments id={id} title={title} url={url} /> */}
    </Layout>
  );
};

const Share = props => (
  <Box direction="row-responsive" align="center" justify="between">
    <span>
      Si te fue útil este artículo, por favor compártelo. Apreciamos los
      comentarios y el aliento.
    </span>
    <Box direction="row" align="center">
      <span>Compartelo por:</span>
      <SocialLinks {...props} />
    </Box>
  </Box>
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
