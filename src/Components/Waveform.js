import React, { useRef, useEffect, useState, useCallback } from "react";
// import WaveSurfer from "wavesurfer.js"
import { WaveSurfer, WaveForm } from "wavesurfer-react";
import styled from "styled-components";

const Container = styled.div`

  height: 100px;
  width: 100%;
  background-color: green;

`;

function Waveform({ videoURL, seek, videoRef }) {
  //  const wavesurferRef = useRef();

  //   const handleWSMount = useCallback(

  //     waveSurfer => {
  //       wavesurferRef.current = waveSurfer;
  //       console.log("wavesurferRef.current",wavesurferRef.current)
  //       if (wavesurferRef.current) {
  //         console.log("videoURL",videoURL)

  //         wavesurferRef.current.load(videoURL);

  //         wavesurferRef.current.on("ready", () => {
  //           console.log("WaveSurfer is ready");
  //         });

  //         wavesurferRef.current.on("loading", data => {
  //           console.log("loading --> ", data);
  //         });

  //         if (window) {
  //           window.surferidze = wavesurferRef.current;
  //         }
  //       }
  //     },
  //     []
  //   );

  return (
    <Container>
      {/* <WaveSurfer onMount={handleWSMount}>
      <WaveForm 
      id="waveform"
      xhr = {{ mode: 'no-cors'}}
      backend='MediaElement'
      >
   
        </WaveForm>
        </WaveSurfer>
     */}
    </Container>
  );

  //   const waveformRef = useRef();
  //   const [seekTime, setSeekTime] = useState(0);

  //   useEffect(() => {
  //     console.log("videoRef.current", videoRef);
  //     if (waveformRef.current) {
  //       const wavesurfer = WaveSurfer.create({
  //         container: waveformRef.current,
  //         waveColor: "red",
  //         progressColor: "blue",
  //         backend: "MediaElement",
  //         xhr: {
  //           cache: "default",
  //           mode: "cors",
  //           method: "GET",
  //           credentials: "include",
  //           headers: [
  //             { key: "cache-control", value: "no-cache" },
  //             { key: "pragma", value: "no-cache" }
  //           ]
  //         }
  //       });
  //       // console.log("videoRef",videoRef.getChildren)
  //       wavesurfer.load(videoURL);
  //       wavesurfer.on("seek", function (time) {
  //         seek(time);
  //       });
  //       wavesurfer.on("ready", function (time) {
  //         console.log("miaow")
  //       });
  //     }
  //   }, []);

  // return (
  //   <>
  //     <div ref={waveformRef} />
  //   </>
  // );
}

export default Waveform;
