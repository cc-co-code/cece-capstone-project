import dbConnect from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";

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
  }
  if (req.method === "POST") {
    // const session = await getSession({ req });
    // console.log(session, "session");
    // if (!session) {
    //   return res.status(401).json({ error: "Not authenticated" });
    // }

    console.log(req.body);
    const { blogPost, session } = req.body;
    const { title, content, city, year, age } = blogPost;

    try {
      const newPost = new BlogPost({
        title,
        content,
        city,
        year,
        age,
        authorId: session.user.userId,
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
