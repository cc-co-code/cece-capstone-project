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
  } else if (req.method === "GET") {
    const { userId } = req.query;

    try {
      const user = await Users.findOne({ userId });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Error fetching user." });
    }
  } else {
    res.setHeader("Allow", ["POST", "GET"]);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
