export const PLAY_PAUSE = "PLAY_PAUSE";
export const SEEKING = "SEEKING";
export const VERTICAL_ZOOM = "VERTICAL_ZOOM";
export const HORIZONTAL_ZOOM = "HORIZONTAL_ZOOM";
export const IS_SEEKING = "IS_SEEKING";
export const CURRENTLY_SELECTED = "CURRENTLY_SELECTED";



export const isVideoPlaying = (isPlaying) => {
  console.log("in action is playing",isPlaying)
  return {
    type: PLAY_PAUSE,
    isPlaying,
  };
};
export const seeking = (seekingTime) => {
  return {
    type: SEEKING,
    seekingTime,
  };
};
export const verticalZoom = (barHeight) => {
  console.log("barHeight", barHeight);
  return {
    type: VERTICAL_ZOOM,
    barHeight,
  };
};
export const horizontalZoom = (waveformWidth) => {
  return {
    type: HORIZONTAL_ZOOM,
    waveformWidth,
  };
};

export const videoIsSeeking = (videoIsSeeking) => {
  return {
    type: IS_SEEKING,
    videoIsSeeking,
  };
};

export const selectSub = (subIndex) => {
  return {
    type: CURRENTLY_SELECTED,
    subIndex,
  };
};
