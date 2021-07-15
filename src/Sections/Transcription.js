import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Position, Button, Menu, MenuItem } from "@blueprintjs/core";
import { Popover2 } from "@blueprintjs/popover2";
import { useSelector, useDispatch } from "react-redux";
import { deleteCaption } from "../_Redux/Actions";
import getCaretCoordinates from "textarea-caret";

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
  .context-menu {
    position: absolute;
    z-index: 100;
    left: ${(props) => props.caretPosition.left};
    top: ${(props) => props.caretPosition.top};
    display: ${(props) => (props.isMenuActive ? "block" : "none")};
  }
`;

function Transcription() {
  const dispatch = useDispatch();
  const caretPosition = useRef({ top: 0, left: 0 });

  const [isPopoverOpened, setIsPopoverOpened] = useState(false);
  const [transcriptionText, setTranscriptionText] = useState("");
  const [contextMenu, setContextMenu] = useState([]);

  const frequentMistakes = useSelector((state) => state.data.present.frequentMistakes);
  const frequentlyUsedWords = useSelector((state) => state.data.present.frequentlyUsedWords);

  useEffect(() => {
    const element = document.querySelector("textarea");
    document.querySelector("textarea").addEventListener("input", function () {
      var coordinates = getCaretCoordinates(element, element.selectionEnd);
      console.log(coordinates, document.querySelector("textarea"));
      caretPosition.current = {
        top: coordinates.top + "px",
        left: coordinates.left + "px",
        height: coordinates.height + "px",
      };
    });
  }, []);

  useEffect(() => {
    const textToArray = transcriptionText.split(/\n| /g);
    const lastWord = textToArray[textToArray.length - 1];
    const lastCharacter = transcriptionText[transcriptionText.length - 1];
    console.log("textToArray", textToArray);
    frequentlyUsedWords.forEach((word) => {
      const firstTwoCharacters = word.substring(0, 2);
      if (
        lastCharacter !== " " &&
        lastWord.toLowerCase().includes(firstTwoCharacters.toLowerCase()) &&
        lastWord.toLowerCase() !== word.toLowerCase()
      ) {
        console.log("oi", lastWord.toLowerCase());
        setContextMenu([word]);
      }
    });
  }, [transcriptionText]);

  const contextOptionClicked = (word) => {
    const lastIndexOfSpace = transcriptionText.lastIndexOf(" ");
    const lastIndexOfBreakLine = transcriptionText.lastIndexOf("\n");
    const lastIndex = Math.max(lastIndexOfSpace, lastIndexOfBreakLine);
    let extraSpace = lastIndex === lastIndexOfSpace && lastIndex !== -1 ? " " : "\n";

    if (lastIndex !== lastIndexOfSpace) extraSpace = "\n";
    else if (lastIndex === -1) extraSpace = "";

    const originalTextWithoutLastWord = transcriptionText.substring(0, lastIndex);

    setContextMenu([]);
    setTranscriptionText(originalTextWithoutLastWord + extraSpace + word);
  };

  return (
    <Container caretPosition={caretPosition.current} isMenuActive={contextMenu.length > 0}>
      <textarea
        type="text"
        onChange={(e) => {
          setTranscriptionText(e.target.value);
        }}
        value={transcriptionText}
      />

      <Menu className="context-menu">
        {contextMenu.map((word,i) => (
          <MenuItem key={"context"+i} text={word} onClick={() => contextOptionClicked(word)} />
        ))}
      </Menu>
    </Container>
  );
}

export default Transcription;
