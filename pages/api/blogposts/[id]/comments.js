import mongoose from "mongoose";
import dbConnect from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";

export default async function handler(req, res) {
  const { id } = req.query;

  await dbConnect();

  if (req.method === "PATCH") {
    const { comment, authorId, authorUsername } = req.body;

    try {
      const updatedPost = await BlogPost.findByIdAndUpdate(
        id,
        {
          $push: {
            comments: {
              _id: new mongoose.Types.ObjectId(),
              text: comment,
              authorId,
              authorUsername,
              createdAt: new Date(),
            },
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
    const { commentId, userId } = req.body;
    console.log("Received userId:", userId);
    console.log("Received commentId:", commentId);

    try {
      const post = await BlogPost.findOne({
        _id: id,
        "comments._id": commentId,
      });

      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }

      const comment = post.comments.find((c) => c._id.toString() === commentId);
      console.log("Comment's authorId:", comment?.authorId);

      if (!comment || comment.authorId !== userId) {
        return res
          .status(403)
          .json({ error: "Not authorized to delete this comment" });
      }

      const updatedPost = await BlogPost.findByIdAndUpdate(
        id,
        { $pull: { comments: { _id: commentId } } },
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
