export const PLAY_PAUSE = "PLAY_PAUSE";
export const SEEKING = "SEEKING"


export const isVideoPlaying = (isPlaying) => {
  return {
    type: PLAY_PAUSE,
    isPlaying
  };
};
export const seeking = (seekingTime) => {
  console.log("seekingTime",seekingTime)
  return {
    type: SEEKING,
    seekingTime
  };
};
