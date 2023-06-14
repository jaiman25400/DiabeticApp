import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import counterReducer from "./reducers/counterReducer";
import userStateReducer from "./reducers/userStateReducer";
import apiRequest from "./reducers/apiReducer";

const rootReducer = combineReducers({
  counter: counterReducer,
  user: userStateReducer,
  api: apiRequest,
  //slice2: reducer2,
});

const store = configureStore({ reducer: rootReducer });
export default store;
