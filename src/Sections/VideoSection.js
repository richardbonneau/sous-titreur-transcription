import React, { useRef, useState, useEffect, useCallback } from "react";

import styled from "styled-components";
import VideoPlayer from "../Components/VideoPlayer";
import { Button, Label, Slider } from "@blueprintjs/core";
import { useSelector, useDispatch } from "react-redux";
import {
  isVideoPlaying,
  seeking,
  videoIsSeeking,
  verticalZoom,
  horizontalZoom,
} from "../_Redux/Actions";

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
  const [verticalZoomSlider, setVerticalZoomSlider] = useState(1);
  // const [horizontalZoomSlider,setHorizontalZoomSlider] = useState(0)
  const isPlaying = useSelector((state) => state.media.isPlaying);

  return (
    <Container>
      <VideoPlayer playbackSpeed={playbackSpeed} />

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
          Zoom Vertical
          <Slider
            min={1}
            max={6}
            labelStepSize={1}
            stepSize={1}
            onRelease={(newValue) => dispatch(verticalZoom(newValue))}
            onChange={(newValue) => setVerticalZoomSlider(newValue)}
            value={verticalZoomSlider}
          />
        </Label>
      </VideoController>
    </Container>
  );
}

export default VideoSection;
