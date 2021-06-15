import undoable,{excludeAction } from 'redux-undo';
import data from "./data";
import media from "./media";


import { combineReducers } from "redux";
export default combineReducers({
  data:undoable(data, {
    limit: 10,
    filter:excludeAction(["CURRENT_TIME","CURRENTLY_SELECTED"])
  }),
  media,

});
