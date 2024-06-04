import React, { useState, useEffect } from "react";
import { AppBar, Avatar, Toolbar, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";
import logo from "../../images/logo.png";
import ic from "../../images/shoppng.png";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedtoken = decode(token);

      if (decodedtoken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    history.push("/");
    setUser(null);
  };

  console.log(user);
  const classes = useStyles();
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Link to="/">
          <img src={logo} alt="icon" height="45px" />
          <img src={ic} alt="icon" height="40px" className={classes.image} />
        </Link>
        {/* <img className={classes.image} src={memories} alt="icon" height="60" /> */}
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.result.name}
              src={user.result.imageUrl}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.result.name}
            </Typography>
            {user?.result?.role === 0 && (
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/mycart"
                style={{
                  minWidth: "110px",
                  maxWidth: "110px",
                  minHeight: "50px",
                  maxHeight: "50px",
                }}
              >
                My Cart
              </Button>
            )}
            {user?.result?.role === 0 && (
              <Button
                variant="contained"
                fullWidth
                color="primary"
                component={Link}
                to="/myOrders"
                style={{
                  minWidth: "130px",
                  maxWidth: "130px",
                  minHeight: "50px",
                  maxHeight: "50px",
                }}
              >
                My Orders
              </Button>
            )}
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logout}
              style={{
                minWidth: "110px",
                maxWidth: "110px",
                minHeight: "50px",
                maxHeight: "50px",
              }}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign in
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
