import { PLAY_PAUSE, SEEKING, VERTICAL_ZOOM, HORIZONTAL_ZOOM,IS_SEEKING ,CURRENTLY_SELECTED} from "../Actions";

export default (
  state = {
    isPlaying: false,
    isSeeking: false,
    seekingTime: 0,
    barHeight: 1,
    waveformWidth: 0,
    currentlySelected:null
  },
  action
) => {

  switch (action.type) {
    case PLAY_PAUSE:
      console.log(action)
      return {
        ...state,
        isPlaying: action.isPlaying,
      };
    case IS_SEEKING:
      console.log("IS_SEEKING")
      return{
        ...state,
        isSeeking:action.videoIsSeeking,
        // isPlaying: !action.videoIsSeeking 
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
      case CURRENTLY_SELECTED:
        return {
          ...state,
          currentlySelected: action.subIndex,
        };
    default:
      return state;
  }
};
