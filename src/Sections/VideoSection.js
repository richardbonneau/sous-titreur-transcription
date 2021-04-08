import React, { useState } from "react";

import styled from "styled-components";
import VideoPlayer from "../Components/VideoPlayer";
import {  Label, Slider } from "@blueprintjs/core";
import { useSelector, useDispatch } from "react-redux";
import { selectSub, verticalZoom } from "../_Redux/Actions";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  flex: 1;
`;
const VideoController = styled.div`
  margin-top: 2em;
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  .bp3-label{
    margin: 25px;
  }
`;

function VideoSection() {
  const dispatch = useDispatch();
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [verticalZoomSlider, setVerticalZoomSlider] = useState(1);
  const [search, setSearch] = useState("");
  const subtitles = useSelector((state) => state.data.subtitles);
 

  const startSearch = () => {
    let foundIndex;
    subtitles.forEach((sub,i) => {
      if(!foundIndex && sub.lines.join("\n").toLowerCase().search(search.toLowerCase()) !== -1) foundIndex = i
    });
    
    dispatch(selectSub(foundIndex))
  };

  return (
    <Container>
      <VideoPlayer playbackSpeed={playbackSpeed} />

      <VideoController>
        <Label>
          Vitesse
          <div class="bp3-select .modifier">
            <select onChange={(e) => setPlaybackSpeed(e.target.value)}>
              <option value={0.5}>0.5x</option>
              <option selected value={1}>
                1x
              </option>
              <option value={1.5}>1.5x</option>
            </select>
          </div>
        </Label>
        <div>
          <Label>
            Recherche
            <div />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyUp={(e) => (e.key === "Enter" ? startSearch() : null)}
            />
          </Label>
        </div>
        {/* <div> */}
        {/* <Button icon="step-backward" /> */}
        {/* <Button
            large={true}
            icon={isPlaying ? "pause" : "play"}
            onClick={() => dispatch(isVideoPlaying(!isPlaying))}
          /> */}
        {/* <Button icon="step-forward" /> */}
        {/* </div> */}
        <Label>
          Zoom Vertical
          <Slider
            min={1}
            max={6}
            labelStepSize={1}
            stepSize={1}
            onRelease={(newValue) => dispatch(verticalZoom(newValue))}
            onChange={(newValue) => setVerticalZoomSlider(newValue)}
            value={verticalZoomSlider}
          />
        </Label>
        <Label>
          Zoom Horizontal
          <Slider
            min={1}
            max={6}
            labelStepSize={1}
            stepSize={1}
            onRelease={(newValue) => dispatch(verticalZoom(newValue))}
            onChange={(newValue) => setVerticalZoomSlider(newValue)}
            value={verticalZoomSlider}
          />
        </Label>
      </VideoController>
    </Container>
  );
}

export default VideoSection;
