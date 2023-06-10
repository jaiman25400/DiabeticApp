import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import apiRequest from "./reducers/apiReducer";

const rootReducer = combineReducers({
  api: apiRequest,
});

const store = configureStore({ reducer: rootReducer });
export default store;
