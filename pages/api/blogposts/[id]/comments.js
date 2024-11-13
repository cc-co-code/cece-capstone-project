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
        {
          $push: {
            comments: { text: comment, authorId, createdAt: new Date() },
          },
        },
        { new: true }
      );
      res.status(200).json(updatedPost.comments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error adding comment." });
    }
  } else if (req.method === "DELETE") {
    const { commentId } = req.body;

    try {
      const updatedPost = await BlogPost.findByIdAndUpdate(
        id,
        { $pull: { comments: { _id: commentId } } }, // Kommentar per ID entfernen
        { new: true }
      );
      res.status(200).json(updatedPost.comments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error deleting comment." });
    }
  } else {
    res.setHeader("Allow", ["PATCH", "DELETE"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
