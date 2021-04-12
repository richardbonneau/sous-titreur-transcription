import { PLAY_PAUSE, SEEKING, VERTICAL_ZOOM, HORIZONTAL_ZOOM, IS_SEEKING } from "../Actions";

export default (
  state = {
    isPlaying: false,
    isSeeking: false,
    seekingTime: 0,
    horizontalZoom: 0,
    verticalZoom: 0,
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

    default:
      return state;
  }
};
