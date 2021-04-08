import React, { useRef, useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { requestData, receiveData } from "./_Redux/Actions/data";
import "./App.css";
import styled from "styled-components";
import SubtitlesEditor from "./Sections/SubtitlesEditor";
import Timeline from "./Sections/Timeline";
import Titlebar from "./Components/Titlebar";
import VideoSection from "./Sections/VideoSection";

const Container = styled.div`
  @media (min-width: 1040px) {
  }
`;
const TopSections = styled.div`
  display: flex;

  height: calc(100vh - 352px);

  align-items: center;
  flex-direction: row;

  align-items: flex-start;
`;

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    // setVideoPath("https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4")
    dispatch(requestData());
    fetch("https://api.soustitreur.com/customer/get-srt", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "post",

      //Court
      // body: JSON.stringify({ ident: "604a7d13cb7cd089704016_5494" }),
      //Long
      // body: JSON.stringify({ ident: "60634330c1fe9826860056_6185" }),
      // waveform
      body: JSON.stringify({ ident: "606def0995049815127141_6607" }),
    })
      .then((res) => res.json())
      .then((body) => {
        dispatch(receiveData(body.data));
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
