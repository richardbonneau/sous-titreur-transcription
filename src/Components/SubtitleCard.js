import React, { useRef, useState, useEffect, useCallback } from "react";
import { Player, ControlBar } from "video-react";
import Waveform from "../Components/Waveform";
import { Spinner, Card, Elevation, Icon, TextArea } from "@blueprintjs/core";
import styled from "styled-components";

const Container = styled.div`
  margin-bottom: 0.2em;
  .bp3-card {
    display: flex;
  }
`;
const SubtitleNumber = styled.div`
  font-size: 1.1em;
  opacity: 0.4;
  padding-bottom: 0.5em;
`;
const TimeContainer = styled.div`
  width: 175px;
  display: flex;
  flex-direction: column;
  span {
    opacity: 0.4;
    padding-right: 1em;
  }
`;
const InputContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  textarea {
    width: 100%;
    text-align: center;
    resize: none;
    height: 40px;
    border: none;
  }
  textarea:focus {
    outline: none;
  }
`;

function SubtitleCard({ subtitleNum }) {
  return (
    <Container>
      <Card elevation={Elevation.ONE}>
        <TimeContainer>
          <SubtitleNumber>{subtitleNum}</SubtitleNumber>
          <div>
            <Icon icon={"double-chevron-right"} />
            <span>00:00:15.440</span>
          </div>
          <div>
            <Icon icon={"double-chevron-left"} />
            <span>00:00:15.440</span>
          </div>
        </TimeContainer>
        <InputContainer>
          <textarea type="text" />
        </InputContainer>
      </Card>
    </Container>
  );
}

export default SubtitleCard;
