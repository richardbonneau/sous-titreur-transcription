import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  Player,
  ControlBar,
  ProgressControl,
  DurationDisplay,
  CurrentTimeDisplay,
  TimeDivider,
} from "video-react";
import Waveform from "./Waveform";
import { Spinner } from "@blueprintjs/core";
import styled from "styled-components";

const Container = styled.div`
  max-width: 800px;
  padding: 0 1em;

  width: 100%;
  @media (min-width: 1040px) {
    /* flex: 1;
    width: 100%; */
  }
`;

function VideoPlayer({ isPlaying, playbackSpeed, playerStateChanges }) {
  const player = useRef();

  useEffect(() => {
    player.current.subscribeToStateChange(playerStateChanges);
  }, []);

  useEffect(() => {
    if (isPlaying) player.current.play();
    else player.current.pause();
  }, [isPlaying]);

  useEffect(() => {
    player.current.playbackRate = playbackSpeed;
  }, [playbackSpeed]);

  const seek = (time) => {
    let playerState = player.current.getState();
    let duration = playerState.player.duration;
    player.current.seek((time * 100 * duration) / 100);
  };

  return (
    <Container>
      <Player
        ref={player}
        playsInline
        src={"https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4"}
      >
        <ControlBar disableDefaultControls={true}>
          <CurrentTimeDisplay />
          <TimeDivider />
          <DurationDisplay />
          <ProgressControl />
        </ControlBar>
      </Player>
    </Container>
  );
}

export default VideoPlayer;
