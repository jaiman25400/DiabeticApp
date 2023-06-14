import { TYPES } from "../constants";

const initialState = {
  foodList: null,
  loading: false,
  error: null,
};

const apiRequest = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.FETCH_FOOD_LIST_REQUEST:
      return { ...state, loading: true, error: null };
    case TYPES.FETCH_FOOD_LIST_SUCCESS:
      return { ...state, foodList: action.payload, loading: false };
    case TYPES.FETCH_FOOD_LIST_FAILURE:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export default apiRequest;
