import { createStore } from "redux";
import rootReducer from './Reducers/index.js'
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(
  rootReducer,
  undefined,
  composeWithDevTools()
  
);

export default store;