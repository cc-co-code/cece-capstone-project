import { getSession } from "next-auth/react";
import dbConnect from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      // Alle Blogposts abrufen
      const posts = await BlogPost.find({});
      res.status(200).json(posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({ message: "Error fetching posts." });
    }
  } else if (req.method === "POST") {
    const session = await getSession({ req });
    if (!session) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const { title, content, city, year, age } = req.body;

    try {
      const newPost = new BlogPost({
        title,
        content,
        city,
        year,
        age,
        authorId: session.user.id,
        createdAt: new Date(),
      });

      await newPost.save();
      res.status(201).json(newPost);
    } catch (error) {
      console.error("Error creating post:", error);
      res.status(500).json({ message: "Error creating post." });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
