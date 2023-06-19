import { TYPES } from "../constants";

const fetchFoodSearch = () => ({
  type: TYPES.FETCH_FOOD_SEARCH_REQUEST,
});

const fetchFoodSearchSuccess = (data) => ({
  type: TYPES.FETCH_FOOD_SEARCH_SUCCESS,
  payload: data,
});

const fetchFoodSearchFailure = (error) => ({
  type: TYPES.FETCH_FOOD_SEARCH_FAILURE,
  payload: error,
});

const clearFoodSearch = () => ({
  type: TYPES.CLEAR_FOOD_SEARCH,
});

export {
  fetchFoodSearch,
  fetchFoodSearchSuccess,
  fetchFoodSearchFailure,
  clearFoodSearch,
};
