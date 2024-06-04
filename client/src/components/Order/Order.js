import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Box, Grid, CircularProgress } from "@material-ui/core";
import { getOrderSummary } from "../../actions/order";
import OrderItem from "./OrderItem/OrderItem";

function Order() {
  const user = useMemo(() => JSON.parse(localStorage.getItem("profile")), []);
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order);
  const [loading, setLoading] = useState(true);
  let grandTotal = 0;
  let newOrder;
  useEffect(() => {
    dispatch(getOrderSummary(user?.result?._id)).then(() => setLoading(false));
  }, [dispatch, user]);

  console.log("this is the orders", orders);
  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <Typography variant="h4">Your Orders</Typography>
      {orders.length === 0 && <Typography>No Orders to show</Typography>}
      <Grid>
        {orders.map((order) => (
          <Box
            key={order._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              background: "#f0f0f0",
              marginBottom: "20px",
            }}
          >
            {console.log("the order", order)}
            <Typography variant="body2">
              {new Date(order.createdAt).toLocaleDateString()}
            </Typography>

            <Grid container spacing={3}>
              {order.products.map((order) => (
                <Grid item key={order._id} xs={12} sm={6} md={4}>
                  <OrderItem item={order} />
                </Grid>
              ))}
            </Grid>

            <Box>
              <Typography variant="h5">
                Grand Total : ${order.grandTotal}
              </Typography>
              <Typography>
                Your order will be delivered by{" "}
                {new Date(
                  new Date(order.createdAt).setDate(
                    new Date(order.createdAt).getDate() + 7
                  )
                ).toLocaleDateString()}{" "}
                to {user?.result?.address}
              </Typography>
            </Box>
          </Box>
        ))}
      </Grid>
    </div>
  );
}

export default Order;
