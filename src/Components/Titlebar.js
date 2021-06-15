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
  const identifiant = useSelector((state) => state.data.present.ident);
  const subtitles = useSelector((state) => state.data.present.subtitles);
  const currentTime = useSelector((state)=>state.data.present.currentTime);

  useHotkeys("ctrl+s", (e) => {
    e.preventDefault();
    console.log("ctrl save");
    sendSubtitlesToAPI();
  });
  useHotkeys("command+s", (e) => {
    e.preventDefault();
    console.log("save command");
    sendSubtitlesToAPI();
  });

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

  const shareCurrentTime = () => {
    const url = window.location.href.split("&time=")[0];
    navigator.clipboard.writeText(`${url}&time=${currentTime}`)
    setToasts([
      <Toast
        message="Le lien est maintenant dans le presse-papier"
        timeout={3000}
        onDismiss={() => setToasts([])}
        intent="primary"
      />,
    ]);
  };

  return (
    <Container>
      <Navbar>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>Sous-Titreur</Navbar.Heading>
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT}>
          <Button outlined={true} icon="upload" text="Partager" onClick={shareCurrentTime} />
          <Button
            outlined={true}
            icon="floppy-disk"
            text="Sauvegarder"
            onClick={sendSubtitlesToAPI}
          />
        </Navbar.Group>
      </Navbar>
      <Toaster>{toasts}</Toaster>
    </Container>
  );
}

export default Titlebar;
