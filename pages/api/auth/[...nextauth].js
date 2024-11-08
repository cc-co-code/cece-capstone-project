import NextAuth from "next-auth/next";
import EmailProvider from "next-auth/providers/email";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import dbConnect from "@/lib/mongodb";

export default NextAuth({
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
  adapter: MongoDBAdapter(
    dbConnect().then((mongoose) => mongoose.connection.getClient())
  ), // Verbindung an den Adapter weitergeben
});
