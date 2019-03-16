import React from "react";
import Layout from "../components/layout";
import { Heading } from "grommet";

export default () => (
  <Layout title="Patrones">
    <Heading level="1">OurDevWords</Heading>
    <Heading level="3" color="neutral-1">
      Comparte los patrones, prácticas, principios, términos que usas cada día!
    </Heading>
    <p>
      Esta es una página experimental, que busca revivir la idea de{" "}
      <a href="https://martinfowler.com/bliki/PatternShare.html">
        compartir patrones
      </a>
    </p>
  </Layout>
);

// ---
// title: Detestable
// author: arthur
// tags: [diccionario, testing, "malas cosas", "deuda técnica", "codigo limpio"]
// description: Un adjetivo para describir un software
// date: 2019-03-14
// ---

// Aquí una nueva palabra para tu diccionario.

// Detestable (adjetivo): cuando un software no es testeable.

// Referencia:
// https://martinfowler.com/bliki/Detestable.html
