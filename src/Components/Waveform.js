import React, { useRef, useEffect, useState, useCallback } from "react";
import {modifySingleCaption} from "../_Redux/Actions"
import { useSelector, useDispatch } from "react-redux";

import styled from "styled-components";

import { Spinner } from "@blueprintjs/core";
import Peaks from "peaks.js";

const Container = styled.div`
  height: 290px;
  width: 100%;
  .bp3-spinner {
    position: absolute;
    transform: translate(50vw, 50%);
  }
  .zoomview-container {
    box-shadow: 3px 3px 20px #919191;
    -moz-box-shadow: 3px 3px 20px #919191;
    -webkit-box-shadow: 3px 3px 20px #919191;
    margin: 5px 0;
    line-height: 0;
  }

  .overview-container {
    box-shadow: 3px 3px 20px #919191;
    -moz-box-shadow: 3px 3px 20px #919191;
    -webkit-box-shadow: 3px 3px 20px #919191;
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
  .loading-text{
    text-align:center;
  }
`;

function Waveform({}) {
  const dispatch = useDispatch();
  const [peaksReady, setPeaksReady] = useState(false);
  const [regions, setRegions] = useState([]);
  // const isPlaying = useSelector((state) => state.media.isPlaying);
  const audio = useSelector((state) => state.data.audioUrl);
  const video = useSelector((state) => state.data.videoUrl);
  // const seekingTime = useSelector((state) => state.media.seekingTime);
  // const barHeight = useSelector((state) => state.media.barHeight);
  // const waveformWidth = useSelector((state) => state.media.waveformWidth);
  const subtitles = useSelector((state) => state.data.subtitles);
  const subtitlesRef = useRef()

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

  useEffect(
    function incomingSubtitlesChanges() {
      if(peaks.current){
        let allSegments = peaks.current.segments.getSegments()
        console.log("allSegments",allSegments)
        subtitles.forEach((sub,i)=>{
          if(sub.start !== allSegments[i].startTime) allSegments[i].update({startTime:sub.start})
          else if(sub.end !== allSegments[i].endTime) allSegments[i].update({endTime:sub.end})
          else if(sub.lines.join("\n") !== allSegments[i].labelText) allSegments[i].update({labelText:sub.lines.join("\n")})
        })
        subtitlesRef.current = subtitles
      }
    },
    [subtitles]
  );

  const segmentsDragEnd=(seg)=>{
    let newSubtitle = subtitlesRef.current[seg.id]
    newSubtitle.start = Number(seg.startTime.toFixed(3))
    newSubtitle.end = Number(seg.endTime.toFixed(3))

    dispatch(modifySingleCaption(newSubtitle,seg.id))
  }

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

    audioElementRef.current.src = audio;

    Peaks.init(options, (err, initalizedPeaks) => {
      if (err) console.error("err", err);
      peaks.current = initalizedPeaks;

      initalizedPeaks.segments.add(subtitles.map((sub,index)=>{return {startTime:sub.start,endTime:sub.end,labelText:sub.lines.join("\n"),editable:true,id:index}}))
      
      audioElementRef.current.src = video;
      initalizedPeaks.on("segments.dragend",segmentsDragEnd)
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
          <div className="loading-text">Génération des ondes, cette opération peut prendre quelque temps</div>
        </SpinnerContainer>
      )}
      <div className="zoomview-container" ref={zoomviewWaveformRef}></div>
      <div className="overview-container" ref={overviewWaveformRef}></div>
    </Container>
  );
}

export default Waveform;
