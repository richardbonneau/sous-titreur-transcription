import React, { useRef, useState, useEffect, useCallback } from "react";
import { Player, ControlBar } from "video-react";
import Waveform from "../Components/Waveform";
import { Spinner } from "@blueprintjs/core";
import styled from "styled-components";
import SubtitleCard from "../Components/SubtitleCard";
import { useSelector, useDispatch } from "react-redux";


const Container = styled.div`
  width: 100%;
  min-width: 700px;
  height: 100%;
  overflow-y: scroll;
  flex: 1;
`;

function SubtitlesEditor() {
  const subtitles = useSelector((state) => state.data.subtitles);
  return (
    <Container>
      {subtitles.map((subData, i) => (
        <SubtitleCard subIndex={i} subData={subData} key={"sub" + i} />
      ))}
    </Container>
  );
}

export default SubtitlesEditor;
