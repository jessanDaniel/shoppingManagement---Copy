import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../actions/cart";
import { Box, Button, Grid, Paper, Typography } from "@material-ui/core";
import CartProduct from "./CartProduct/CartProduct";
import axios from "axios";

const Cart = () => {
  const dispatch = useDispatch();
  const user = useMemo(() => JSON.parse(localStorage.getItem("profile")), []);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    if (user && cart) {
      dispatch(getCart(user?.result?._id));
    }
  }, [dispatch, user, cart]);

  const calculateSubtotal = (price, quantity) => {
    return price * quantity;
  };

  const calculateGrandTotal = (products) => {
    return products.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const grandTotal = useMemo(
    () => calculateGrandTotal(cart.products),
    [cart.products]
  );

  const handleOrder = async (req, res) => {
    try {
      const url = "http://localhost:5000/order/v1/placeOrder";
      const userId = user?.result?._id;
      const { data } = await axios.post(url, { userId });
      console.log(data);
    } catch (error) {
      console.log("error placing order", error);
    }
  };

  return (
    <div style={{ minHeight: "150%", maxHeight: "150%" }}>
      <Typography variant="h4">Your Cart</Typography>
      {grandTotal === 0 && (
        <Typography variant="h5">Your cart is empty</Typography>
      )}
      <Grid container alignItems="stretch" spacing={3}>
        {cart.products.map((item) => (
          <Grid key={item.product._id} item xs={12} sm={6} md={3}>
            <CartProduct item={item} product={item.product}></CartProduct>
            <Box
              style={{
                minHeight: "35px",
                maxHeight: "35px",
                minWidth: "150px",
                maxWidth: "150px",
                marginTop: "5px",
              }}
            >
              <Paper sx={{ backgroundColor: "white", width: "80%", mt: 4 }}>
                <Typography variant="body2">
                  Subtotal : $
                  {calculateSubtotal(item.product.price, item.quantity).toFixed(
                    2
                  )}
                </Typography>
              </Paper>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Box style={{ marginTop: "20px" }}>
        <Typography variant="h5">
          Grand Total : ${grandTotal.toFixed(2)}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOrder}
          disabled={grandTotal === 0}
        >
          Place Order
        </Button>
      </Box>
    </div>
  );
};

export default Cart;

{
  /* <div key={item.product._id}>
          <Typography variant="h6">{item.product.title}</Typography>
          <Typography variant="body2">Quantity: {item.quantity}</Typography>
          <Button
            onClick={() =>
              handleUpdateQuantity(item.product._id, item.quantity + 1)
            }
          >
            +
          </Button>
          <Button
            onClick={() =>
              handleUpdateQuantity(item.product._id, item.quantity - 1)
            }
          >
            -
          </Button>
          <Button onClick={() => handleRemove(item.product._id)}>Remove</Button>
        </div> */
}
