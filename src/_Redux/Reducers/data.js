import { DATA_REQUEST, DATA_SUCCESS, MODIFY_SINGLE_CAPTION, CURRENT_TIME } from "../Actions";

export default (
  state = {
    isFetching: false,
    ident: "",
    videoUrl: null,
    currentTime: 0,
    frequentlyUsedWords: ["Babass","Sous-Titreur"],
    frequentMistakes: {"c'est":["c'Est"]},
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
        ident: action.data.ident,
        waveformData: action.data.waveformobj,
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
