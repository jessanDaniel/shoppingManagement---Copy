import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  Snackbar,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Alert } from "@material-ui/lab";
import useStyles from "./styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Input from "./Input";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { signin, signup } from "../../actions/auth";

function Auth() {
  const classes = useStyles();
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    phone_number: 9003271936,
    role: 0,
  };

  const [formData, setFormData] = useState(initialState);
  const [authError, setAuthError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("formdata", formData);
    if (isSignup) {
      dispatch(signup(formData, history, setAuthError)).catch((error) => {
        setAuthError(error.message);
      });
    } else {
      dispatch(signin(formData, history, setAuthError)).catch((error) => {
        setAuthError(error.message);
      });
    }
  };

  const handleClose = () => {
    setAuthError("");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log("change in formdata", formData);
  };

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const switchMode = () => {
    setIsSignup((prev) => !prev);
    setShowPassword(false);
  };

  const googleSuccess = async (res) => {
    console.log(jwt_decode(res?.credential));
    const token = res?.credential;
    const result = jwt_decode(res?.credential);

    try {
      dispatch({ type: "AUTH", data: { result, token } });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = () => {
    alert("error for SSO using OAUTH");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isSignup ? "Sign up" : "Sign in"}
        </Typography>
        <form
          autoComplete="off"
          className={classes.form}
          onSubmit={handleSubmit}
        >
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
            {isSignup && (
              <Input
                name="phone_number"
                label="Phone Number"
                handleChange={handleChange}
                type="Number"
              />
            )}
            {isSignup && (
              <Input
                name="address"
                label="Address"
                handleChange={handleChange}
                type="text"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Register" : "Login"}
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <GoogleLogin
                render={(renderProps) => (
                  <Button
                    className={classes.googleButton}
                    color="primary"
                    fullWidth
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    variant="contained"
                  >
                    Google Login
                  </Button>
                )}
                onSuccess={googleSuccess}
                onError={googleFailure}
                cookiePolicy="single_host_origin"
              />
            </Grid>
          </Grid>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account, login ?"
                  : "Don't have and account, register"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <Snackbar
        open={!!authError}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error">
          {authError}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Auth;
