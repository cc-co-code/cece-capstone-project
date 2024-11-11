import dbConnect from "@/lib/mongodb";
import mongoose from "mongoose";

const blogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  city: { type: String },
  year: { type: Number },
  age: { type: Number },
  createdAt: { type: Date, default: Date.now },
});

const BlogPost =
  mongoose.models.BlogPost || mongoose.model("BlogPost", blogPostSchema);

export default async function handler(req, res) {
  await dbConnect(); // Ensure connection is established

  if (req.method === "POST") {
    try {
      const { title, content, city, year, age } = req.body;

      const newBlogPost = new BlogPost({
        title,
        content,
        city,
        year,
        age,
      });

      await newBlogPost.save();

      res
        .status(201)
        .json({ message: "Post successfully created!", newBlogPost });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating the post." });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
