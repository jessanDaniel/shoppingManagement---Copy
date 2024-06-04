import React, { useEffect } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../../../actions/products";
import { addToCart, getCart } from "../../../actions/cart";

function Product({ product, setCurrentId }) {
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));
  const cartData = useSelector((state) => state.cart);

  const isProductInCart = () => {
    console.log(cartData);
    return cartData.products.some((item) => item.product._id === product._id);
  };

  console.log(product);
  const dispatch = useDispatch();

  const handleAddToCart = (userId, productId) => {
    const quantity = 1;

    try {
      dispatch(addToCart(userId, productId, quantity));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (cartData.products.length !== 0) {
      dispatch(getCart(user?.result?._id));
      isProductInCart();
    }
  }, [cartData, handleAddToCart]);

  return (
    <Card className={classes.card} raised elevation={6}>
      <CardMedia
        className={classes.media}
        image={product.selectedFile}
        title={product.title}
      ></CardMedia>
      <div className={classes.overlay}>
        <Typography variant="h6">{product.title}</Typography>
        {/* <Typography variant="h6">{product.price}</Typography> */}
      </div>
      <div className={classes.overlay2}>
        {user?.result?.role ? (
          <Button
            style={{ color: "white" }}
            size="small"
            onClick={() => {
              setCurrentId(product._id);
            }}
          >
            <MoreHorizIcon fontSize="default" />
          </Button>
        ) : null}
      </div>
      <CardContent>
        <Typography className={classes.price} variant="h4">
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
      </CardContent>
      <CardActions>
        {user && !user?.result?.role ? (
          <>
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={() => {
                handleAddToCart(user?.result?._id, product._id);
              }}
              disabled={isProductInCart()}
            >
              Add to Cart
            </Button>
            {isProductInCart() && (
              <Typography variant="body2" color="textPrimary">
                Already in Cart
              </Typography>
            )}
          </>
        ) : null}
        {user?.result?.role ? (
          <Button
            size="small"
            color="primary"
            onClick={() => {
              dispatch(deleteProduct(product._id));
            }}
          >
            <DeleteIcon fontSize="small" />
            Delete
          </Button>
        ) : null}
      </CardActions>
    </Card>
  );
}

export default Product;
