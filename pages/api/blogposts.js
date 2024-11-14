import dbConnect from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";
import Users from "@/models/Users";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const posts = await BlogPost.find({});
      res.status(200).json(posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({ message: "Error fetching posts." });
    }
  } else if (req.method === "POST") {
    const { blogPost, session } = req.body;
    const { title, content, city, year, age } = blogPost;

    try {
      const user = await Users.findOne({ userId: session.user.userId });
      const authorUsername = user ? user.username : "Anonymous";

      const newPost = new BlogPost({
        title,
        content,
        city,
        year,
        age,
        authorId: session.user.userId,
        authorUsername,
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
