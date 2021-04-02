import React, { useRef, useState, useEffect, useCallback } from "react";
import { Player, ControlBar } from "video-react";
import Waveform from "../Components/Waveform";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import CaptionMarker from "../Components/CaptionMarker";

const Container = styled.div`
  background:#CED9E0;
  width: 100%;

  @media (min-width: 1040px) {
    display: block;
  }
`;

function Timeline() {
  const subtitles = useSelector((state) => state.data.subtitles);
  return (
    <Container>
      <Waveform />
      {subtitles.map(caption=><CaptionMarker captionData={caption} />)}
    </Container>
  );
}

export default Timeline;
