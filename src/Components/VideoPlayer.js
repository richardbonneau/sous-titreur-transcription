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

function VideoPlayer({ playbackSpeed }) {
  const dispatch = useDispatch();
  const player = useRef();
  const [videoState, setVideoState] = useState({});
  const videoUrl = useSelector((state) => state.data.videoUrl);
  const subtitles = useSelector((state) => state.data.subtitles);
  const isPlaying = useSelector((state) => state.media.isPlaying);
  const seekingTime = useSelector((state) => state.media.seekingTime);
  const isSeeking = useSelector((state) => state.media.isSeeking);

  useEffect(() => {
    player.current.subscribeToStateChange((state) => setVideoState(state));
  }, []);

  useEffect(
    function videoStateChanges() {
      if (Object.keys(videoState).length > 0) {
        if (!videoState.paused !== isPlaying && !videoState.seeking)
          dispatch(isVideoPlaying(!videoState.paused));
        if (seekingTime !== videoState.seekingTime) dispatch(seeking(videoState.seekingTime));
        if (isSeeking !== videoState.seeking) dispatch(videoIsSeeking(videoState.seeking));
      }
    },
    [videoState]
  );

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
