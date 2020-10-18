import { navigate } from "@reach/router";
import { graphql, Link, StaticQuery } from "gatsby";
import {
  Box,
  Button,
  Grommet,
  Heading,
  Layer,
  ResponsiveContext,
  Text,
} from "grommet";
import { Close, Menu as MenuIcon } from "grommet-icons";
import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { createGlobalStyle } from "styled-components";
import { theme } from "./our-theme";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
  p,li{
    line-height: 32px;
    font-size: 19px;
    color: #2c3e50;
  }
  
  figcaption {
    font-size: 15px;
    margin-top: 10px;
    text-align: center;
  }

  figure {
    width: 384px;
    margin: auto;
  }  
  
  `;

const Container = ({ children }) => (
  <ResponsiveContext.Consumer>
    {(size) => (
      <Box align="center" pad="small">
        <Box width={size !== "small" ? "75vw" : "full"}>{children}</Box>
      </Box>
    )}
  </ResponsiveContext.Consumer>
);

const links = [
  {
    label: "Nosotros",
    href: "/about",
  },

  {
    label: "Articulos",
    href: "/articles",
    primary: true,
  },
];

const Nav = ({ title }) => (
  <Box as="header" direction="row" align="center" justify="between">
    <Link to="/" style={{ textDecoration: "none" }}>
      <Heading level="2">{title}</Heading>
    </Link>

    <div>
      <ResponsiveContext.Consumer>
        {(size) => (size === "small" ? <MobileMenu /> : <DesktopNavButtons />)}
      </ResponsiveContext.Consumer>
    </div>
  </Box>
);

class MobileMenu extends Component {
  state = {
    showLayer: false,
  };

  render() {
    const { showLayer } = this.state;
    return (
      <Box pad="small" fill align="center" justify="center">
        <MenuIcon
          color="plain"
          onClick={() => this.setState({ showLayer: true })}
        />
        {showLayer && (
          <Layer full>
            <Box fill background="light-1" pad="large">
              <Box align="end">
                <Close onClick={() => this.setState({ showLayer: false })} />
              </Box>
              <Box
                fill
                gap="xlarge"
                align="center"
                justify="center"
                pad={{ bottom: "large" }}
              >
                {links.map((link) => (
                  <Text
                    key={link.label}
                    size="xxlarge"
                    onClick={() => {
                      navigate(link.href);
                    }}
                  >
                    {link.label}
                  </Text>
                ))}
              </Box>
            </Box>
          </Layer>
        )}
      </Box>
    );
  }
}

const DesktopNavButtons = () => (
  <Box direction="row" align="center" gap="xsmall">
    {links.map(({ href, label, ...rest }) => (
      <Link key={href} to={href}>
        <Button label={label} {...rest} />
      </Link>
    ))}
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
        <React.Fragment>
          <SEO
            title={title ? `${title} - ${meta.title}` : meta.title}
            description={description || meta.description}
            type={type}
            image={image || meta.image}
          />
          <GlobalStyle />
          <Container>
            <div style={{ zIndex: 10, position: "relative" }}>
              <Nav title={meta.title} />
              {children}
            </div>
          </Container>
        </React.Fragment>
      )}
    />
  </Grommet>
);

// Diana svg code
// const BackgroundCurve = () => (
//   <svg
//     style={{
//       zIndex: 1,
//       position: "absolute",
//       top: 0,
//       background: "#f4f6fa",
//     }}
//     viewBox="0 0 700 700"
//     preserveAspectRatio="xMinYMin meet"
//   >
//     <defs>
//       <linearGradient id="Gradient1" x1="0" x2="1" y1="0" y2="1">
//         <stop offset="0%" stopColor="white" />
//         <stop offset="100%" stopColor="white" />
//       </linearGradient>
//     </defs>
//     <path
//       d="M0,130 C180,165 400,140 700,130 L700,00 L0,0 Z"
//       style={{ stroke: "none", fill: "url(#Gradient1)" }}
//     />
//   </svg>
// );

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

    <script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
    />
    <script>
      {`(adsbygoogle = window.adsbygoogle || []).push({
        google_ad_client: "ca-pub-7004727473065253",
        enable_page_level_ads: true
      });`}
    </script>
  </Helmet>
);
