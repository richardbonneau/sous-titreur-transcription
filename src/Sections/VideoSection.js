import React, { useRef, useState, useEffect, useCallback } from "react";

import styled from "styled-components";
import VideoPlayer from "../Components/VideoPlayer";
import { Button, Label, Slider } from "@blueprintjs/core";
import { useSelector, useDispatch } from "react-redux";
import { isVideoPlaying, seeking,videoIsSeeking, verticalZoom, horizontalZoom } from "../_Redux/Actions";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  flex: 1;
`;
const VideoController = styled.div`
  margin-top: 2em;
`;

function VideoSection() {
  const dispatch = useDispatch();
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const isPlaying = useSelector((state) => state.media.isPlaying);
  const barHeight = useSelector((state) => state.media.barHeight);
  const waveformWidth = useSelector((state) => state.media.waveformWidth);



  return (
    <Container>
      <VideoPlayer
        isPlaying={isPlaying}
        playbackSpeed={playbackSpeed}
      />

      <VideoController>
        <div>
          <Button icon="step-backward" />
          <Button
            large={true}
            icon={isPlaying ? "pause" : "play"}
            onClick={() => dispatch(isVideoPlaying(!isPlaying))}
          />
          <Button icon="step-forward" />
        </div>
        <Label>
          Playback Speed
          <div class="bp3-select .modifier">
            <select onChange={(e) => setPlaybackSpeed(e.target.value)}>
              <option value={0.5}>0.5x</option>
              <option selected value={1}>
                1x
              </option>
              <option value={1.5}>1.5x</option>
            </select>
          </div>
        </Label>
        <Label>
          Vertical Zoom
          <Slider
            min={0.5}
            max={10}
            stepSize={1}
            onChange={(newValue) => dispatch(verticalZoom(newValue))}
            value={barHeight}
          />
        </Label>
        <Label>
          Horizontal Zoom
          <Slider
            min={1}
            max={100}
            labelStepSize={100}
            stepSize={25}
            onChange={(newValue) => dispatch(horizontalZoom(newValue))}
            value={waveformWidth}
          />
        </Label>
      </VideoController>
    </Container>
  );
}

export default VideoSection;
