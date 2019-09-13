import React, { Component } from "react";
import { Link, StaticQuery, graphql } from "gatsby";
import { Helmet } from "react-helmet";
import {
  Heading,
  Box,
  Grommet,
  Button,
  ResponsiveContext,
  Layer,
  Text
} from "grommet";
import { theme } from "./our-theme";
import { Menu as MenuIcon, Close } from "grommet-icons";
import { navigate } from "@reach/router";

const Container = ({ children }) => (
  <ResponsiveContext.Consumer>
    {size => (
      <Box align="center" pad="small">
        <Box width={size !== "small" ? "70vw" : "full"}>{children}</Box>
      </Box>
    )}
  </ResponsiveContext.Consumer>
);

const links = [
  {
    label: "Nosotros",
    href: "/about"
  },
  {
    label: "Tags",
    href: "/tags",
    primary: true
  }
];

const Nav = ({ title }) => (
  <Box as="header" direction="row" align="center" justify="between">
    <Link to="/" style={{ textDecoration: "none" }}>
      <Heading level="2">{title}</Heading>
    </Link>

    <div>
      <ResponsiveContext.Consumer>
        {size => (size === "small" ? <MobileMenu /> : <DesktopNavButtons />)}
      </ResponsiveContext.Consumer>
    </div>
  </Box>
);

class MobileMenu extends Component {
  state = {
    showLayer: false
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
                {links.map(link => (
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
  <Box direction="row" gap="xsmall">
    {links.map(({ href, label, primary }) => (
      <Link to={href}>
        <Button label={label} primary={primary} />
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
          <Container>
            <Nav title={meta.title} />
            {children}
          </Container>
        </React.Fragment>
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

    <script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
    ></script>
    <script>
      {`(adsbygoogle = window.adsbygoogle || []).push({
        google_ad_client: "ca-pub-7004727473065253",
        enable_page_level_ads: true
      });`}
    </script>
  </Helmet>
);
