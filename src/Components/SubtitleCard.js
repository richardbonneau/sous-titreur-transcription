import React, { useRef, useState, useEffect, useCallback } from "react";
import { Card, Elevation, Icon } from "@blueprintjs/core";
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
  font-size: 1.3em;
  opacity: 0.4;
  padding-bottom: 0.5em;
  cursor: pointer;
`;
const TimeContainer = styled.div`
  width: 175px;
  display: flex;
  flex-direction: column;
  .subtime {
    display: flex;
  }
  input {
    opacity: 0.4;
    padding-right: 1em;
    border: none;
  }
  input:focus {
    border: 1px solid black;
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
`;

function SubtitleCard({ subIndex, subData }) {
  const dispatch = useDispatch();
  const [shiftDown, setShiftDown] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [subtitleText, setSubtitleText] = useState("");
  const subtitles = useSelector((state) => state.data.subtitles);

  useEffect(
    function onMount() {
      const linesToString = subData.lines.join("\n");
      setStartTime(subData.start.toFixed(3));
      setEndTime(subData.end.toFixed(3));
      setSubtitleText(linesToString);
    },
    [subtitles]
  );

  const setNewTime = () => {
    let startInput = Number(startTime);
    let endInput = Number(endTime);

    let minStart = subIndex > 0 ? subtitles[subIndex - 1].end : 0;
    let maxEnd =
      subIndex < subtitles[subtitles.length - 1] ? subtitles[subtitles.length - 1].start : 9999;

    let newStartTime = startInput < minStart ? minStart : startInput;
    let newEndTime = endInput > maxEnd ? maxEnd : endInput;

    let newCaption = { ...subData };

    if (!isNaN(newStartTime)) newCaption.start = newStartTime;
    if (!isNaN(newEndTime)) newCaption.end = newEndTime;

    dispatch(modifySingleCaption(newCaption, subIndex));
  };

  const writeText = () => {
    let newLines = subtitleText.split("\n");
    let newCaption = { ...subData, lines: newLines };
    dispatch(modifySingleCaption(newCaption, subIndex));
  };

  const timeKeyUp = (event) => {
    if (event.key === "Enter") setNewTime();
  };

  const keyDown = (event) => {
    const linesToString = subData.lines.join("\n");
    if (event.key === "Shift") setShiftDown(true);
    else if (!shiftDown && event.key === "Enter") {
      event.preventDefault();
      const oldCaption = linesToString.substr(0, event.target.selectionStart).split("\n");
      const newCaption = linesToString.substr(event.target.selectionStart).split("\n");
      console.log("oldCaption", oldCaption, "newCaption", newCaption);
      dispatch(addNewCaption(oldCaption, newCaption, subIndex));
    }
  };
  const keyUp = (event) => {
    const linesToString = subData.lines.join("\n");

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
          <div className="subtime">
            <Icon icon={"double-chevron-right"} />
            <input
              value={startTime}
              onKeyUp={timeKeyUp}
              onChange={(e) => setStartTime(e.target.value)}
              onBlur={setNewTime}
            />
          </div>
          <div className="subtime">
            <Icon icon={"double-chevron-left"} />
            <input
              value={endTime}
              onKeyUp={timeKeyUp}
              onChange={(e) => setEndTime(e.target.value)}
              onBlur={setNewTime}
            />
          </div>
        </TimeContainer>
        <InputContainer>
          <textarea
            onKeyDown={keyDown}
            onKeyUp={keyUp}
            type="text"
            onChange={(e) => setSubtitleText(e.target.value)}
            onBlur={writeText}
            value={subtitleText}
          />
        </InputContainer>
      </Card>
    </Container>
  );
}

export default SubtitleCard;
