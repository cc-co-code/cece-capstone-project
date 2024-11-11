import NextAuth from "next-auth/next";
import EmailProvider from "next-auth/providers/email";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import dbConnect from "@/lib/mongodb";
import GoogleProvider from "next-auth/providers/google";

console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);
console.log("GOOGLE_CLIENT_SECRET:", process.env.GOOGLE_CLIENT_SECRET);

export default NextAuth({
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
    GoogleProvider({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent", // Zeigt jedes Mal eine Bestätigungsaufforderung an
          access_type: "offline", // Fordert einen Refresh Token an, damit die Sitzung aufrecht erhalten bleibt
          response_type: "code", // Spezifischer Response-Type für Authentifizierung
        },
      },
    }),
  ],
  adapter: MongoDBAdapter(
    dbConnect().then((mongoose) => mongoose.connection.getClient())
  ), // Verbindung an den Adapter weitergeben
});
