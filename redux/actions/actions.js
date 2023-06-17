import axios from "axios";
import { API_KEY } from "@env";
import {
  fetchFoodSearch,
  fetchFoodSearchSuccess,
  fetchFoodSearchFailure,
  clearFoodSearch,
} from "./actionTypes";
import { cleanSearchData } from "../../utils/cleanSearchData";

const apiUrl_foodSearch = "https://api.nal.usda.gov/fdc/v1/foods/search";

export const fetchFoodSearchAPI = (params) => {
  let config = { params: { ...params, api_key: API_KEY } };
  return async (dispatch) => {
    dispatch(fetchFoodSearch());
    try {
      const response = await axios.get(apiUrl_foodSearch, config);
      const updatedData = cleanSearchData(response.data);
      dispatch(fetchFoodSearchSuccess(updatedData));
    } catch (error) {
      dispatch(fetchFoodSearchFailure(error.message));
    }
  };
};

export const clearFoodSearchResults = () => {
  return (dispatch) => {
    dispatch(clearFoodSearch());
  };
};
