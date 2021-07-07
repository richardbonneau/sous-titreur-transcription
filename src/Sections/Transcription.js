import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { MenuDivider, Button, Menu, MenuItem } from "@blueprintjs/core";
import { Popover2 } from "@blueprintjs/popover2";
import { useSelector, useDispatch } from "react-redux";
import { deleteCaption } from "../_Redux/Actions";
import getCaretCoordinates from "textarea-caret-position";

const Container = styled.div`
  width: 100%;

  max-width: 500px;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  flex: 1;

  textarea {
    height: 100%;
    width: 99%;
    resize: none;
    border: none;
  }
`;

function Transcription() {
  const dispatch = useDispatch();
  const [transcriptionText, setTranscriptionText] = useState("");

  const frequentMistakes = useSelector((state) => state.data.present.frequentMistakes);
  const frequentlyUsedWords = useSelector((state) => state.data.present.frequentlyUsedWords);

  useEffect(() => {
    document.querySelector("textarea").addEventListener("input", function () {
      var coordinates = getCaretCoordinates(document.querySelector("textarea"));
      console.log(coordinates,document.querySelector("textarea"))
      // console.log(coordinates.top);
      // console.log(coordinates.left);
    });
  }, []);

  const exampleMenu = (
    <Menu>
      {frequentlyUsedWords.map((word) => (
        <MenuItem text={word} />
      ))}
    </Menu>
  );

  return (
    <Container>
      <textarea
        type="text"
        onChange={(e) => setTranscriptionText(e.target.value)}
        value={transcriptionText}
      />
      <Popover2 content={exampleMenu} placement="right-end">
        <Button icon="share" text="Open in..." />
      </Popover2>
    </Container>
  );
}

export default Transcription;
