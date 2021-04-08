import {
  DATA_REQUEST,
  DATA_SUCCESS,
  MODIFY_SINGLE_CAPTION,
  ADD_NEW_CAPTION,
  DELETE_CAPTION,
} from "../Actions";

export default (
  state = {
    isFetching: false,
    peaksUrl: null,
    videoUrl: null,
    subtitles: [],
    vttFile: null,
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
        peaksUrl: action.data.waveform,
        videoUrl: action.data.videolink,
        subtitles: action.data.subtitles,
      };
    case MODIFY_SINGLE_CAPTION: {
      let newSubtitles = [...state.subtitles];
      newSubtitles[action.subIndex] = action.newCaption;
      return { ...state, subtitles: newSubtitles };
    }

    case ADD_NEW_CAPTION: {
      let newSubtitles = [...state.subtitles];

      let oldSub = {
        start: newSubtitles[action.subIndex].start,
        end:
          (newSubtitles[action.subIndex].end - newSubtitles[action.subIndex].start) / 2 +
          newSubtitles[action.subIndex].start,
        lines: action.oldCaption,
      };

      let newSub = {
        start: oldSub.end,
        end:
          (newSubtitles[action.subIndex].end - newSubtitles[action.subIndex].start) / 2 +
          newSubtitles[action.subIndex].end,
        lines: action.newCaption,
      };

      newSubtitles[action.subIndex] = oldSub;
      newSubtitles.splice(action.subIndex + 1, 0, newSub);
      console.log("newSubtitles", newSubtitles);
      return { ...state, subtitles: newSubtitles };
    }

    case DELETE_CAPTION: {
      let newSubtitles = state.subtitles.filter((sub,i)=>i!==action.subIndex);
      
      return { ...state, subtitles: newSubtitles };
    }

    default:
      return state;
  }
};
