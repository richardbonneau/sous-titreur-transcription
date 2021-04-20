import React, { useEffect } from "react";
import {  useDispatch } from "react-redux";
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

  height: calc(100vh - 303px);

  align-items: center;
  flex-direction: row;

  align-items: flex-start;
`;

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(requestData());
    fetch("https://api.soustitreur.com/customer/get-srt", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "post",


      // court
      // body: JSON.stringify({ ident: "606def0995049815127141_6607" }),
      // long
      body: JSON.stringify({ ident: "606ca3a09e5c2079835619_6551" }),
      
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
