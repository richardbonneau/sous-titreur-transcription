import { PLAY_PAUSE,SEEKING } from "../Actions";

export default (
  state = {
    isPlaying: false,
    seekingTime:0
  },
  action
) => {

  switch (action.type) {
  
    case PLAY_PAUSE:
      return {
        ...state,
        isPlaying: action.isPlaying,
      };
      case SEEKING:
        return{
          ...state,
          seekingTime:action.seekingTime
        }

    default:
      return state;
  }
};

