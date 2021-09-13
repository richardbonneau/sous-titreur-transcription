import React, { useState } from "react";
import { Navbar, Alignment, Button, Toaster, Toast } from "@blueprintjs/core";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useHotkeys } from "react-hotkeys-hook";


const Container = styled.div`
  margin-bottom: 0.5em;
  .bp3-navbar {
    background-color: #293742;
    color: white;
  }
  .bp3-button {
    color: white;
    border: 1px solid white;
    margin: 0 5px;
    span {
      color: white;
    }
  }
`;

function Titlebar() {
  const [toasts, setToasts] = useState([]);
  const currentTime = useSelector((state)=>state.data.present.currentTime);



  return (
    <Container>
      <Navbar>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>Sous-Titreur : Transcription</Navbar.Heading>
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT}>
          <Button outlined={true} icon="upload" text="Partager" />
          <Button
            outlined={true}
            icon="floppy-disk"
            text="Sauvegarder"
          />
        </Navbar.Group>
      </Navbar>
      <Toaster>{toasts}</Toaster>
    </Container>
  );
}

export default Titlebar;
