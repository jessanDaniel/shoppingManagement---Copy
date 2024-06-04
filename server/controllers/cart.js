import Cart from "../models/cart.js";

export const addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (cart) {
      const productIndex = cart.products.findIndex(
        (p) => p.product.toString() === productId
      );

      if (productIndex > -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity });
      }
      cart = await cart.save();
      return res.status(200).json(cart);
    } else {
      const newCart = await Cart.create({
        userId,
        products: [{ product: productId, quantity }],
      });

      return res.status(201).json(newCart);
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server side error in adding to cart" });
  }
};

export const getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId }).populate("products.product");

    if (cart) {
      return res.status(200).json(cart);
    } else {
      return res.status(300).json({ message: "cart not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "getCart" + error.message });
  }
};

// export const updateCartItem = async (req, res) => {
//   const { userId, productId, quantity } = req.body;

//   try {
//     const cart = await Cart.findOne({ userId });

//     if (cart) {
//       const productIndex = cart.products.findIndex(
//         (p) => p.product.toString() === productId
//       );

//       if (productIndex > -1) {
//         cart.products[productIndex].quantity = quantity;
//         console.log("this is the cart", cart);
//         const updatedCart = await cart.save();
//         return res.status(200).json(updatedCart);
//       } else {
//         return res.status(404).json({ message: "Product not found in cart" });
//       }
//     } else {
//       return res.status(404).json({ message: "Cart not found" });
//     }
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };

export const removeFromCart = async (req, res) => {
  const { userId, productId } = req.params;
  console.log("productId", productId);
  try {
    // const filter = { userId: userId };
    // const update = { $pull: { products: { product: productId } } };
    // const options = { new: true };
    const cart = await Cart.findOne({ userId }).populate("products.product");
    console.log(cart, "cart");

    if (cart) {
      console.log(
        "array",
        cart.products.map((item) => item.product._id)
      );
      cart.products = cart.products.filter(
        (item) => item.product._id.toString() !== productId
      );
      console.log("upda", cart.products);
      const updatedCart = await cart.save();
      return res.status(200).json(updatedCart);
    } else {
      return res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// export const removeFromCart = async (req, res) => {
//   const { userId, productId } = req.params;
//   console.log(userId, productId);
//   try {
//     const filter = { userId: userId };
//     const update = { $pull: { products: { product: productId } } };
//     const options = { new: true };

//     const cart = await Cart.findOneAndUpdate(filter, update, options).populate(
//       "products.product"
//     );
//     // If the product was not found in the cart
//     if (!cart) {
//       return res
//         .status(404)
//         .json({ message: "Product not found in the cart." });
//     }

//     res.json(cart);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const updateCartItem = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  console.log(productId, "upd");
  try {
    const filter = { userId: userId, "products.product": productId };
    const update = { $set: { "products.$.quantity": quantity } };
    const options = { new: true };

    const cart = await Cart.findOneAndUpdate(filter, update, options).populate(
      "products.product"
    );
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
