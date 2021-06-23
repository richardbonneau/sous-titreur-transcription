import React, { useState, useEffect, useRef } from "react";
import { Card, Elevation, Icon } from "@blueprintjs/core";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  modifySingleCaption,
  seeking,
  addNewCaption,
  deleteCaption,
  selectSub,
} from "../_Redux/Actions";

const Container = styled.div`
  padding: 0.01em;
  .bp3-card {
    display: flex;
    margin: 5px;
    padding: 5px 20px;
  }
  .bp3-icon-trash {
    width: 3em;
    display: flex;
    justify-content: center;
    cursor: pointer;
    margin: -1em -2em 0 0;
    padding: 1em;
    height: 45px;
  }
`;
const SubtitleNumber = styled.div`
  font-size: 1.3em;
  opacity: 0.4;
  padding-bottom: 0.5em;
  cursor: pointer;
`;
const TimeContainer = styled.div`
  width: 110px;
  display: flex;
  flex-direction: column;
  .subtime {
    opacity: 0.5;
    display: flex;
  }
  input {
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
    height: 100%;
    width: 99%;
    text-align: center;
    resize: none;
    border: none;
  }
`;
const CharactersContainer = styled.div`
  opacity: 0.5;
`;

function SubtitleCard({ subIndex, subData, openDeleteCaptionDialog }) {
  const dispatch = useDispatch();
  const scrollTo = useRef();
  const [shiftDown, setShiftDown] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [subtitleText, setSubtitleText] = useState("");
  const [charactersPerLine, setCharactersPerLine] = useState([]);

  const subtitles = useSelector((state) => state.data.present.subtitles);

  const currentlySelected = useSelector((state) => state.data.present.currentlySelected);

  useEffect(
    function incomingSubtitles() {
      const characterCount = subData.lines.map((line) => line.length);
      setCharactersPerLine(characterCount);

      const linesToString = subData.lines.join("\n");
      setSubtitleText(linesToString);
      setStartTime(new Date(subData.start * 1000).toISOString().substr(11, 12));
      setEndTime(new Date(subData.end * 1000).toISOString().substr(11, 12));
    },
    [subtitles]
  );

  useEffect(() => {
    if (currentlySelected === subIndex) scrollTo.current.scrollIntoView({ behavior: "smooth" });
  }, [currentlySelected]);

  const timestampToSeconds = (timestamp) => {
    const hhmmss = timestamp.split(":");
    const seconds = hhmmss[0] * 3600 + hhmmss[1] * 60 + +hhmmss[2];
    return seconds;
  };

  const setNewTime = () => {
    const startInput = timestampToSeconds(startTime);
    const endInput = timestampToSeconds(endTime);

    const minStart = subIndex > 0 ? subtitles[subIndex - 1].end : 0;
    const maxEnd = subIndex < subtitles.length - 1 ? subtitles[subIndex + 1].start : 9999;

    let newStartTime;

    if (startInput > minStart && startInput < subData.end) newStartTime = startInput;
    else if (startInput > subData.end) newStartTime = subData.end;
    else newStartTime = minStart;

    let newEndTime;
    if (endInput < maxEnd && endInput > subData.start) {
      newEndTime = endInput;
    } else if (endInput < subData.start) {
      newEndTime = subData.start;
    } else newEndTime = maxEnd;

    let newCaption = { ...subData };

    //If the user enters an invalid time, the value here would be NaN and cause an error.
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
      dispatch(addNewCaption(oldCaption, newCaption, subIndex));
    } else if (event.key === "Backspace" && subtitleText === "") dispatch(deleteCaption(subIndex));
  };
  const keyUp = (event) => {
    if (event.key === "Shift") setShiftDown(false);
  };

  return (
    <Container ref={scrollTo}>
      <Card
        elevation={Elevation.ONE}
        style={currentlySelected === subIndex ? { border: "2px solid black" } : {}}
        onClick={() => {
          dispatch(selectSub(subIndex));
          dispatch(seeking(subData.start+0.0001));
        }}
      >
        <TimeContainer>
          <SubtitleNumber>{subIndex + 1}</SubtitleNumber>
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
        <CharactersContainer>
          {charactersPerLine.map((num, i) => (
            <div key={"char" + i}>{num}</div>
          ))}
        </CharactersContainer>
        <Icon icon="trash" onClick={() => openDeleteCaptionDialog(subIndex)} />
      </Card>
    </Container>
  );
}

export default SubtitleCard;
