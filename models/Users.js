import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  username: { type: String },
});

export default mongoose.models.User || mongoose.model("User", userSchema);
