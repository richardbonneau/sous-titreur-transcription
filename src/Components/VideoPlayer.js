import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  Player,
  ControlBar,
  ProgressControl,
  DurationDisplay,
  CurrentTimeDisplay,
  TimeDivider,
} from "video-react";
import { useSelector, useDispatch } from "react-redux";
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

function VideoPlayer({ playbackSpeed, playerStateChanges }) {
  const player = useRef();
  const videoUrl = useSelector((state) => state.data.videoUrl);
  const subtitles = useSelector((state) => state.data.subtitles);
  const isPlaying = useSelector((state) => state.media.isPlaying);
  const seekingTime = useSelector((state) => state.media.seekingTime);

  useEffect(() => {
    player.current.subscribeToStateChange(playerStateChanges);
  }, []);

  useEffect(() => {
    if (player.current) {
      let videoElement = player.current.video.video;
      // console.log("videoElement", videoElement.children);
      var i = 0;
      for (let track of videoElement.textTracks) {
        //  console.log(track)
        track.mode = "disabled";
        // if(track.language !== targetLanguage){
        // videoElement.removeChild(videoElement.children[i]);
        // }
        i++;
      }
      const track = videoElement.addTextTrack("captions");
      track.mode = "showing";
      subtitles.forEach((sub) => {
        const cueEn = new VTTCue(sub.start, sub.end, sub.lines.join("\n"));
        track.addCue(cueEn);
      });
    }
  }, [subtitles]);

  useEffect(() => {
    if (isPlaying) player.current.play();
    else player.current.pause();
  }, [isPlaying]);

  useEffect(() => {
    if (seekingTime !== 0) player.current.seek(seekingTime);
  }, [seekingTime]);

  useEffect(() => {
    player.current.playbackRate = playbackSpeed;
  }, [playbackSpeed]);

  return (
    <Container>
      <Player ref={player} playsInline src={videoUrl}>
        <ControlBar></ControlBar>
      </Player>
    </Container>
  );
}

export default VideoPlayer;
