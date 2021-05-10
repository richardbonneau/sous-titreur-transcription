import React from "react";
import { Navbar, Alignment, Button } from "@blueprintjs/core";
import styled from "styled-components";
import { useSelector } from "react-redux";

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
  }
`;

function Titlebar() {
  const identifiant = useSelector((state) => state.data.ident);
  const subtitles = useSelector((state) => state.data.subtitles);

  const sendSubtitlesToAPI = () => {
    fetch("https://api.soustitreur.com/customer/save-srt", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "post",
      body: JSON.stringify({ ident: identifiant, subtitles }),
    })
      .then((res) => res.json())
      .then((body) => {
        console.log(body);
      });
  };

  return (
    <Container>
      <Navbar>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>Sous-Titreur</Navbar.Heading>
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT}>
          <Button
            outlined={true}
            icon="floppy-disk"
            text="Sauvegarder"
            onClick={sendSubtitlesToAPI}
          />
        </Navbar.Group>
      </Navbar>
    </Container>
  );
}

export default Titlebar;
