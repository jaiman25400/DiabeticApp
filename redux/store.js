import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import counterReducer from "./reducers/counterReducer";

const rootReducer = combineReducers({
  counter: counterReducer,
  //slice2: reducer2,
});

const store = configureStore({ reducer: rootReducer });
export default store;
