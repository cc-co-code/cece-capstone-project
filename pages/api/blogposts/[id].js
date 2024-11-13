import dbConnect from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  if (req.method === "DELETE") {
    try {
      const deletedPost = await BlogPost.findByIdAndDelete(id);
      if (!deletedPost) {
        return res.status(404).json({ message: "Post not found" });
      }
      res
        .status(200)
        .json({ message: "Post successfully deleted", deletedPost });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error deleting the post." });
    }
  } else if (req.method === "GET") {
    try {
      const post = await BlogPost.findById(id);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.status(200).json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching the post." });
    }
  } else {
    res.setHeader("Allow", ["GET", "DELETE"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
