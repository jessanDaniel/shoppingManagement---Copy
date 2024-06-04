import Product from "../models/product.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  const product = req.body;
  const newProduct = new Product(product);

  try {
    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const { id: _id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    console.log(_id);
    return res
      .status(404)
      .send("No product with tha id, id must be not compatible");
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    _id,
    { ...product, _id },
    {
      new: true,
    }
  );

  res.json(updatedProduct);
};

export const deleteProduct = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    console.log(_id);
    return res
      .status(404)
      .send("No product with that id to delete, id must be not compatible");
  }

  await Product.findByIdAndDelete(_id);

  res.status(200).json({ message: "Post deleted" });
};

export const getProductsBySearch = async (req, res) => {
  const { searchQuery } = req.query;
  try {
    const title = new RegExp(searchQuery, "i");

    const products = await Product.find({ title });

    res.json({ data: products });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
