import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Grid,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
// import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { removeCartItem, updateCartItem, getCart } from "../../../actions/cart";

function Product({ product, item }) {
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));

  const dispatch = useDispatch();

  const handleRemove = async (productId) => {
    console.log("cart level", productId);
    await dispatch(removeCartItem(user?.result?._id, productId));
    // await dispatch(getCart(user?.result?._id));
  };

  const handleUpdateQuantity = (productId, quantity) => {
    if (quantity > 20) quantity = 20;
    if (quantity < 1) quantity = 1;
    dispatch(updateCartItem(user?.result?._id, productId, quantity));
  };

  //   const handleAddToCart = (userId, productId) => {
  //     const quantity = 1;

  //     try {
  //       dispatch(addToCart(userId, productId, quantity));
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={product.selectedFile}
      ></CardMedia>
      <div className={classes.overlay}>
        {/* <Typography variant="h6">{product.price}</Typography> */}
      </div>
      <CardContent>
        <Typography variant="h4">{product.title}</Typography>

        <Typography className={classes.price} variant="h6">
          ${product.price}
        </Typography>
        <Typography
          className={classes.price}
          variant="body2"
          color="textSecondary"
          component="p"
        >
          {product.description}
        </Typography>
        <Typography variant="body2">Quantity: {item.quantity}</Typography>
      </CardContent>
      <CardActions>
        <Grid container spacing={3}>
          <Grid item>
            <Button
              variant="contained"
              size="small"
              color="secondary"
              onClick={() =>
                handleUpdateQuantity(product._id, item.quantity + 1)
              }
            >
              +
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              size="small"
              color="secondary"
              onClick={() =>
                handleUpdateQuantity(product._id, item.quantity - 1)
              }
            >
              -
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              size="small"
              color="primary"
              onClick={() => handleRemove(product._id)}
            >
              <DeleteIcon fontSize="small" />
              Remove
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}

export default Product;

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
