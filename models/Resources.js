import mongoose from "mongoose";

const ResourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  link: { type: String, required: true },
  category: { type: String, required: true },
});

export default mongoose.models.Resources ||
  mongoose.model("Resources", ResourceSchema);
