import React from "react";
import { Link, StaticQuery, graphql } from "gatsby";
import styled from "styled-components";
import { Helmet } from "react-helmet";

const ListLink = props => (
  <li style={{ display: `inline-block`, marginRight: `1rem` }}>
    <Link to={props.to}>{props.children}</Link>
  </li>
);

const Container = styled.div`
  margin: 0 auto;
  max-width: 650px;
  padding: 1rem;
`;

export default ({ children, title, description, type = "website" }) => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
            siteUrl
            description
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
          siteUrl={meta.siteUrl}
        />
        <Container>
          <header style={{ marginBottom: `1.5rem` }}>
            <Link
              to="/"
              style={{ textShadow: `none`, backgroundImage: `none` }}
            >
              <h3 style={{ display: `inline` }}>{meta.title}</h3>
            </Link>
            <ul style={{ listStyle: `none`, float: `right` }}>
              <ListLink to="/about">Nosotros</ListLink>
              <ListLink to="/tags">Tags</ListLink>
            </ul>
          </header>
          {children}
        </Container>
      </div>
    )}
  />
);

const SEO = ({ title, description, type, siteUrl }) => (
  <Helmet>
    <html lang="es" />
    <meta charSet="utf-8" />
    <title>{title}</title>>
    <link rel="canonical" href={siteUrl} />
    <meta name="description" content={description} />
    {/* Twitter Card data  */}
    <meta name="twitter:card" value="summary" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    {/* Open Graph data */}
    <meta property="og:type" content={type} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    {/* TODO: <meta property="og:image" content={meta.og.image} /> */}
  </Helmet>
);
