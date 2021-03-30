import React, { useRef, useState, useEffect, useCallback } from "react";
import logo from "./logo.svg";
import "./App.css";
import styled from "styled-components";
import VideoPlayer from "./Components/VideoPlayer";
import SubtitlesEditor from "./Sections/SubtitlesEditor";
import Timeline from "./Sections/Timeline";
import Titlebar from "./Components/Titlebar";
import VideoSection from "./Sections/VideoSection";

const Container = styled.div`
  /* padding:1em; */
  /* display: flex;
    flex-direction: column; */
  @media (min-width: 1040px) {
  }
`;
const TopSections = styled.div`
  display: flex;
  /* flex-direction:column-reverse; */
  height: calc(100vh - 168px);
  /* background:red; */
  align-items: center;
  flex-direction: row;

  align-items: flex-start;
  /* @media (min-width: 1040px) {
    flex-direction:row;
    background:yellow;
    align-items:flex-start;
  } */
`;

function App() {
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
        console.log("body", body);
        // setVideoPath(body.data.videolink);
      });
  }, []);

  return (
    <Container>
      <Titlebar />
      <TopSections>
        {" "}
        <SubtitlesEditor />
        <VideoSection />
      </TopSections>

      <Timeline />
    </Container>
  );
}

export default App;
