import React from "react";
import Layout from "../components/layout";
import { Heading, Box, Image, Anchor, Paragraph, Button } from "grommet";
import { Github, LinkNext } from "grommet-icons";
import { Link } from "gatsby";

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

export default () => (
  <Layout>
    <Banner />
    <Box>
      <Box>
        <Box
          direction="row-responsive"
          gap="small"
          justify="between"
          align="center"
        >
          <Box width="large" pad="medium">
            <Paragraph>
              Un lugar dedicado a ayudarte a mejorar tus habilidades de
              desarrollo de software, donde podrás encontrar{" "}
              <strong>técnicas, prácticas y principios</strong> que te ayudarán
              por el resto de tu carrera.
            </Paragraph>
            <Paragraph>
              En temas como Agile, DevOps, Diseño, Machine Learning...
            </Paragraph>
            <Paragraph>
              Y tecnologías, frameworks, lenguajes de la actualidad
            </Paragraph>

            <Box width="small">
              <Link to="articles">
                <Button
                  reverse
                  label="Ver articulos"
                  primary
                  icon={<LinkNext />}
                ></Button>
              </Link>
            </Box>
          </Box>
          <Box height="medium" width="large">
            <Image
              fit="contain"
              src="images/theory-banner.png"
              alt="Temas"
            ></Image>
          </Box>
          <Box height="medium" width="large">
            <Image
              fit="contain"
              src="images/tech-banner.png"
              alt="Tecnologias"
            ></Image>
          </Box>
        </Box>
      </Box>
    </Box>
  </Layout>
);
