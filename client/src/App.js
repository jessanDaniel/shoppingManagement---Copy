import React from "react";

import { Container } from "@material-ui/core";

import useStyles from "./styles";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
// import memories from "./images/memories.png";
import { GoogleOAuthProvider } from "@react-oauth/google";
import MyCart from "./components/MyCart/MyCart";
import Order from "./components/Order/Order";
import ProductDetails from "./components/ProductDetails/ProductDetails";

const App = () => {
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <GoogleOAuthProvider clientId="239195074958-okbq7hhp43aonq5lkcb04lqjasrmbc2t.apps.googleusercontent.com">
      <BrowserRouter>
        <Container maxWidth="xl">
          <Navbar />
          <Switch>
            <Route
              path="/"
              exact
              component={() => <Redirect to="/products" />}
            />
            <Route path="/products" exact component={Home} />
            <Route
              path="/auth"
              exact
              component={() => (!user ? <Auth /> : <Redirect to="products" />)}
            />
            <Route path="/products/search" exact component={Home} />
            <Route path="/products/:id" component={ProductDetails} />
            <Route path="/mycart" component={MyCart} />
            <Route path="/myOrders" component={Order} />
          </Switch>
        </Container>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
};

export default App;
