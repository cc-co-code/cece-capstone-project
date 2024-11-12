import dbConnect from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";

export default async function handler(req, res) {
  const { id } = req.query;

  await dbConnect();

  if (req.method === "PATCH") {
    const { comment } = req.body;

    try {
      const updatedPost = await BlogPost.findByIdAndUpdate(
        id,
        { $push: { comments: { text: comment, createdAt: new Date() } } },
        { new: true }
      );
      res.status(200).json(updatedPost.comments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error adding comment." });
    }
  } else {
    res.setHeader("Allow", ["PATCH"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
