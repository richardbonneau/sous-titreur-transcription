export const PLAY_PAUSE = "PLAY_PAUSE";
export const SEEKING = "SEEKING";
export const VERTICAL_ZOOM = "VERTICAL_ZOOM";
export const HORIZONTAL_ZOOM = "HORIZONTAL_ZOOM";
export const IS_SEEKING = "IS_SEEKING";



export const seeking = (seekingTime) => {
  return {
    type: SEEKING,
    seekingTime,
  };
};
export const verticalZoom = (newZoom) => {
  return {
    type: VERTICAL_ZOOM,
    newZoom,
  };
};
export const horizontalZoom = (newZoom) => {
  return {
    type: HORIZONTAL_ZOOM,
    newZoom,
  };
};




