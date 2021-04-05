import React, { useRef, useState, useEffect, useCallback, createRef } from "react";
import { Player, ControlBar } from "video-react";
import Waveform from "../Components/Waveform";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import CaptionMarker from "../Components/CaptionMarker";


const Container = styled.div`
  background: #ced9e0;
  width: 100%;

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
