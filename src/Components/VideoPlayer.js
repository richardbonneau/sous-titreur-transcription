import React, { useRef, useState, useEffect,useCallback } from "react";
import { Player, ControlBar } from "video-react";
import Waveform from "./Waveform";
import { Spinner } from "@blueprintjs/core";
import styled from "styled-components"

const Container = styled.div`
  width:50%;
`

function VideoPlayer() {
  const [videoPlayer,setVideoPlayer] = useState()
  const [videoPath, setVideoPath] = useState(null);

  const player = useRef()

  useEffect(()=>{
    // setVideoPath("https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4")
    console.log(JSON.stringify({"ident": "604a7d13cb7cd089704016_5494"}))
    fetch("https://api.soustitreur.com/customer/get-srt",{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method:"post",
      body:JSON.stringify({"ident": "604a7d13cb7cd089704016_5494"})
    }).then(res=>res.json())
    .then(body=>{
      console.log("body",body.data.videolink)
      setVideoPath(body.data.videolink)
    })
  },[])

  const seek = (time) => {
    console.log("videoPlayer",videoPlayer)
    let playerState = player.current.getState();
    let duration = playerState.player.duration;
    player.current.seek((time*100) * duration / 100);
  };


  return (
    <Container>
 
      {!videoPath ? (
        <Spinner />
      ) : (
        <>
          <Player ref={player} playsInline src={videoPath}>
            <ControlBar autoHide={false} />
          </Player>

       <Waveform videoURL={videoPath} seek={seek} videoRef={videoPlayer}/>
        </>
      )}
    </Container>
  );
}

export default VideoPlayer;
