import React, { useRef, useEffect, useState, useCallback } from "react";

import { useSelector, useDispatch } from "react-redux";

import styled from "styled-components";

import { Spinner } from "@blueprintjs/core";
import Peaks from "peaks.js";

const Container = styled.div`
  height: 310px;
  width: 100%;
  .bp3-spinner {
    position: absolute;
    transform: translate(50vw, 50%);
  }
  .zoomview-container {
    box-shadow: 3px 3px 20px #919191;
    -moz-box-shadow: 3px 3px 20px #919191;
    -webkit-box-shadow: 3px 3px 20px #919191;
    margin: 24px 0 24px 0;
    line-height: 0;
  }

  .overview-container {
    box-shadow: 3px 3px 20px #919191;
    -moz-box-shadow: 3px 3px 20px #919191;
    -webkit-box-shadow: 3px 3px 20px #919191;
    margin: 0 0 24px 0;
    line-height: 0;
    height: 85px;
  }
`;

const SpinnerContainer = styled.div`
  width: 100%;
  height: 100%;
  background: #ced9e0;
  z-index: 100;
  position: fixed;
`;

function Waveform({}) {
  const dispatch = useDispatch();
  const [peaksReady, setPeaksReady] = useState(false);
  const [regions, setRegions] = useState([]);
  // const isPlaying = useSelector((state) => state.media.isPlaying);
  const audio = useSelector((state) => state.data.audioUrl);
  // const seekingTime = useSelector((state) => state.media.seekingTime);
  // const barHeight = useSelector((state) => state.media.barHeight);
  // const waveformWidth = useSelector((state) => state.media.waveformWidth);
  const subtitles = useSelector((state) => state.data.subtitles);

  const peaks = useRef();
  const zoomviewWaveformRef = useRef();
  const overviewWaveformRef = useRef();
  const audioElementRef = useRef();

  useEffect(
    function initPeaksJs() {
      if (audio) initPeaks();
    },
    [audio]
  );

  const initPeaks = () => {
    audioElementRef.current = document.querySelector(".video-react-video");
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioContext = new AudioContext();
    // console.log("audioElementRef",audioElementRef,"audioContext",audioContext,"overviewWaveformRef.current",overviewWaveformRef.current,"zoomviewWaveformRef.current",zoomviewWaveformRef.current)
    const options = {
      containers: {
        overview: overviewWaveformRef.current,
        zoomview: zoomviewWaveformRef.current,
      },
      mediaElement: audioElementRef.current,
      webAudio: {
        audioContext: audioContext,
      },
      keyboard: true,
      logger: console.error.bind(console),
    };

    // audioElementRef.current.src = audio;

    // if (peaks.current) {
    //   peaks.current.destroy();
    //   peaks.current = null;
    // }

    Peaks.init(options, (err, initalizedPeaks) => {
      if (err) console.error("err", err);
      peaks.current = initalizedPeaks;
      console.log("done", peaks, "initalizedPeaks", initalizedPeaks);
      setPeaksReady(true);
    });
  };

  // useEffect(
  //   function subtitlesToRegions() {
  //     if (wavesurferRef.current) {
  //       setRegions(
  //         subtitles.map((caption, i) => {
  //           return {
  //             start: caption.start,
  //             end: caption.end,
  //             maxStart: i > 0 ? subtitles[i - 1].end : undefined,
  //             maxEnd: i < subtitles.length - 1 ? subtitles[i + 1].start : undefined,
  //             attributes: {
  //               label: caption.lines.join("\n"),
  //             },
  //           };
  //         })
  //       );
  //     }
  //   },
  //   [subtitles]
  // );

  // useEffect(
  //   function adjustBarHeight() {
  //     if (wavesurferRef.current) {
  //       let time = wavesurferRef.current.getCurrentTime();
  //       wavesurferRef.current.params.barHeight = barHeight;
  //       wavesurferRef.current.empty();
  //       wavesurferRef.current.drawBuffer();
  //       dispatch(seeking(time));
  //     }
  //   },
  //   [barHeight]
  // );

  // useEffect(
  //   function adjustBarWidth() {
  //     if (wavesurferRef.current) {
  //       let time = wavesurferRef.current.getCurrentTime();
  //       wavesurferRef.current.params.minPxPerSec = waveformWidth;
  //       wavesurferRef.current.empty();
  //       wavesurferRef.current.drawBuffer();
  //       dispatch(seeking(time));
  //     }
  //   },
  //   [waveformWidth]
  // );

  return (
    <Container>
      {!peaksReady && (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      )}
      <div className="zoomview-container" ref={zoomviewWaveformRef}></div>
      <div className="overview-container" ref={overviewWaveformRef}></div>
    </Container>
  );
}

export default Waveform;
