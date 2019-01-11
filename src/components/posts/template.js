import React from "react";
import { Link, graphql } from "gatsby";
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

const Tags = ({ tags }) => (
  <h3>
    <i className="tags" />{" "}
    {tags.map(tag => (
      <Tag key={tag} tag={tag} />
    ))}
  </h3>
);

const Tag = ({ tag }) => <Link to={`/tags/${tag}`}>{tag}</Link>;

const PostPageTemplate = ({ data: { mdx }, location }) => {
  const { title, author, tags, image = null } = mdx.frontmatter;
  const description = mdx.excerpt;
  const url = location.href;

  return (
    <Layout
      description={description}
      title={title}
      image={image}
      type="article"
    >
      <h1>{title}</h1>
      <Author {...author} />
      <Tags tags={tags} />
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
