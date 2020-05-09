import { graphql } from "gatsby";
import { Anchor, Box, Heading, Image, Paragraph } from "grommet";
import { Github, Link as LinkIcon, Linkedin } from "grommet-icons";
import pickBy from "lodash/pickBy";
import React from "react";
import Layout from "../components/layout";

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
      {Object.keys(pickBy(links)).map((type) => {
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
      "Herramienta colaborativo para la dirección y monitoreo de desarrollo de software usando el framework Essence de SEMAT",
    links: {
      website: "https://essboard.netlify.com/",
    },
    imageURL:
      "https://res.cloudinary.com/our-academy/image/upload/v1589001148/essboard-proposal.png",
  },
  {
    id: 2,
    name: "SOPIOS",
    description:
      "Diseño y desarrollo de la página web para la Sociedad Peruana de Investigación Operativa y de Sistemas (SOPIOS)",
    links: {
      website: "http://sopios.org.pe/",
    },
    imageURL:
      "https://res.cloudinary.com/our-academy/image/upload/v1589000587/sopios-website.png",
  },
  {
    id: 3,
    name: "Keratoconus predict",
    description:
      "Desarrollo e investigación de machine learning en diagnostico de Keratoconus",
    links: {
      website: "https://oftalmosalud.pe/",
    },
    imageURL:
      "https://www.researchgate.net/profile/Afshin_Lotfi2/publication/283975156/figure/fig3/AS:296598736261124@1447726057264/Preoperative-Pentacam-4-map-refractive-of-a-patient-with-keratoconus-who-planned-for-2.png",
  },
];

const Projects = () => (
  <Box>
    <Heading level="3" size="large">
      Proyectos
    </Heading>
    <Box direction="row-responsive">
      {projects.map((project) => (
        <Project key={project.id} {...project} />
      ))}
    </Box>
  </Box>
);

const Project = ({ name, description, imageURL, links }) => (
  <Box>
    <Box pad="xsmall" margin="xsmall">
      <Heading level="2" size="medium" margin="0">
        {name}
      </Heading>
      <a href={links.website} target="_blank" rel="noopener noreferrer">
        <Box height="medium" width="medium">
          <Image src={imageURL} fit="contain" />
        </Box>
      </a>
      <Paragraph size="small">{description}</Paragraph>
    </Box>
  </Box>
);

export default ({
  data: {
    allAuthorYaml: { edges },
  },
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
