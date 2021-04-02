import React, { useRef, useState, useEffect, useCallback } from "react";
import { Player, ControlBar } from "video-react";
import Waveform from "../Components/Waveform";
import { Spinner, Card, Elevation, Icon, TextArea } from "@blueprintjs/core";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

const Container = styled.div`
  position: absolute;
  bottom: 70px;
  z-index:2;

  .bp3-card {
    background-color:#F5F8FA;
    padding: 10px;
    display: flex;
    align-items: center;
  }
`;

function CaptionMarker({captionData}) {
  const dispatch = useDispatch();
console.log("captionData",captionData)
  return (
    <Container>
      <Card elevation={Elevation.ONE}>
        <div>{captionData.lines.join("\n")}</div>
      </Card>
    </Container>
  );
}

export default CaptionMarker;
