import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

const url = "http://localhost:5000/products";

export const fetchProducts = () => API.get("/products");

export const createProduct = (newProduct) => API.post("/products", newProduct);

export const updateProduct = (id, updatedProduct) =>
  API.patch(`/products/${id}`, updatedProduct);

export const deleteProduct = (id) => API.delete(`/products/${id}`);
export const fetchProductBySearch = (searchQuery) =>
  API.get(`/products/search?searchQuery=${searchQuery || "none"}`);

//! authentication
export const signin = (formData) => API.post("/users/signin", formData);
export const signup = (formData) => API.post("/users/signup", formData);

//! cart operations
const baseURL = "http://localhost:5000";

export const addToCart = (userId, productId, quantity) =>
  axios.post(`${baseURL}/cart/v1/add`, { userId, productId, quantity });

export const getCart = (userId) => axios.get(`${baseURL}/cart/v1/${userId}`);

export const updateCartItem = (userId, productId, quantity) =>
  axios.put(`${baseURL}/cart/v1/update`, { userId, productId, quantity });

export const removeCartItem = (userId, productId) => {
  console.log("api level", productId);
  axios.delete(`${baseURL}/cart/v1/delete/${userId}/${productId}`);
};

export const getOrderSummary = async (userId) => {
  const response = await axios.get(`http://localhost:5000/order/v1/${userId}`);
  console.log(response);
  return response;
};
