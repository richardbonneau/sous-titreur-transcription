import React, { useRef, useEffect, useState } from "react";
import WaveSurfer from "wavesurfer.js";
function Waveform({ videoURL, seek, videoRef }) {
  const waveformRef = useRef();
  const [seekTime, setSeekTime] = useState(0);

  useEffect(() => {
    console.log("videoRef.current", videoRef);
    if (waveformRef.current) {
      const wavesurfer = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "red",
        progressColor: "blue",
        backend: "MediaElement",
      });
      wavesurfer.load(videoRef);
      wavesurfer.on("seek", function (time) {
        seek(time);
      });
    }
  }, []);
  return (
    <>
      <div ref={waveformRef}></div>
    </>
  );
}

export default Waveform;
