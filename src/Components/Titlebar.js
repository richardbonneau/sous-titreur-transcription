import React, { useRef, useState, useEffect, useCallback } from "react";
import { Player, ControlBar } from "video-react";
import Waveform from "../Components/Waveform";
import { Navbar, Alignment, Button } from "@blueprintjs/core";
import styled from "styled-components";

const Container = styled.div`

  margin-bottom:.5em;
`;

function Titlebar() {
  return (
      <Container>
    <Navbar>
      <Navbar.Group align={Alignment.LEFT}>
        <Navbar.Heading>Blueprint</Navbar.Heading>
      </Navbar.Group>
      <Navbar.Group align={Alignment.RIGHT}>
        <Button outlined={true} icon="document" text="Done" />
      </Navbar.Group>
    </Navbar>
    </Container>
  );
}

export default Titlebar;
