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

// post data => exemple : {"ident": "604a7d13cb7cd089704016_5494","subtitles": [{
//             "start": 0.403,
//             "end": 1.153,
//             "lines": ["Bonjour \u00e0 toi."]
//         }, {
//             "start": 1.399,
//             "end": 4.497,
//             "lines": ["Tu es une femme active mais tu es\u00a0", "peut-\u00eatre aussi en cong\u00e9 maternit\u00e9,"]
//         }]}

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
