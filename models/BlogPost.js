import mongoose from "mongoose";

const blogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  city: { type: String },
  year: { type: Number },
  age: { type: Number },
  createdAt: { type: Date, default: Date.now },
  comments: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
      },
      text: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

const BlogPost =
  mongoose.models.BlogPost || mongoose.model("BlogPost", blogPostSchema);

export default BlogPost;
