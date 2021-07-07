import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { requestData, receiveData, seeking } from "./_Redux/Actions";
import "./App.css";
import styled from "styled-components";
import Transcription from "./Sections/Transcription";
import Titlebar from "./Components/Titlebar";
import VideoSection from "./Sections/VideoSection";

const Container = styled.div``;
const Content = styled.div`
  display: flex; 

`;

const Editors = styled.div`
  flex: 1;
`;

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const splittedUrl = window.location.href.split("/");
    const ident = splittedUrl[splittedUrl.length - 1];
    console.log("ident: ", ident);
    //606ca3a09e5c2079835619_6551
    dispatch(requestData());
    fetch("https://api.soustitreur.com/customer/get-srt", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "post",
      body: JSON.stringify({ ident }),
    })
      .then((res) => res.json())
      .then((body) => {
        console.log("body", body);
        dispatch(receiveData({ ...body.data, ident }));
        if (window.location.href.includes("&time=")) {
          const splittedUrl = window.location.href.split("&time=");
          const time = Number(splittedUrl[1]);
          dispatch(seeking(time));
        }
      });
  }, []);

  return (
    <Container>
      <Titlebar />
      <Content>
        <Editors>
          <Transcription />
        </Editors>
        <VideoSection />
      </Content>
    </Container>
  );
}

export default App;
