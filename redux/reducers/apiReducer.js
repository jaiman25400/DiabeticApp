import { TYPES } from "../constants";

const initialState = {
  foodSearch: null,
  loading: false,
  error: null,
};

const apiRequest = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.FETCH_FOOD_SEARCH_REQUEST:
      return { ...state, loading: true, error: null };
    case TYPES.FETCH_FOOD_SEARCH_SUCCESS:
      return { ...state, foodSearch: action.payload, loading: false };
    case TYPES.FETCH_FOOD_LIST_FAILURE:
      return { ...state, error: action.payload, loading: false };
    case TYPES.CLEAR_FOOD_SEARCH:
      return { ...state, foodSearch: null, error: null };
    default:
      return state;
  }
};

export default apiRequest;
