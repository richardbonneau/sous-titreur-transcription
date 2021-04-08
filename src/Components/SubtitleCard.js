import React, { useRef, useState, useEffect, useCallback } from "react";
import { Player, ControlBar } from "video-react";
import Waveform from "../Components/Waveform";
import { Spinner, Card, Elevation, Icon, TextArea } from "@blueprintjs/core";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { modifySingleCaption, seeking, addNewCaption, deleteCaption } from "../_Redux/Actions";

const Container = styled.div`
  margin-bottom: 0.2em;
  .bp3-card {
    display: flex;
    margin: 5px;
  }
`;
const SubtitleNumber = styled.div`
  font-size: 1.1em;
  opacity: 0.4;
  padding-bottom: 0.5em;
  cursor: pointer;
`;
const TimeContainer = styled.div`
  width: 175px;
  display: flex;
  flex-direction: column;
  span {
    opacity: 0.4;
    padding-right: 1em;
  }
`;
const InputContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  textarea {
    width: 100%;
    text-align: center;
    resize: none;
    height: 40px;
    border: none;
  }
  textarea:focus {
    outline: none;
  }
`;

function SubtitleCard({ subIndex, subData }) {
  const dispatch = useDispatch();
  const [shiftDown, setShiftDown] = useState(false);

  const linesToString = subData.lines.join("\n");

  const writeText = (e) => {
    let newLines = e.target.value.split("\n");
    let newCaption = { ...subData, lines: newLines };
    dispatch(modifySingleCaption(newCaption, subIndex));
  };

  const keyDown = (event) => {
    if (event.key === "Shift") setShiftDown(true);
    else if (!shiftDown && event.key === "Enter") {
      event.preventDefault();
      const oldCaption = linesToString.substr(0, event.target.selectionStart + 1).split("\n");
      const newCaption = linesToString.substr(event.target.selectionStart + 1).split("\n");
      console.log("oldCaption", oldCaption, "newCaption", newCaption);
      dispatch(addNewCaption(oldCaption, newCaption, subIndex));
    }
  };
  const keyUp = (event) => {
    console.log(event.key);
    if (event.key === "Shift") setShiftDown(false);
    if (event.key === "Backspace" && linesToString === "") dispatch(deleteCaption(subIndex));
  };

  return (
    <Container>
      <Card elevation={Elevation.ONE}>
        <TimeContainer>
          <SubtitleNumber onClick={() => dispatch(seeking(subData.start))}>
            {subIndex + 1}
          </SubtitleNumber>
          <div>
            <Icon icon={"double-chevron-right"} />
            <span>{subData.start.toFixed(3)}</span>
          </div>
          <div>
            <Icon icon={"double-chevron-left"} />
            <span>{subData.end.toFixed(3)}</span>
          </div>
        </TimeContainer>
        <InputContainer>
          <textarea
            onKeyDown={keyDown}
            onKeyUp={keyUp}
            type="text"
            onChange={writeText}
            value={linesToString}
          />
        </InputContainer>
      </Card>
    </Container>
  );
}

export default SubtitleCard;
