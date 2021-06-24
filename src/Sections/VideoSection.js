import React, { useState,useEffect } from "react";
import { ActionCreators } from 'redux-undo';
import styled from "styled-components";
import VideoPlayer from "../Components/VideoPlayer";
import { Label, Slider, Dialog, Button } from "@blueprintjs/core";
import { useSelector, useDispatch } from "react-redux";
import { selectSub, verticalZoom, horizontalZoom } from "../_Redux/Actions";
import { useHotkeys } from "react-hotkeys-hook";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  flex: 1;
  overflow-y: scroll;
`;
const VideoController = styled.div`
  display: flex;
  width: 100%;
  padding: 1em 0;
  flex-wrap: wrap;
  justify-content: center;

  input{
    margin-top: 6px;
  }

  .bp3-label{
    margin-left: 10px;
    margin-right: 10px;
  }
  .undo-redo {
    display:flex;
    flex-direction:column;
    button{
      margin-top: 5px;
    }
  }
  .searchbox { 
    max-width: 120px;
  }
`;
const Controls = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const Shortcuts = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 1em;
  justify-content: center;

  .bp3-slider {
    max-width: 90px;
    min-width:0;
  }
  .shortcut-container {
    padding: 0 15px;
  }
  .shortcut-label {
    font-size: 10px;
    border-bottom: 1px solid black;
    text-align: center;
    margin-left: 10px;
    margin-right: 10px;
  }
  .shortcut-key {
    margin-bottom: 1em;
    text-align: center;
  }
`;

function VideoSection() {
  const dispatch = useDispatch();
  const [OS,setOS] = useState("Win");
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [verticalZoomSlider, setVerticalZoomSlider] = useState(0);
  const [horizontalZoomSlider, setHorizontalZoomSlider] = useState(0);
  const [shortcutListOpened, setShortcutListOpened] = useState(false);
  const [search, setSearch] = useState("");
  const [lastSearchedIndex, setLastSearchedIndex] = useState(-1);
  const subtitles = useSelector((state) => state.data.present.subtitles);

  useEffect(()=>{
    dispatch(ActionCreators.clearHistory());
    if(window.navigator.appVersion.indexOf('Mac') !== -1) setOS("Mac");
  },[]);

  const startSearch = () => {
    let foundIndex;
    subtitles.forEach((sub, i) => {
      if (
        !foundIndex &&
        i > lastSearchedIndex &&
        sub.lines.join("\n").toLowerCase().search(search.toLowerCase()) !== -1
      ) {
        foundIndex = i;
        setLastSearchedIndex(i);
      }
    });
    if (!foundIndex) setLastSearchedIndex(-1);
    dispatch(selectSub(foundIndex));
  };


useHotkeys("ctrl+z", (e) => {
  e.preventDefault();
  dispatch(ActionCreators.undo())
});
useHotkeys("ctrl+shift+z", (e) => {
  e.preventDefault();
  dispatch(ActionCreators.redo())
});

useHotkeys("cmd+z", (e) => {
  e.preventDefault();
  dispatch(ActionCreators.undo())
});
useHotkeys("cmd+shift+z", (e) => {
  e.preventDefault();
  dispatch(ActionCreators.redo())
});

  return (
    <Container>
      <VideoPlayer playbackSpeed={playbackSpeed} />
      <Controls>
        <VideoController>
          <Label className="undo-redo">Défaire<Button icon="undo" onClick={()=>{
            dispatch(ActionCreators.undo())
          }} /></Label>
          <Label className="undo-redo">Refaire<Button icon="redo" onClick={()=>dispatch(ActionCreators.redo())} /></Label>
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
              className="searchbox"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setLastSearchedIndex(-1);
                }}
                onKeyUp={(e) => (e.key === "Enter" ? startSearch() : null)}
              />
            </Label>
          </div>

          <Label>
            Zoom Vertical
            <Slider
              min={0}
              max={4}
              labelValues={[]}
              stepSize={1}
              onRelease={(newValue) => dispatch(verticalZoom(newValue + 1))}
              onChange={(newValue) => setVerticalZoomSlider(newValue)}
              value={verticalZoomSlider}
            />
          </Label>
          <Label>
            Zoom Horizontal
            <Slider
              min={0}
              max={4}
              labelValues={[]}
              stepSize={1}
              onRelease={(newValue) => dispatch(horizontalZoom(newValue))}
              onChange={(newValue) => setHorizontalZoomSlider(newValue)}
              value={horizontalZoomSlider}
            />
          </Label>
        </VideoController>
        <Shortcuts>
          <div className="shortcut-container">
            {" "}
            <div className="shortcut-label">Jouer/Pause</div>
            <div className="shortcut-key">{OS==="Win"?"CTRL+Espace":"CMD+Espace"}</div>
          </div>

          <div className="shortcut-container">
            <div className="shortcut-label">Bouger la chronologie</div>
            <div className="shortcut-key">← →</div>
          </div>

          <div className="shortcut-container">
            <div className="shortcut-label">Défaire</div>
            <div className="shortcut-key">{OS==="Win"?"CTRL+Z":"CMD+Z"}</div>
          </div>

          <div className="shortcut-container">
            <div className="shortcut-label">Refaire</div>
            <div className="shortcut-key">{OS==="Win"?"CTRL+SHIFT+Z":"CMD+SHIFT+Z"}</div>
          </div>

          <div className="shortcut-container">
            <div className="shortcut-label">Nouveau Sous-titre</div>
            <div className="shortcut-key">Enter</div>
          </div>

          <div className="shortcut-container">
            <div className="shortcut-label">Retour de ligne</div>
            <div className="shortcut-key">SHIFT+Enter</div>
          </div>
        </Shortcuts>
      </Controls>
    </Container>
  );
}

export default VideoSection;
