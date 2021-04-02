import React, { useRef, useEffect, useState, useCallback } from "react";
// import WaveSurfer from "wavesurfer.js"
import { useSelector, useDispatch } from "react-redux";
import { WaveSurfer, WaveForm } from "wavesurfer-react";
import styled from "styled-components";

import { seeking } from "../_Redux/Actions";
import { Spinner } from "@blueprintjs/core";

const Container = styled.div`
  height: 100px;
  width: 100%;
  .bp3-spinner{
    position: absolute;
    transform: translate(50vw, 50%);
  }
`;

function Waveform({ videoURL, seek, videoRef }) {
  const dispatch = useDispatch();
  const [waveformReady, setWaveformReady] = useState(false);
  const isPlaying = useSelector((state) => state.media.isPlaying);
  const audio = useSelector((state) => state.data.audioUrl);
  const seekingTime = useSelector((state) => state.media.seekingTime);
  const barHeight = useSelector((state) => state.media.barHeight);
  const waveformWidth = useSelector((state) => state.media.waveformWidth);
  const wavesurferRef = useRef();

  const handleWSMount = useCallback(
    (waveSurfer) => {
      wavesurferRef.current = waveSurfer;
      if (wavesurferRef.current) {
        wavesurferRef.current.load(audio);

        wavesurferRef.current.on("ready", () => {
          console.log("WaveSurfer is ready");
          setWaveformReady(true);
          wavesurferRef.current.setMute(true);
        });

        wavesurferRef.current.on("loading", (data) => {
          // console.log("loading --> ", data);
        });

        wavesurferRef.current.on("seek", (time) => {
          if (time === 0) time = 0.0001;
          let duration = wavesurferRef.current.getDuration();
          dispatch(seeking((time * 100 * duration) / 100));
        });

        if (window) {
          window.surferidze = wavesurferRef.current;
        }
      }
    },
    [audio]
  );

  useEffect(
    function playPause() {
      console.log("playPause isPlaying",isPlaying)
      if (wavesurferRef.current) {
        if (isPlaying) wavesurferRef.current.play();
        else wavesurferRef.current.pause();
      }
    },
    [isPlaying]
  );

  useEffect(
    function seekTo() {
      if (wavesurferRef.current) {
        if (seekingTime !== 0) {
          wavesurferRef.current.pause();
          let duration = wavesurferRef.current.getDuration();
          wavesurferRef.current.seekTo(seekingTime / duration);
        } else if (seekingTime === 0 && isPlaying) {
          wavesurferRef.current.play();
        }
      }
    },
    [seekingTime]
  );

  useEffect(
    function adjustBarHeight() {
      if (wavesurferRef.current) {
        wavesurferRef.current.params.barHeight = barHeight
        wavesurferRef.current.empty();
        wavesurferRef.current.drawBuffer();
      }
    },
    [barHeight]
  );
  useEffect(
    function adjustBarWidth() {
      if (wavesurferRef.current) {
        wavesurferRef.current.params.minPxPerSec = waveformWidth
        wavesurferRef.current.empty();
        wavesurferRef.current.drawBuffer();
      }
    },
    [waveformWidth]
  );
  

  return (
    <Container>
      {audio && (
        <WaveSurfer onMount={handleWSMount}>
          {!waveformReady

           && <Spinner />}
          <WaveForm
            id="waveform"
            waveColor="#000"
            progressColor="#f3ca20"
            autoCenter={true}
            scrollParent={true}
            height={110}
            minPxPerSec={1}
          ></WaveForm>
        </WaveSurfer>
      )}
    </Container>
  );
}

export default Waveform;
