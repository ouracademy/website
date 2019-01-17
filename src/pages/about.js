import React from "react";

import Layout from "../components/layout";
import { graphql } from "gatsby";
import { Heading, Anchor, Box, Paragraph, Image } from "grommet";
import { Twitter, Github } from "grommet-icons";

const Avatar = ({ size, ...rest }) => (
  <Box height={size} width={size} round="full" background="light-2">
    <Image {...rest} fit="cover" style={{ borderRadius: "50%" }} />
  </Box>
);

export const Card = ({ name, avatar, twitter, description }) => (
  <Box
    background={{ color: "light-2", opacity: "strong" }}
    pad="large"
    margin="xsmall"
    direction="row-responsive"
    round
    gap="small"
  >
    <Avatar src={avatar} alt="foto" size="xsmall" />
    <Box>
      <Heading level="3" margin="xsmall">
        {name}
      </Heading>
      {twitter && <TwitterAnchor username={twitter} />}
      <Paragraph size="medium">{description}</Paragraph>
    </Box>
  </Box>
);

const TwitterAnchor = ({ username }) => (
  <Anchor
    reverse
    color="accent-6"
    icon={<Twitter />}
    label={`@${username}`}
    href={`https://twitter.com/${username}`}
  />
);

const GithubAnchor = ({ username, project }) => (
  <Anchor
    reverse
    color="accent-6"
    icon={<Github />}
    href={`https://github.com/${username}/${project}`}
  />
);

const projects = [
  {
    id: 1,
    name: "Essboard",
    description:
      "Herramienta colaborativo para la direccion y monitoreo de desarrollo de software usando Essence",
    url: "https://cranky-murdock-5f141a.netlify.com/",
    avatar:
      "https://cranky-murdock-5f141a.netlify.com/assets/images/logo/logo-horizontal.png"
  },
  {
    id: 2,
    name: "SOPIOS",
    description: "Sociedad Peruana de Investigación Operativa y de Sistemas",
    url: "http://sopios.org.pe/",
    avatar: ""
  }
];

const Projects = () => (
  <Box>
    <Heading level="3" size="large">
      Proyectos
    </Heading>
    {projects.map(project => (
      <Project key={project.id} {...project} />
    ))}
  </Box>
);

const Project = ({ name, description, avatar, url }) => (
  <Card name={name} avatar={avatar} description={description} />
);

export default ({
  data: {
    allAuthorYaml: { edges }
  }
}) => (
  <Layout title="Nosotros">
    <Heading level="3" size="large">
      Nosotros
    </Heading>
    <p>
      Un grupo de amigos que se divierte aprendiendo y enseñando practicas,
      principios, tecnologías y teorías de desarrollo software.
    </p>
    <Box
      direction="row-responsive"
      wrap="true"
      justify="center"
      pad="large"
      gap="medium"
    >
      {edges.map(({ node: member }) => (
        <Card
          key={member.id}
          name={member.name}
          avatar={member.avatar}
          description={member.description}
          twitter={member.twitter}
        />
      ))}
    </Box>
    <Projects />
  </Layout>
);

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allAuthorYaml {
      edges {
        node {
          id
          name
          avatar
          description
          twitter
        }
      }
    }
  }
`;
