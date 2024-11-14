import dbConnect from "@/lib/mongodb";
import Users from "@/models/Users";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    const { userId, username } = req.body;

    try {
      const user = await Users.findOneAndUpdate(
        { userId },
        { username },
        { upsert: true, new: true }
      );
      res.status(200).json(user);
    } catch (error) {
      console.error("Error updating username:", error);
      res.status(500).json({ message: "Error updating username." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
