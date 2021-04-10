import React, { useRef, useEffect, useState } from "react";
import { modifySingleCaption, selectSub, modifyMultipleCaption } from "../_Redux/Actions";
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
  const horizontalZoom = useSelector((state) => state.media.horizontalZoom);

  const subtitles = useSelector((state) => state.data.subtitles);

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
    function incomingHorizontalZoomChange() {
      if (peaks.current) {
        peaks.current.zoom.setZoom(horizontalZoom);
      }
    },
    [horizontalZoom]
  );

  useEffect(
    function syncSegmentsWithSubtitles() {
      if (peaks.current) {
        let allSegments = peaks.current.segments.getSegments();
        console.log("allSegments", allSegments);
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
            visibleMarkers: false,
          },
        };
      })
    );
  };

  const segmentsDragEnd = (seg, isStartMarker) => {
    console.log("seg", seg);

    let neighbourIndex = isStartMarker ? seg.id - 1 : seg.id + 1;

    let neighbour = seg._peaks.segments._segmentsById[neighbourIndex];

    let modifiedSubtitles = []

    if (neighbour) {
      if (isStartMarker) {
        let neighbourIndex = seg.id - 1;
        if (seg._startTime < seg._peaks.segments._segmentsById[neighbourIndex]._endTime) {
          let newSubtitle = { ...subtitles[neighbourIndex] };
          newSubtitle.end = seg._startTime;
          modifiedSubtitles.push({newCaption:newSubtitle,index:neighbourIndex})
        }
      } else {
        let neighbourIndex = seg.id + 1;
        if (seg._endTime > seg._peaks.segments._segmentsById[neighbourIndex]._startTime) {
          let newSubtitle = { ...subtitles[neighbourIndex] };
          newSubtitle.start = seg._endTime;
          modifiedSubtitles.push({newCaption:newSubtitle,index:neighbourIndex})
        }
      }
    }

    let newSubtitle = subtitles[seg.id];
    newSubtitle.start = seg._startTime;
    newSubtitle.end = seg.endTime;

    modifiedSubtitles.push({newCaption:newSubtitle,index:seg.id})
    dispatch(modifyMultipleCaption(modifiedSubtitles));
  };

  const playheadEntersSegment = (segment) => {
    dispatch(selectSub(segment.id));
  };

  const mouseOverSegment = (segment, enter) => {
    console.log("SEGMENT TO UPDATE", segment, "visible markers", enter);
    if (segment.attributes.visibleMarkers !== enter)
      segment.update({ attributes: { visibleMarkers: enter, label: segment.attributes.label } });
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
      zoomLevels: [256, 512, 1024, 2048, 4096],
      keyboard: true,
      logger: console.error.bind(console),
      randomizeSegmentColor: false,
      zoomWaveformColor: "#6a6a6a",
      segmentColor: "#f8f8f8",
      segmentStartMarkerColor: "#00ff11",
      segmentEndMarkerColor: "#ff0000",
      emitCueEvents: true,
    };

    Peaks.init(options, (err, initalizedPeaks) => {
      if (err) console.error("err", err);
      peaks.current = initalizedPeaks;

      initalizedPeaks.options.createSegmentMarker = createSegmentMarker;

      initalizedPeaks.on("segments.enter", playheadEntersSegment);
      initalizedPeaks.on("segments.dragend", segmentsDragEnd);
      // initalizedPeaks.on("segments.mouseenter", (seg) => mouseOverSegment(seg, true));
      // initalizedPeaks.on("segments.mouseleave", (seg) => mouseOverSegment(seg, false));

      createSegmentsFromSubtitles();
      setPeaksReady(true);
      console.log("options", initalizedPeaks);
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
