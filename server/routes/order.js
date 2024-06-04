import express from "express";
import { getOrderSummary, placeOrder } from "../controllers/order.js";

const router = express.Router();

router.get("/:userId", getOrderSummary);
router.post("/placeOrder", placeOrder);

export default router;
