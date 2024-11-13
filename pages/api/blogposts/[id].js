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
        .json({ message: "Post deleted successfully", deletedPost });
    } catch (error) {
      console.error("Error deleting post:", error);
      res.status(500).json({ message: "Error deleting the post." });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
