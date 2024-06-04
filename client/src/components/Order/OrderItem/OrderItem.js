import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";

const OrderItem = ({ item }) => {
  console.log("inside order item ", item);

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{item?.product?.title}</Typography>
        <Typography variant="body1">Price: ${item?.product?.price}</Typography>
        <Typography variant="body1">Quantity: {item?.quantity}</Typography>
        <Typography variant="body1">
          Subtotal: ${item?.product?.price * item?.quantity}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default OrderItem;
