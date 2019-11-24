import React from "react";

import Layout from "../components/layout";
import { graphql } from "gatsby";
import { Heading, Anchor, Box, Paragraph, Image } from "grommet";
import { Github, Link as LinkIcon, Linkedin } from "grommet-icons";
import pickBy from "lodash/pickBy";

export const Avatar = ({ size, ...rest }) => (
  <Box height={size} width={size} round="full" background="light-2">
    <Image {...rest} fit="cover" style={{ borderRadius: "50%" }} />
  </Box>
);

export const Card = ({ name, avatar, links, description }) => (
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

      <Contact name={name} links={links} />
      <Paragraph size="medium">{description}</Paragraph>
    </Box>
  </Box>
);

const Contact = ({ name, links }) => {
  return (
    <div>
      {Object.keys(pickBy(links)).map(type => {
        const value = links[type];
        const key = `${type}_${name}`;
        switch (type) {
          case "twitter":
            return <TwitterAnchor key={key} username={value} />;
          case "github":
            return <GithubAnchor key={key} username={value} />;
          case "linkedIn":
            return <LinkedInAnchor key={key} username={value} />;
          case "website":
            return <WebsiteAnchor key={key} url={value} />;
          default:
            return `not implemented ${key} ${value}`;
        }
      })}
    </div>
  );
};

const TwitterAnchor = ({ username }) => (
  <Anchor
    color="accent-6"
    label={`@${username}`}
    href={`https://twitter.com/${username}`}
  />
);

const GithubAnchor = ({ username, project }) => (
  <Anchor
    color="accent-6"
    icon={<Github />}
    href={`https://github.com/${username}${project ? `/${project}` : ``}`}
  />
);

const LinkedInAnchor = ({ username }) => (
  <Anchor
    color="accent-6"
    icon={<Linkedin />}
    href={`https://www.linkedin.com/in/${username}`}
  />
);

const WebsiteAnchor = ({ url }) => (
  <Anchor color="accent-6" icon={<LinkIcon color="plain" />} href={url} />
);

const projects = [
  {
    id: 1,
    name: "Essboard",
    description:
      "Herramienta colaborativo para la dirección y monitoreo de desarrollo de software usando Essence",
    links: {
      website: "https://essboard.netlify.com/"
    },
    avatar:
      "https://essboard.netlify.com/assets/images/logo/logo-horizontal.png"
  },
  {
    id: 2,
    name: "SOPIOS",
    description: "Sociedad Peruana de Investigación Operativa y de Sistemas",
    links: {
      website: "http://sopios.org.pe/"
    },
    avatar:
      "http://res.cloudinary.com/sopios/image/upload/v1513311519/sopios.png"
  }
];

const Projects = () => (
  <Box>
    <Heading level="3" size="large" />
    Proyectos
    {projects.map(project => (
      <Project key={project.id} {...project} />
    ))}
  </Box>
);

const Project = ({ name, description, avatar, links }) => (
  <Card name={name} avatar={avatar} description={description} links={links} />
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
      wrap
      direction="row-responsive"
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
          links={member.links}
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
          links {
            twitter
            github
            linkedIn
            website
          }
        }
      }
    }
  }
`;
