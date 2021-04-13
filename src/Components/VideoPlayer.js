import React, { useRef, useState, useEffect } from "react";
import { Player, ControlBar } from "video-react";
import { useSelector, useDispatch } from "react-redux";
import { isVideoPlaying, seeking, videoIsSeeking } from "../_Redux/Actions";

import styled from "styled-components";

const Container = styled.div`
  max-width: 600px;
  padding: 0 1em;

  width: 100%;
  @media (min-width: 1040px) {
  }
`;

function VideoPlayer({playbackSpeed}) {
  const player = useRef();

  const videoUrl = useSelector((state) => state.data.videoUrl);
  const subtitles = useSelector((state) => state.data.subtitles);
  const seekingTime = useSelector((state) => state.media.seekingTime);

  useEffect(() => {
    if (player.current) {
      let videoElement = player.current.video.video;

      var i = 0;
      for (let track of videoElement.textTracks) {
        track.mode = "disabled";

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
    if (seekingTime !== 0) player.current.seek(seekingTime);
  }, [seekingTime]);

  useEffect(() => {
    player.current.playbackRate = playbackSpeed;
  }, [playbackSpeed]);
  return (
    <Container>
      <Player ref={player}>
        <source src={videoUrl} />
        <ControlBar></ControlBar>
      </Player>
    </Container>
  );
}

export default VideoPlayer;
