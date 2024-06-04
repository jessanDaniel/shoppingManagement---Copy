import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

import dotenv from "dotenv";

import productRoutes from "./routes/products.js";
import userRoutes from "./routes/users.js";
import cartRoutes from "./routes/cart.js";
import orderRoutes from "./routes/order.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());

app.use("/products", productRoutes);
app.use("/users", userRoutes);
app.use("/cart/v1", cartRoutes);
app.use("/order/v1", orderRoutes);

const PORT = process.env.PORT || 5000;

const connection_url =
  "mongodb+srv://jessandaniel:jessandaniel123123@cluster0.xlb6hpj.mongodb.net/";

mongoose
  .connect(connection_url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => {
      console.log("server running");
    })
  )
  .catch((err) => console.log(err));
// mongoose.set("useFindAndModify", false);

// app.listen(PORT, () => console.log("hello there" + ` ${USER}`));
