import React, { useRef, useState, useEffect, useCallback } from "react";
import { Player, ControlBar } from "video-react";
import Waveform from "../Components/Waveform";
import { useSelector, useDispatch } from "react-redux";

import styled from "styled-components";

const Container = styled.div`
  /* position: fixed; */
  width: 100%;
  /* margin: 0 0.5em; */
  /* display: none; */
  @media (min-width: 1040px) {
    display: block;
  }
`;

function Timeline() {
  const audioUrl = useSelector((state) => state.data.audioUrl);
  return (
    <Container>
      <Waveform />
    </Container>
  );
}

export default Timeline;
