import * as api from "../api/index";

export const addToCart = (userId, productId, quantity) => async (dispatch) => {
  try {
    const { data } = await api.addToCart(userId, productId, quantity);
    dispatch({ type: "ADD_TO_CART", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getCart = (userId) => async (dispatch) => {
  try {
    const { data } = await api.getCart(userId);
    dispatch({ type: "UPDATE_CART_ITEM", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const removeCartItem = (userId, productId) => async (dispatch) => {
  console.log("action level", productId);
  try {
    const { data } = await api.removeCartItem(userId, productId);

    dispatch({ type: "REMOVE_CART_ITEM", payload: data.cart });
    dispatch(getCart(userId));
  } catch (error) {
    console.log(error);
  }
};

export const updateCartItem =
  (userId, productId, quantity) => async (dispatch) => {
    try {
      const { data } = await api.updateCartItem(userId, productId, quantity);
      dispatch({ type: "UPDATE_CART_ITEM", payload: data });
    } catch (error) {
      console.log(error);
    }
  };
