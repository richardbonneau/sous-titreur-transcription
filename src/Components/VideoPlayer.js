import React, { useRef, useState, useEffect } from "react";
import { Player, ControlBar } from "video-react";
import Waveform from "./Waveform";
import { Spinner } from "@blueprintjs/core";
import styled from "styled-components"

const Container = styled.div`
  width:50%;
`

function VideoPlayer() {
  const player = useRef();
  const [videoPath, setVideoPath] = useState(null);

  useEffect(()=>{
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
          <Waveform videoURL={videoPath} seek={seek} />
        </>
      )}
    </Container>
  );
}

export default VideoPlayer;
