// import User from "./user.js";
import Product from "./product.js";
import mongoose, { Schema } from "mongoose";

const cartItemSchema = mongoose.Schema({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true },
});

const cartSchema = mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  products: [cartItemSchema],
});

export default mongoose.model("Cart", cartSchema);
