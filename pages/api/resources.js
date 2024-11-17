import dbConnect from "@/lib/mongodb";
import Resources from "@/models/Resources";
export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const resources = await Resources.find();
      res.status(200).json(resources);
    } catch (error) {
      console.error("Error fetching resources:", error.message);
      res.status(500).json({ message: error.message });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
