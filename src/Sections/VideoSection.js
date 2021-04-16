import React, { useState } from "react";

import styled from "styled-components";
import VideoPlayer from "../Components/VideoPlayer";
import { Label, Slider, Dialog, Button } from "@blueprintjs/core";
import { useSelector, useDispatch } from "react-redux";
import { selectSub, verticalZoom, horizontalZoom } from "../_Redux/Actions";

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
  .bp3-label {
    margin: 25px;
  }
`;

const Shortcut = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1em;
  div {
    max-width: 200px;
  }
`;

function VideoSection() {
  const dispatch = useDispatch();
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [verticalZoomSlider, setVerticalZoomSlider] = useState(1);
  const [horizontalZoomSlider, setHorizontalZoomSlider] = useState(0);
  const [shortcutListOpened, setShortcutListOpened] = useState(false);
  const [search, setSearch] = useState("");
  const subtitles = useSelector((state) => state.data.subtitles);

  const startSearch = () => {
    let foundIndex;
    subtitles.forEach((sub, i) => {
      if (!foundIndex && sub.lines.join("\n").toLowerCase().search(search.toLowerCase()) !== -1)
        foundIndex = i;
    });

    dispatch(selectSub(foundIndex));
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

        <Label>
          Zoom Vertical
          <Slider
            min={1}
            max={5}
            labelStepSize={1}
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
            labelStepSize={1}
            stepSize={1}
            onRelease={(newValue) => dispatch(horizontalZoom(newValue))}
            onChange={(newValue) => setHorizontalZoomSlider(newValue)}
            value={horizontalZoomSlider}
          />
        </Label>
      </VideoController>

      <Button onClick={() => setShortcutListOpened(true)}>Liste de raccourcis</Button>

      <Dialog
        icon="info-sign"
        onClose={() => setShortcutListOpened(false)}
        title="Liste de raccourcis"
        isOpen={shortcutListOpened}
      >
        <Shortcut>
          <div>Jouer/Pauser la vidéo</div>
          <div>Espace</div>
        </Shortcut>
        <Shortcut>
          <div>Bouger la chronologie globale de gauche à droite</div>
          <div>Flèches gauche et droite</div>
        </Shortcut>
      </Dialog>
    </Container>
  );
}

export default VideoSection;
