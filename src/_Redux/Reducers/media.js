import { PLAY_PAUSE, SEEKING, VERTICAL_ZOOM, HORIZONTAL_ZOOM, CURRENT_TIME } from "../Actions";

export default (
  state = {
    seekingTime: 0,
    horizontalZoom: 0,
    verticalZoom: 0,
    currentTime: 0,
  },
  action
) => {
  switch (action.type) {
    case SEEKING:
      return {
        ...state,
        seekingTime: action.seekingTime,
      };
    case VERTICAL_ZOOM:
      return {
        ...state,
        verticalZoom: action.newZoom,
      };
    case HORIZONTAL_ZOOM:
      return {
        ...state,
        horizontalZoom: action.newZoom,
      };


    default:
      return state;
  }
};
