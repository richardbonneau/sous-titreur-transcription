import React, { useRef, useEffect, useState } from "react";
import { modifySingleCaption } from "../_Redux/Actions";
import { useSelector, useDispatch } from "react-redux";

import styled from "styled-components";

import { Spinner } from "@blueprintjs/core";
import Peaks from "peaks.js";
import { createSegmentMarker } from "../Utils/CustomSegmentMarker";

const Container = styled.div`
  height: 290px;
  width: 100%;
  .bp3-spinner {
    position: absolute;
    transform: translate(50vw, 50%);
  }
  .zoomview-container {
    box-shadow: 3px 3px 20px #919191;
    -moz-box-shadow: 3px 3px 20px #919191;
    -webkit-box-shadow: 3px 3px 20px #919191;
    margin: 5px 0;
    line-height: 0;
  }

  .overview-container {
    box-shadow: 3px 3px 20px #919191;
    -moz-box-shadow: 3px 3px 20px #919191;
    -webkit-box-shadow: 3px 3px 20px #919191;
    line-height: 0;
    height: 85px;
  }
`;

const SpinnerContainer = styled.div`
  width: 100%;
  height: 100%;
  background: #ced9e0;
  z-index: 100;
  position: fixed;
`;

function Waveform({}) {
  const dispatch = useDispatch();
  const [peaksReady, setPeaksReady] = useState(false);

  const audio = useSelector((state) => state.data.audioUrl);
  const video = useSelector((state) => state.data.videoUrl);
  const peaksUrl = useSelector((state) => state.data.peaksUrl);
  const verticalZoom = useSelector((state) => state.media.verticalZoom);
  const subtitles = useSelector((state) => state.data.subtitles);
  const subtitlesRef = useRef();

  const peaks = useRef();
  const zoomviewWaveformRef = useRef();
  const overviewWaveformRef = useRef();
  const audioElementRef = useRef();

  useEffect(
    function initPeaksJs() {
      if (peaksUrl) initPeaks();
    },
    [peaksUrl]
  );
  useEffect(
    function incomingVerticalZoomChange() {
      if (peaks.current) {
        const zoomView = peaks.current.views.getView("zoomview");

        zoomView.setAmplitudeScale(verticalZoom);
      }
    },
    [verticalZoom]
  );

  useEffect(
    function incomingSubtitlesChanges() {
      if (peaks.current) {
        let allSegments = peaks.current.segments.getSegments();

        if (allSegments.length !== subtitles.length) {
          createSegmentsFromSubtitles();
        } else {
          subtitles.forEach((sub, i) => {
            if (sub.start !== allSegments[i].startTime)
              allSegments[i].update({ startTime: sub.start });
            else if (sub.end !== allSegments[i].endTime)
              allSegments[i].update({ endTime: sub.end });
            else if (sub.lines.join("\n") !== allSegments[i].attributes.label) {
              allSegments[i].update({ attributes: { label: sub.lines.join("\n") } });
            }
          });
        }
        subtitlesRef.current = subtitles;
      }
    },
    [subtitles]
  );
  const createSegmentsFromSubtitles = () => {
    peaks.current.segments.removeAll();
    peaks.current.segments.add(
      subtitles.map((sub, index) => {
        return {
          startTime: sub.start,
          endTime: sub.end,

          editable: true,
          id: index,
          attributes: {
            label: sub.lines.join("\n"),
          },
        };
      })
    );
  };

  const segmentsDragEnd = (seg) => {
    let newSubtitle = subtitlesRef.current[seg.id];

    newSubtitle.start = seg.startTime;
    newSubtitle.end = seg.endTime;

    dispatch(modifySingleCaption(newSubtitle, seg.id));
  };

  const initPeaks = () => {
    audioElementRef.current = document.querySelector(".video-react-video");

    const options = {
      containers: {
        overview: overviewWaveformRef.current,
        zoomview: zoomviewWaveformRef.current,
      },
      mediaElement: audioElementRef.current,
      dataUri: {
        arraybuffer: peaksUrl,
      },
      keyboard: true,
      logger: console.error.bind(console),
      randomizeSegmentColor: false,
      zoomWaveformColor: "#6a6a6a",
      segmentColor: "#f8f8f8",
      segmentStartMarkerColor: "#00ff11",
      segmentEndMarkerColor: "#ff0000",
    };

    audioElementRef.current.src = audio;

    Peaks.init(options, (err, initalizedPeaks) => {
      if (err) console.error("err", err);

      peaks.current = initalizedPeaks;
      subtitlesRef.current = subtitles;
      audioElementRef.current.src = video;
      initalizedPeaks.options.createSegmentMarker = createSegmentMarker;

      createSegmentsFromSubtitles();

      initalizedPeaks.on("segments.dragend", segmentsDragEnd);
      setPeaksReady(true);
    });
  };

  return (
    <Container>
      {!peaksReady && (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      )}
      <div className="zoomview-container" ref={zoomviewWaveformRef}></div>
      <div className="overview-container" ref={overviewWaveformRef}></div>
    </Container>
  );
}

export default Waveform;
