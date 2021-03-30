import React, { useRef, useState, useEffect, useCallback } from "react";
import { Player, ControlBar } from "video-react";
import Waveform from "../Components/Waveform";
import { Spinner } from "@blueprintjs/core";
import styled from "styled-components";
import SubtitleCard from "../Components/SubtitleCard";

const Container = styled.div`
  width: 100%;
  min-width: 450px;
  height: 100%;
  overflow-y: scroll;
  flex: 1;
`;

function SubtitlesEditor() {
  const numCards = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 11, 1, 1, 1, 1, 1];
  return (
    <Container>
      {numCards.map((card, i) => (
        <SubtitleCard subtitleNum={i + 1} key={"sub" + i} />
      ))}
    </Container>
  );
}

export default SubtitlesEditor;
