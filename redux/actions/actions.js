import axios from "axios";
import {
  fetchFoodListRequest,
  fetchFoodListSuccess,
  fetchFoodListFailure,
} from "./actionTypes";

const apiKey = "CMyTqDht6VTOge3I2aU6JSJ7rKOTaYLZvtTRplFD";
const apiUrl_foodlist = "https://api.nal.usda.gov/fdc/v1/foods/list";

export const fetchFoodList = (params) => {
  let config = { params: { ...params, api_key: apiKey } };
  console.log("config:", config);

  return async (dispatch) => {
    dispatch(fetchFoodListRequest());
    try {
      const response = await axios.get(apiUrl_foodlist, config);
      dispatch(fetchFoodListSuccess(response.data));
    } catch (error) {
      dispatch(fetchFoodListFailure(error.message));
    }
  };
};
