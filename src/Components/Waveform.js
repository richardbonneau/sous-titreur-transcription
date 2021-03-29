import React, { useRef, useEffect, useState,  } from "react";
import WaveSurfer from "wavesurfer.js";
function Waveform({videoURL,seek}) {
    const waveformRef = useRef();
    const [seekTime,setSeekTime] = useState(0)
    

    useEffect(()=>{
        if(waveformRef.current){
            const wavesurfer = WaveSurfer.create({
                container: waveformRef.current,
                  waveColor: 'red',
                    progressColor: 'blue',
            })
            wavesurfer.load(videoURL)
            wavesurfer.on('seek', function (time) {
                seek(time)
            });
        }
    },[]);
  return (
    <>
        <div ref={waveformRef}>

        </div>
    </>
  );
}

export default Waveform;
