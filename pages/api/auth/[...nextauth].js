import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import dbConnect from "@/lib/mongodb";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  adapter: MongoDBAdapter(
    dbConnect().then((mongoose) => mongoose.connection.getClient())
  ),
  callbacks: {
    async session({ session, user }) {
      session.user.userId = user.id;
      return session;
    },
  },
});
