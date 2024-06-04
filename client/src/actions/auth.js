import * as api from "../api/index";

export const signin = (formData, history, setAuthError) => async (dispatch) => {
  try {
    //login
    const { data } = await api.signin(formData);
    // if (data?.unsuccessful) {
    //   dispatch({ type: "LOGOUT" }, data);
    //   history.push("/");
    //   return;
    // }
    dispatch({ type: "AUTH", data });
    history.push("/");
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      const errorMessage = error.response.data.message;
      setAuthError(errorMessage); // Set the error message to authError state
    }
  }
};

export const signup = (formData, history, setAuthError) => async (dispatch) => {
  try {
    //register
    const { data } = await api.signup(formData);
    dispatch({ type: "AUTH", data });
    history.push("/");
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      const errorMessage = error.response.data.message;
      setAuthError(errorMessage); // Set the error message to authError state
    }
  }
};
