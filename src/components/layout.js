import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";

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

export default ({ children }) => (
  <Container>
    <header style={{ marginBottom: `1.5rem` }}>
      <Link to="/" style={{ textShadow: `none`, backgroundImage: `none` }}>
        <h3 style={{ display: `inline` }}>Ouracademy</h3>
      </Link>
      <ul style={{ listStyle: `none`, float: `right` }}>
        <ListLink to="/">Home</ListLink>
        <ListLink to="/about">Nosotros</ListLink>
      </ul>
    </header>
    {children}
  </Container>
);
