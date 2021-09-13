import React, { useRef, useState, useEffect } from "react";
import { Player, ControlBar } from "video-react";
import { useSelector, useDispatch } from "react-redux";
import { currentTime } from "../_Redux/Actions";
import { useHotkeys } from "react-hotkeys-hook";
import styled from "styled-components";

const Container = styled.div`
  max-width: 400px;
  padding: 0 1em;
  width: 100%;
  @media (min-width: 1300px) {
    max-width: 600px;
  }
`;

function VideoPlayer({ playbackSpeed }) {
  const dispatch = useDispatch();
  const player = useRef();
  const isPlaying = useRef();

  const videoUrl = useSelector((state) => state.data.present.videoUrl);
  const seekingTime = useSelector((state) => state.media.seekingTime);

  useHotkeys("ctrl+space", () => (isPlaying.current ? player.current.pause() : player.current.play()),{enableOnTags:["TEXTAREA"]});

  useEffect(() => {
    player.current.subscribeToStateChange((state) => {
      if (isPlaying.current !== !state.paused) isPlaying.current = !state.paused;
      dispatch(currentTime(state.currentTime));
    });
  }, []);


  useEffect(() => {
    if (seekingTime !== 0) player.current.seek(seekingTime);
  }, [seekingTime]);

  useEffect(() => {
    player.current.playbackRate = playbackSpeed;
  }, [playbackSpeed]);

  return (
    <Container>
      <Player ref={player} aspectRatio="16:9">
        <source src={videoUrl} />
        <ControlBar></ControlBar>
      </Player>
    </Container>
  );
}

export default VideoPlayer;
