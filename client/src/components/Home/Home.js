import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Container,
  Grow,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button,
} from "@material-ui/core";
import Products from "../Products/Products";
import Form from "../Form/Form";
import { getProducts, getProductsBySearch } from "../../actions/products";
import Pagination from "../Pagination/Pagination";

import { useHistory, useLocation } from "react-router-dom";
import useStyles from "./styles";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Home() {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const query = useQuery();
  const history = useHistory();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const classes = useStyles();

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch, currentId]);
  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      //logic
      searchProduct();
    }
  };

  const searchProduct = () => {
    if (search.trim()) {
      //
      dispatch(getProductsBySearch(search));
      history.push(`/products/search?searchQuery=${search || "none"}`);
    } else {
      history.push("/");
    }
  };

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
          className={classes.gridContainer}
        >
          <Grid item xs={12} sm={7}>
            <Products setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                variant="outlined"
                lable="Search Products"
                fullWidth
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                onKeyDown={handleKeyPress}
              />
              <Button
                onClick={searchProduct}
                className={classes.searchButton}
                color="primary"
                variant="contained"
                style={{ marginTop: "10px" }}
              >
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {/* <Paper elevation={6}>
              <Pagination />
            </Paper> */}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
}

export default Home;
