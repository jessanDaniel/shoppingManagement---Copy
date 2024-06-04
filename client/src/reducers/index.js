import { combineReducers } from "redux";

import products from "./product";
import authReducer from "./auth";
import cart from "./cart";
import order from "./order";

export default combineReducers({
  products,
  authReducer,
  cart,
  order,
});
