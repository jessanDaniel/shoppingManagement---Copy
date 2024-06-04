import * as api from "../api/index";

export const getOrderSummary = (userId) => async (dispatch) => {
  try {
    const { data } = await api.getOrderSummary(userId);
    console.log(data);
    dispatch({ type: "ORDER_SUMMARY", payload: data });
  } catch (error) {
    console.log(error);
  }
};
