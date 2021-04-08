import React, { useRef, useState, useEffect, useCallback } from "react";
import { Navbar, Alignment, Button } from "@blueprintjs/core";
import styled from "styled-components";

const Container = styled.div`
  margin-bottom: 0.5em;
  .bp3-navbar {
    background-color: #293742;
    color: white;
  }
  .bp3-button {
    color: white;
  }
`;

function Titlebar() {
  return (
    <Container>
      <Navbar>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>Sous-Titreur</Navbar.Heading>
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT}>
          <Button outlined={true} icon="document" text="Envoyer" />
        </Navbar.Group>
      </Navbar>
    </Container>
  );
}

export default Titlebar;
