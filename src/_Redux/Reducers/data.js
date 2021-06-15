import {
  DATA_REQUEST,
  DATA_SUCCESS,
  MODIFY_SINGLE_CAPTION,
  ADD_NEW_CAPTION,
  DELETE_CAPTION,
  CURRENTLY_SELECTED,
  MODIFY_MULTIPLE_CAPTIONS,
  CURRENT_TIME,
  currentTime
} from "../Actions";

export default (
  state = {
    isFetching: false,
    ident:"",
    peaksUrl: null,
    videoUrl: null,
    subtitles: [],
    vttFile: null,
    currentlySelected: null,
    currentTime:0,
    waveformData:[]
  },
  action
) => {
  console.log("action.type",action.type)
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
        ident: action.data.ident,
        waveformData: action.data.waveformobj
      };
    case MODIFY_SINGLE_CAPTION: {
      let newSubtitles = [...state.subtitles];
      newSubtitles[action.subIndex] = action.newCaption;
      return { ...state, subtitles: newSubtitles };
    }

    case MODIFY_MULTIPLE_CAPTIONS: {
      let newSubtitles = [...state.subtitles];
      action.newCaptions.forEach((cap) => {
        newSubtitles[cap.index] = cap.newCaption;
      });
      return { ...state, subtitles: newSubtitles };
    }

    case ADD_NEW_CAPTION: {
      let newSubtitles = [...state.subtitles];
      const originalSubStartTime = newSubtitles[action.subIndex].start
      const originalSubEndTime = newSubtitles[action.subIndex].end
      
      let splitTime = 0;
      if(state.currentTime > originalSubStartTime && state.currentTime < originalSubEndTime) splitTime = state.currentTime
      else splitTime = (originalSubEndTime - originalSubStartTime) / 2 + originalSubStartTime
      
      let oldSub = {
        start: newSubtitles[action.subIndex].start,
        end:splitTime,
        lines: action.oldCaption,
      };

      let newSub = {
        start:splitTime,
        end: originalSubEndTime,
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
      case CURRENT_TIME:
        return {
          ...state,
          currentTime: action.time,
        };
    default:
      return state;
  }
};
