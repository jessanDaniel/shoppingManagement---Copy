import express from "express";
import {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
} from "../controllers/cart.js";
// removeFromCart,
// updateCart,
// ,
// getTotal,

const router = express.Router();

router.post("/add", addToCart);
router.get("/:userId", getCart);
router.put("/update", updateCartItem);
router.delete("/delete/:userId/:productId", removeFromCart);

export default router;
