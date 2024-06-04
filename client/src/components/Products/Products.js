import React, { useEffect } from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";

import Product from "./Product/Product";
import useStyles from "./styles";
import product from "../../reducers/product";
import { getProducts } from "../../actions/products";

const Posts = ({ setCurrentId }) => {
  const products = useSelector((state) => state.products);
  const classes = useStyles();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getProducts());
  // }, [products]);

  return !products.length ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {products.map((product) => (
        <Grid key={product._id} item xs={12} sm={6} md={4}>
          <Product product={product} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
