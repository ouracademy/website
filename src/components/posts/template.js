import { MDXProvider } from "@mdx-js/react";
import { MdxEmbedProvider } from "@pauliescanlon/gatsby-mdx-embed";
import { format } from "date-fns";
import { graphql, Link } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { Box, Heading } from "grommet";
import { Clock, Tag as TagIcon } from "grommet-icons";
import { parseHeader } from "parse-commit-message";
import React from "react";
import { Avatar } from "../../pages/about";
import { PostItem } from "../../pages/articles";
import { Blockquote } from "../design-system";
import { Image, Img } from "../image";
import Layout from "../layout";
import { HorizontalBulletTags } from "../tags/tags";
import { Youtube } from "../youtube";
import SocialLinks from "./social-links";

const Tags = ({ tags }) => (
  <Box pad="small" direction="row" align="center" gap="small" wrap>
    <TagIcon />
    <HorizontalBulletTags tags={tags}></HorizontalBulletTags>
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

const onlyDocCommits = (commits) =>
  commits
    .filter((commit) => commit.message.startsWith("docs"))
    .map((commit) => ({
      ...commit,
      message: parseHeader(commit.message).subject,
    }));

const PostPageTemplate = ({ data: { mdx, github }, location, pageContext }) => {
  const { body, frontmatter, excerpt } = mdx;
  const { title, author, tags, image = null } = frontmatter;
  const url = location.href;
  const description = frontmatter.description || excerpt;
  const history = onlyDocCommits(
    github.repository.defaultBranchRef.target.history.nodes
  );

  const showHistory = history.length > 1;

  return (
    <Layout
      description={description}
      title={title}
      image={image}
      type="article"
    >
      <article>
        <Heading>{title}</Heading>
        <Box direction="row-responsive" align="center" justify="between">
          <Author {...author} />
          <Tags tags={tags} />
        </Box>
        <MDXProvider
          components={{
            blockquote: Blockquote,
            img: Img,
            Image,
            Youtube,
          }}
        >
          <MdxEmbedProvider>
            <MDXRenderer>{body}</MDXRenderer>
          </MdxEmbedProvider>
        </MDXProvider>
        {showHistory && <History commits={history} />}
        <Share title={title} description={description} url={url} />
      </article>
      <Box>
        <Heading level="3">Quiza te pueda interesar...</Heading>
        <Box direction="row-responsive">
          {pageContext.recommendedContent.map((node) => (
            <PostItem key={node.id} {...node}></PostItem>
          ))}
        </Box>
      </Box>
      {/* <Comments id={id} title={title} url={url} /> */}
    </Layout>
  );
};

const History = ({ commits }) => (
  <div>
    <Box direction="row" align="center" gap="small">
      <Clock />
      <Heading level="3">Cambios y revisiones:</Heading>
    </Box>
    {commits.map((commit) => (
      <div key={commit.oid}>
        <p>
          {format(new Date(commit.authoredDate), "dd/MM/yyyy")}:{" "}
          {commit.message}
        </p>
      </div>
    ))}
  </div>
);

const Share = (props) => (
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
  query($id: String!, $workspacePath: String!) {
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
      body
    }

    github {
      repository(owner: "ouracademy", name: "website") {
        defaultBranchRef {
          target {
            ... on GitHub_Commit {
              history(first: 100, path: $workspacePath) {
                nodes {
                  author {
                    name
                  }
                  message
                  oid
                  authoredDate
                  url
                }
              }
            }
          }
        }
      }
    }
  }
`;
