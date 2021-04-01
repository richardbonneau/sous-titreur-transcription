export const DATA_REQUEST = "DATA_REQUEST";
export const DATA_SUCCESS = "DATA_SUCCESS";
export const DATA_FAILURE = "DATA_FAILURE";
export const MODIFY_SINGLE_SUBTITLE = "MODIFY_SINGLE_SUBTITLE";

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

export const modifySingleSubtitle = (subIndex, newLines) => {
  return {
    type: MODIFY_SINGLE_SUBTITLE,
    subIndex,
    newLines,
  };
};
