import React, { useRef, useEffect, useState, useCallback } from "react";
// import WaveSurfer from "wavesurfer.js"
import { WaveSurfer, WaveForm } from "wavesurfer-react";
import styled from "styled-components";

const Container = styled.div`
  height: 100px;
  width: 100%;
`;

function Waveform({ videoURL, seek, videoRef }) {
  const [audio, setAudio] = useState();

  const wavesurferRef = useRef();

  const handleWSMount = useCallback(
    (waveSurfer) => {
      wavesurferRef.current = waveSurfer;
      console.log("wavesurferRef.current", wavesurferRef.current);
      if (wavesurferRef.current) {
        console.log("audio", audio);

        // const myAudio = new Audio(audio);
        // myAudio.crossOrigin = "anonymous";
        // console.log("myAudio", myAudio);

        wavesurferRef.current.load(audio);

        wavesurferRef.current.on("ready", () => {
          console.log("WaveSurfer is ready");
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

  useEffect(() => {
    // setVideoPath("https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4")
    console.log(JSON.stringify({ ident: "604a7d13cb7cd089704016_5494" }));
    fetch("https://api.soustitreur.com/customer/get-srt", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "post",
      body: JSON.stringify({ ident: "604a7d13cb7cd089704016_5494" }),
    })
      .then((res) => res.json())
      .then((body) => {
        console.log("body.data.audiofile", body.data.audiofile, body);
        setAudio(body.data.audiofile);
      });
  }, []);

  return (
    <Container>
      {audio && (
        <WaveSurfer onMount={handleWSMount}>
          <WaveForm id="waveform"></WaveForm>
        </WaveSurfer>
      )}
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
