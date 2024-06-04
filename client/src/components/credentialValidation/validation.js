export const validate = (formData, isSignup) => {
  const emailRegex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

  if (!isSignup) {
    if (!emailRegex.test(formData.email)) {
      return { errorStatus: true, message: "Your email is not valid" };
    } else if (formData.password.length < 8) {
      return {
        errorStatus: true,
        message: "Your password should be atleast 8 characters",
      };
    } else {
      return { errorStatus: false, message: "Everything alright" };
    }
  } else {
    if (!emailRegex.test(formData.email)) {
      return { errorStatus: true, message: "Your email is not valid" };
    } else if (formData.password.length < 8) {
      return {
        errorStatus: true,
        message: "Your password should be atleast 8 characters",
      };
    } else if (formData.password !== formData.confirmPassword) {
      return { errorStatus: true, message: "Your passwords do not match" };
    } else {
      return { errorStatus: false, message: "Everything alright" };
    }
  }
};
