import React, { useRef, useState, useEffect, useCallback } from "react";
import { Player, ControlBar } from "video-react";
import Waveform from "../Components/Waveform";
import { Spinner } from "@blueprintjs/core";
import styled from "styled-components";

const Container = styled.div`
  /* position: fixed; */
  width: 100%;
  /* margin: 0 0.5em; */
  display: none;
  @media (min-width: 1040px) {
    display: block;
  }
`;

function Timeline() {
  return (
    <Container>
      <Waveform />
    </Container>
  );
}

export default Timeline;
