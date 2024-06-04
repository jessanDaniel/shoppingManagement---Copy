import express from "express";
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getProductsBySearch,
} from "../controllers/products.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/search", getProductsBySearch);
router.get("/", getProducts);
router.post("/", auth, createProduct);
router.patch("/:id", auth, updateProduct);
router.delete("/:id", auth, deleteProduct);

export default router;
