import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import useStyles from "./styles";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../actions/products";
import { updateProduct } from "../../actions/products";

function Form({ currentId, setCurrentId }) {
  const product = useSelector((state) =>
    currentId ? state.products.find((p) => p._id === currentId) : null
  );

  const user = JSON.parse(localStorage.getItem("profile"));

  if (user?.result?.role === 1) {
    console.log("this is an admin");
  }

  const [productData, setProductData] = useState({
    title: "",
    description: "",
    quantity: 1,
    price: 0,
    selectedFile: "",
  });
  const classes = useStyles();

  useEffect(() => {
    if (product) setProductData(product);
  }, [product]);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(updateProduct(currentId, productData));
    } else {
      dispatch(createProduct(productData));
    }
    clear();
    console.log(productData);
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    // Allow empty value to let users clear the field
    if (value === "" || /^[0-9\b]+(\.[0-9\b]*)?$/.test(value)) {
      setProductData({ ...productData, price: value });
    }
  };

  const clear = () => {
    setCurrentId(null);
    setProductData({
      title: "",
      description: "",
      quantity: 1,
      price: 0,
      selectedFile: "",
    });
  };

  return (
    <>
      {user?.result?.role ? (
        <Paper>
          <form
            autoComplete="off"
            noValidate
            className={`${classes.root} ${classes.form}`}
            onSubmit={handleSubmit}
          >
            <Typography variant="h6">
              {currentId ? "Editing" : "Creating"} a Product
            </Typography>
            <TextField
              name="title"
              variant="outlined"
              label="title"
              fullWidth
              value={productData.title}
              onChange={(e) =>
                setProductData({ ...productData, title: e.target.value })
              }
            />
            <TextField
              name="description"
              variant="outlined"
              label="description"
              fullWidth
              value={productData.description}
              onChange={(e) =>
                setProductData({ ...productData, description: e.target.value })
              }
            />
            <TextField
              name="price"
              variant="outlined"
              label="price"
              fullWidth
              value={productData.price}
              onChange={handlePriceChange}
              inputProps={{
                inputMode: "decimal",
                pattern: "[0-9]*[.,]?[0-9]*",
              }}
            />
            <div className={classes.fileInput}>
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setProductData({ ...productData, selectedFile: base64 })
                }
              />
            </div>
            <Button
              className={classes.buttonSubmit}
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              fullWidth
            >
              Submit
            </Button>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={clear}
              fullWidth
            >
              Clear
            </Button>
          </form>
        </Paper>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default Form;
