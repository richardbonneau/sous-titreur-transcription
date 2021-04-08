import {
  PLAY_PAUSE,
  SEEKING,
  VERTICAL_ZOOM,
  HORIZONTAL_ZOOM,
  IS_SEEKING,
  CURRENTLY_SELECTED,
} from "../Actions";

export default (
  state = {
    isPlaying: false,
    isSeeking: false,
    seekingTime: 0,
    barHeight: 1,
    verticalZoom: 0,
    currentlySelected: null,
  },
  action
) => {
  switch (action.type) {
    case PLAY_PAUSE:
      return {
        ...state,
        isPlaying: action.isPlaying,
      };
    case IS_SEEKING:
      return {
        ...state,
        isSeeking: action.videoIsSeeking,
        // isPlaying: !action.videoIsSeeking
      };
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
    case CURRENTLY_SELECTED:
      return {
        ...state,
        currentlySelected: action.subIndex,
      };
    default:
      return state;
  }
};
