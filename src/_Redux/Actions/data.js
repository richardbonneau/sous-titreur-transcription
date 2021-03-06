export const DATA_REQUEST = "DATA_REQUEST";
export const DATA_SUCCESS = "DATA_SUCCESS";
export const DATA_FAILURE = "DATA_FAILURE";
export const MODIFY_SINGLE_CAPTION = "MODIFY_SINGLE_CAPTION";
export const ADD_NEW_CAPTION = "ADD_NEW_CAPTION";
export const DELETE_CAPTION = "DELETE_CAPTION";
export const CURRENTLY_SELECTED = "CURRENTLY_SELECTED";
export const MODIFY_MULTIPLE_CAPTIONS = "MODIFY_MULTIPLE_CAPTIONS";
export const CURRENT_TIME = "CURRENT_TIME"

export const requestData = () => {
  return {
    type: DATA_REQUEST,
  };
};

export const receiveData = (data) => {
  return {
    type: DATA_SUCCESS,
    data,
  };
};

export const dataError = (error) => {
  return {
    type: DATA_FAILURE,
    error,
  };
};

export const modifySingleCaption = (newCaption, subIndex) => {
  return {
    type: MODIFY_SINGLE_CAPTION,
    subIndex,
    newCaption,
  };
};

export const modifyMultipleCaption = (newCaptions) => {
  return {
    type: MODIFY_MULTIPLE_CAPTIONS,
    newCaptions
  };
};

export const addNewCaption = (oldCaption, newCaption, subIndex) => {
  return {
    type: ADD_NEW_CAPTION,
    oldCaption,
    subIndex,
    newCaption,
  };
};

export const deleteCaption = (subIndex) => {
  return {
    type: DELETE_CAPTION,
    subIndex,
  };
};

export const selectSub = (subIndex) => {
  return {
    type: CURRENTLY_SELECTED,
    subIndex,
  };
};


export const currentTime = (time) => {
  return {
    type: CURRENT_TIME,
    time,
  };
};
