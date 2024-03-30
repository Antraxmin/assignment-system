import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);
