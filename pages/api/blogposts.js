import dbConnect from "@/lib/mongodb";
import BlogPost from "../../models/BlogPost";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    const { title, content, city, year, age } = req.body;
    try {
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
  } else if (req.method === "GET") {
    try {
      const blogPosts = await BlogPost.find({});
      res.status(200).json(blogPosts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching posts." });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).json({ message: "Method not allowed" });
  }
}
