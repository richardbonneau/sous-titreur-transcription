import { PLAY_PAUSE, SEEKING, VERTICAL_ZOOM, HORIZONTAL_ZOOM,IS_SEEKING } from "../Actions";

export default (
  state = {
    isPlaying: false,
    isSeeking: false,
    
    seekingTime: 0,
    barHeight: 1,
    waveformWidth: 0,
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
      return{
        ...state,
        isSeeking:action.isSeeking,
        isPlaying: !action.videoIsSeeking
      }
    case SEEKING:
      return {
        ...state,
        seekingTime: action.seekingTime,
      };
    case VERTICAL_ZOOM:
      return {
        ...state,
        barHeight: action.barHeight,
      };
    case HORIZONTAL_ZOOM:
      return {
        ...state,
        waveformWidth: action.waveformWidth,
      };
    default:
      return state;
  }
};
