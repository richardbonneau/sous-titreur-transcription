import React, { useRef, useState, useEffect, useCallback } from "react";

import styled from "styled-components";
import VideoPlayer from "../Components/VideoPlayer";
import { Button, Label } from "@blueprintjs/core";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
`;
const VideoController = styled.div`
  margin-top: 2em;
`;

function VideoSection() {
  const [isPlaying, setIsplaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  const playerStateChanges = (state) => {
    // console.log("changes", state);
    if (state.ended) setIsplaying(false);
  };

  return (
    <Container>
      <VideoPlayer
        isPlaying={isPlaying}
        playbackSpeed={playbackSpeed}
        playerStateChanges={playerStateChanges}
      />

      <VideoController>
        <div>
          <Button icon="step-backward" />
          <Button
            large={true}
            icon={isPlaying ? "pause" : "play"}
            onClick={() => setIsplaying(!isPlaying)}
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
      </VideoController>
    </Container>
  );
}

export default VideoSection;
