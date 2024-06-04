export default (cart = { products: [] }, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return action.payload;
    case "FETCH_CART":
      return action.payload;
    case "UPDATE_CART_ITEM":
      return action.payload;
    case "REMOVE_CART_ITEM":
      return action.payload;
    default:
      return cart;
  }
};
