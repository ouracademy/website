import React from "react";
import { Link, StaticQuery, graphql } from "gatsby";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { Heading, Box, Grommet, Button } from "grommet";
import { theme } from "./our-theme";

const ListLink = ({ children, to }) => (
  <li style={{ display: `inline-block`, marginRight: `1rem` }}>
    <Link to={to}>{children}</Link>
  </li>
);

const Container = styled.div`
  margin: 0 auto;
  max-width: 70vw;
  padding: 1rem;
`;

const Nav = ({ title }) => (
  <Box
    as="header"
    direction="row"
    align="center"
    width="xlarge"
    alignSelf="center"
    justify="between"
    fill="horizontal"
  >
    <Link to="/" style={{ textDecoration: "none" }}>
      <Heading level="3" size="large">
        {title}
      </Heading>
    </Link>
    <ul style={{ listStyle: `none` }}>
      <ListLink to="/about">
        <Button label="Nosotros" />
      </ListLink>
      <ListLink to="/tags" primary>
        <Button label="Tags" primary />
      </ListLink>
    </ul>
  </Box>
);

export default ({ children, title, description, image, type = "website" }) => (
  <Grommet theme={theme}>
    <StaticQuery
      query={graphql`
        query {
          site {
            siteMetadata {
              title
              description
              image
            }
          }
        }
      `}
      render={({ site: { siteMetadata: meta } }) => (
        <div>
          <SEO
            title={title ? `${title} - ${meta.title}` : meta.title}
            description={description || meta.description}
            type={type}
            image={image || meta.image}
          />
          <Container>
            <Nav title={meta.title} />
            {children}
          </Container>
        </div>
      )}
    />
  </Grommet>
);

const SEO = ({ title, description, type, image }) => (
  <Helmet>
    <html lang="es" />
    <meta charSet="utf-8" />
    <title>{title}</title>
    <meta name="description" content={description} />
    {/* Twitter Card data  */}
    <meta name="twitter:card" value="summary" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    {/* Open Graph data */}
    <meta property="og:type" content={type} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />
  </Helmet>
);
