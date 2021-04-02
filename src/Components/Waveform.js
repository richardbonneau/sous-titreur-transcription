import React, { useRef, useEffect, useState, useCallback } from "react";
import CursorPlugin from "wavesurfer.js/dist/plugin/wavesurfer.cursor.min";
import TimelinePlugin from "wavesurfer.js/dist/plugin/wavesurfer.timeline.min";
import RegionsPlugin from "wavesurfer.js/dist/plugin/wavesurfer.regions.min";

import { useSelector, useDispatch } from "react-redux";
import { WaveSurfer, WaveForm, Region } from "wavesurfer-react";
import styled from "styled-components";
import { seeking } from "../_Redux/Actions";
import { Spinner } from "@blueprintjs/core";

const Container = styled.div`
  height: 100px;
  width: 100%;
  .bp3-spinner {
    position: absolute;
    transform: translate(50vw, 50%);
  }
  #waveform {
    position: fixed;
    bottom: 0;
    width: 100%;
    /* height: 80px; */
    background: #ced9e0;
  }
  #timeline{

    bottom: 18px;
    position: absolute;
    width: 100%;
  }
  region.wavesurfer-region:before {
    content: attr(data-region-label);
    position: absolute;
    top: 0;
    overflow: hidden;
    height: 20px;
    padding: 0 10px;
    word-break: break-word;
}
}
`;

function Waveform({}) {
  const dispatch = useDispatch();
  const [waveformReady, setWaveformReady] = useState(false);
  const [regions, setRegions] = useState([]);
  const isPlaying = useSelector((state) => state.media.isPlaying);
  const audio = useSelector((state) => state.data.audioUrl);
  const seekingTime = useSelector((state) => state.media.seekingTime);
  const barHeight = useSelector((state) => state.media.barHeight);
  const waveformWidth = useSelector((state) => state.media.waveformWidth);
  const subtitles = useSelector((state) => state.data.subtitles);
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
    function subtitlesToRegions() {
      if (wavesurferRef.current) {
        setRegions(
          subtitles.map((caption) => {
            console.log("caption", caption);
            return {
              start: caption.start,
              end: caption.end,

              attributes: {
                label: caption.lines.join("\n"),
              },
            };
          })
        );
      }
    },
    [subtitles]
  );

  useEffect(
    function playPause() {
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
        let time = wavesurferRef.current.getCurrentTime();
        wavesurferRef.current.params.barHeight = barHeight;
        wavesurferRef.current.empty();
        wavesurferRef.current.drawBuffer();
        dispatch(seeking(time));
      }
    },
    [barHeight]
  );
  useEffect(
    function adjustBarWidth() {
      if (wavesurferRef.current) {
        let time = wavesurferRef.current.getCurrentTime();
        wavesurferRef.current.params.minPxPerSec = waveformWidth;
        wavesurferRef.current.empty();
        wavesurferRef.current.drawBuffer();
        dispatch(seeking(time));
      }
    },
    [waveformWidth]
  );

  const plugins = [
    {
      plugin: CursorPlugin,
    },
    {
      plugin: TimelinePlugin,
      options: {
        container: "#timeline",
      },
    },
    {
      plugin: RegionsPlugin,
      options: { dragSelection: true },
    },
  ];

  return (
    <Container>
      {audio && (
        <WaveSurfer plugins={plugins} onMount={handleWSMount}>
          {!waveformReady && <Spinner />}
          <WaveForm
            id="waveform"
            waveColor="#1E242C"
            progressColor="#028090"
            autoCenter={true}
            scrollParent={true}
            height={110}
            minPxPerSec={1}
          ></WaveForm>
          <div id="timeline" />
          {regions.map((regionProps) => (
            <Region key={regionProps.id} {...regionProps} />
          ))}
        </WaveSurfer>
      )}
    </Container>
  );
}

export default Waveform;
