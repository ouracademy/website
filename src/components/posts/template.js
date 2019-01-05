import React from "react";
import { graphql } from "gatsby";
import MDXRenderer from "gatsby-mdx/mdx-renderer";
import Layout from "../layout";
import { At } from "../at";
import { DiscussionEmbed } from "disqus-react";
import SocialLinks from "./social-links";

const Author = ({ name, twitter }) => (
  <div>
    <h4>{name}</h4>
    <At user={twitter} />
  </div>
);

const PostPageTemplate = ({ data: { mdx }, location }) => {
  const title = mdx.frontmatter.title;
  const description = mdx.excerpt;
  const url = location.href;

  return (
    <Layout description={description} title={title} type="article">
      <h1>{title}</h1>
      <Author {...mdx.frontmatter.author} />
      <SocialLinks title={title} description={description} url={url} />
      <MDXRenderer>{mdx.code.body}</MDXRenderer>
      <Comments id={mdx.id} title={mdx.title} url={url} />
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
      }
      excerpt
      code {
        body
      }
    }
  }
`;
