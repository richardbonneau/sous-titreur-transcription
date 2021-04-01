import { DATA_REQUEST, DATA_SUCCESS, DATA_FAILURE, MODIFY_SINGLE_SUBTITLE } from "../Actions";

export default (
  state = {
    isFetching: false,
    audioUrl: null,
    videoUrl: null,
    subtitles: [],
    vttFile:null
  },
  action
) => {
  switch (action.type) {
    case DATA_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case DATA_SUCCESS:
      return {
        ...state,
        isFetching: false,
        audioUrl: action.data.audiofile,
        videoUrl: action.data.videolink,
        subtitles: action.data.subtitles,
      };
    case MODIFY_SINGLE_SUBTITLE:
      let newSubtitles = [...state.subtitles]
      newSubtitles[action.subIndex] = {...newSubtitles[action.subIndex], lines:action.newLines}
      return { ...state, subtitles: newSubtitles  };

    // case DATA_FAILURE:
    //   return {
    //     ...state,
    //     isLoggingIn: false,
    //     isAuthenticated: false,
    //     loginError: true,
    //     errorObj: action.error,
    //   };



    default:
      return state;
  }
};

