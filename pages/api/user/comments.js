import dbConnect from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";

export default async function handler(req, res) {
  const { userId } = req.query;

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  await dbConnect();

  try {
    // Finde Kommentare, die dem Benutzer gehören
    const posts = await BlogPost.find({ "comments.authorId": userId })
      .select("comments title _id")
      .lean();

    // Extrahiere nur die Kommentare, die dem Benutzer gehören
    const userComments = posts.flatMap((post) =>
      post.comments
        .filter((comment) => comment.authorId === userId)
        .map((comment) => ({
          ...comment,
          postId: post._id,
          postTitle: post.title,
        }))
    );

    res.status(200).json(userComments);
  } catch (error) {
    console.error("Error fetching user comments:", error);
    res.status(500).json({ message: "Error fetching user comments" });
  }
}
