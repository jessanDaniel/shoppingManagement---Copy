import mongoose from "mongoose";
import Cart from "./cart.js";

const productSchema = mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  quantity: { type: Number, default: 1 },
  selectedFile: String,
});

productSchema.pre("findOneAndDelete", async function (next) {
  const productId = this.getQuery()["_id"];
  try {
    // Remove the product from all carts
    await Cart.updateMany(
      { "products.product": productId },
      { $pull: { products: { product: productId } } }
    );

    await Order.updateMany(
      { "products.product": productId },
      { $pull: { products: { product: productId } } }
    );

    next();
  } catch (error) {
    next(error);
  }
});

export { productSchema };

export default mongoose.model("Product", productSchema);
