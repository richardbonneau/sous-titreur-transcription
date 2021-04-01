import React, { useRef, useEffect, useState, useCallback } from "react";
// import WaveSurfer from "wavesurfer.js"
import { useSelector, useDispatch } from "react-redux";
import { WaveSurfer, WaveForm } from "wavesurfer-react";
import styled from "styled-components";
import { Spinner } from "@blueprintjs/core";

const Container = styled.div`
  height: 100px;
  width: 100%;
`;

function Waveform({ videoURL, seek, videoRef }) {
  const [waveformReady, setWaveformReady] = useState(false);

  const audio = useSelector((state) => state.data.audioUrl);
  const wavesurferRef = useRef();

  const handleWSMount = useCallback(
    (waveSurfer) => {
      wavesurferRef.current = waveSurfer;
      console.log("wavesurferRef.current", wavesurferRef.current);
      if (wavesurferRef.current) {
        console.log("audio", audio);

        wavesurferRef.current.load(audio);

        wavesurferRef.current.on("ready", () => {
          console.log("WaveSurfer is ready");
          setWaveformReady(true);
        });

        wavesurferRef.current.on("loading", (data) => {
          console.log("loading --> ", data);
        });

        if (window) {
          window.surferidze = wavesurferRef.current;
        }
      }
    },
    [audio]
  );

  return (
    <Container>
      {audio && (
        <WaveSurfer onMount={handleWSMount}>
          {!waveformReady && <Spinner />}
          <WaveForm id="waveform"></WaveForm>
        </WaveSurfer>
      )}
    </Container>
  );
}

export default Waveform;
