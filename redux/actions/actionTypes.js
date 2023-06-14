const fetchFoodListRequest = () => ({
  type: "FETCH_FOOD_LIST_REQUEST",
});

const fetchFoodListSuccess = (data) => ({
  type: "FETCH_FOOD_LIST_SUCCESS",
  payload: data,
});

const fetchFoodListFailure = (error) => ({
  type: "FETCH_FOOD_LIST_FAILURE",
  payload: error,
});

export { fetchFoodListRequest, fetchFoodListSuccess, fetchFoodListFailure };
