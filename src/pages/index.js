import React from "react";
import styled from "styled-components";
import Layout from "../components/layout";
import { graphql, Link } from "gatsby";
import { Heading, Box, Image, Anchor, Text } from "grommet";
import { Github } from "grommet-icons";

const PostHeader = styled.h3`
  margin-bottom: 1rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const PostTitle = styled.span`
  font-size: 1.5rem;
`;

const Banner = () => (
  <Box
    pad="large"
    align="center"
    gap="medium"
    direction="row-responsive"
    fill="horizontal"
  >
    <Box height="small" width="small" basis="1/4">
      <Image
        fit="contain"
        src="/icon.png"
        alt="Our academy logo"
        style={{
          borderRadius: "50%"
        }}
      />
    </Box>
    <Box basis="auto">
      <Heading size="medium">
        Un lugar donde aprender desarrollo de software
      </Heading>
      <Box direction="row" gap="small" align="center">
        <Heading level="3"> Para ti, para mi, para todos </Heading>
        <Anchor
          color="accent-6"
          icon={<Github />}
          href={"https://github.com/ouracademy/website"}
        />{" "}
      </Box>
    </Box>
  </Box>
);

const Posts = styled.div`
  display: grid;
  grid-gap: 5px;

  & div {
    height: 330px;
  }

  @media (min-width: 600px) {
    grid-template-columns: repeat(10, 1fr);

    & div {
      height: 400px;
    }

    & div:nth-child(4n + 1) {
      grid-column: span 6;
    }

    & div:nth-child(4n + 2) {
      grid-column: span 4;
    }
    & div:nth-child(4n + 3) {
      grid-column: span 5;
    }

    & div:nth-child(4n) {
      grid-column: span 5;
    }
  }
`;

export default ({ data: { allMdx } }) => (
  <Layout>
    <Banner />
    <Box>
      <Text>
        Un lugar dedicado a ayudarte a mejorar tus habilidades de desarrollo de
        software
      </Text>
      <Text>
        Encontrarás <strong>técnicas, prácticas y principios</strong> que te
        ayudarán por el resto de tu carrera.
      </Text>
      <Text>De Agil, Programación Funcional, DevOps, Machine Learning...</Text>
      <Text>Y tecnologías, frameworks, lenguajes de la actualidad</Text>
    </Box>
    <Posts>
      {allMdx.edges.map(({ node }) => (
        <PostItem key={node.id} {...node} />
      ))}
    </Posts>
  </Layout>
);

const PostItem = ({ fields, frontmatter, excerpt }) => (
  <Box elevation="medium" pad="medium">
    <PostHeader>
      <StyledLink to={`/posts${fields.slug}`}>
        <PostTitle> {frontmatter.title} </PostTitle>
      </StyledLink>
      <span
        style={{
          color: "#bbb"
        }}
      >
        —{frontmatter.date}
      </span>
    </PostHeader>
    {frontmatter.image ? (
      <Image src={frontmatter.image} fit="cover" />
    ) : (
      <p> {frontmatter.description || excerpt} </p>
    )}
  </Box>
);

export const query = graphql`
  query {
    allMdx(
      filter: { fields: { isPublic: { eq: true } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      totalCount
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY", locale: "es")
            image
            description
          }
          excerpt
        }
      }
    }
  }
`;
