import dbConnect from "@/lib/mongodb"; // Verbindung zur Datenbank
import Resources from "@/models/Resources"; // Dein Resources-Modell

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const resources = await Resources.find(); // Alle Ressourcen abrufen
      res.status(200).json(resources);
    } catch (error) {
      console.error("Error fetching resources:", error.message);
      res.status(500).json({ message: error.message });
    }
  } else {
    res.setHeader("Allow", ["GET"]); // Nur GET erlaubt
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
