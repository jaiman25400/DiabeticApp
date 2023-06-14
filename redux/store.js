import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import userStateReducer from "./reducers/userStateReducer";
import apiRequest from "./reducers/apiReducer";

const rootReducer = combineReducers({
  user: userStateReducer,
  api: apiRequest,
  //slice2: reducer2,
});

const store = configureStore({ reducer: rootReducer });
export default store;
