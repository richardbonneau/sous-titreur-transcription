import {
  DATA_REQUEST,
  DATA_SUCCESS,
  MODIFY_SINGLE_CAPTION,
  ADD_NEW_CAPTION,
  DELETE_CAPTION,
  CURRENTLY_SELECTED,
  MODIFY_MULTIPLE_CAPTIONS
} from "../Actions";

export default (
  state = {
    isFetching: false,
    peaksUrl: null,
    videoUrl: null,
    subtitles: [],
    vttFile: null,
    currentlySelected: null,
  },
  action
) => {
  console.log("action",action)
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

    case MODIFY_MULTIPLE_CAPTIONS: {
      let newSubtitles = [...state.subtitles];
      action.newCaptions.forEach((cap)=>{

        newSubtitles[cap.index] = cap.newCaption;
      })
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
        end: newSubtitles[action.subIndex].end,
        lines: action.newCaption,
      };

      newSubtitles[action.subIndex] = oldSub;
      newSubtitles.splice(action.subIndex + 1, 0, newSub);

      return { ...state, subtitles: newSubtitles };
    }

    case DELETE_CAPTION: {
      let newSubtitles = state.subtitles.filter((sub, i) => i !== action.subIndex);

      return { ...state, subtitles: newSubtitles };
    }

    case CURRENTLY_SELECTED:

      return {
        ...state,
        currentlySelected: action.subIndex,
      };

    default:
      return state;
  }
};
