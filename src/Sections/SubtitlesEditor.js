import React, { useRef, useState, useEffect,useCallback } from "react";
import { Player, ControlBar } from "video-react";
import Waveform from "../Components/Waveform";
import { Spinner } from "@blueprintjs/core";
import styled from "styled-components"

const Container = styled.div`
width:100%;
min-width:450px;
height:100%;
background-color:brown;
flex:1;
`

function SubtitlesEditor() {

  return (
    <Container>

    </Container>
  );
}

export default SubtitlesEditor;
