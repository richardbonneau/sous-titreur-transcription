import React, { useRef, useState, useEffect, useCallback } from "react";

import styled from "styled-components";
import VideoPlayer from "../Components/VideoPlayer";

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 90%;
  height: 100%;
  flex: 1;
    width: 100%;
  /* @media (min-width: 1040px) {
    flex: 1;
    width: 100%;
  } */
`;

function VideoSection() {
  return (
    <Container>
      <VideoPlayer />
    </Container>
  );
}

export default VideoSection;
