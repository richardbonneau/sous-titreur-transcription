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


// const [regions, setRegions] = useState([
//     {
//       id: "region-1",
//       start: 0.5,
//       end: 10,
//       color: "rgba(0, 0, 0, .5)",
//       data: {
//         systemRegionId: 31
//       }
//     },
//     {
//       id: "region-2",
//       start: 5,
//       end: 25,
//       color: "rgba(225, 195, 100, .5)",
//       data: {
//         systemRegionId: 32
//       }
//     },
//     {
//       id: "region-3",
//       start: 15,
//       end: 35,
//       color: "rgba(25, 95, 195, .5)",
//       data: {
//         systemRegionId: 33
//       }
//     }
//   ]);