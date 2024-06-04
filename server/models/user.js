import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: Number, default: 0 },
  // id: { type: String },
  phone_number: { type: Number, required: true },
  address: { type: String, required: true },
});

export default mongoose.model("User", userSchema);
