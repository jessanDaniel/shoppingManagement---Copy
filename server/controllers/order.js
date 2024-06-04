import Order from "../models/order.js";
import Cart from "../models/cart.js";
import mongoose from "mongoose";

export const placeOrder = async (req, res) => {
  const { userId } = req.body;

  try {
    const cart = await Cart.findOne({ userId }).populate("products.product");

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const products = cart.products.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
    }));

    const subtotal = cart.products.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
    const grandTotal = subtotal;

    const order = await Order.create({
      userId,
      products,
      subtotal,
      grandTotal,
    });

    cart.products = [];
    await cart.save();

    return res.status(201).json(order);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getOrderSummary = async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await Order.find({
      userId,
    }).populate("products.product");

    if (orders) {
      return res.status(201).json(orders);
    } else {
      return res.status(404).json({ message: "order not found for this user" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
