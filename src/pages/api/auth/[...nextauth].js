import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { updateUserWithUsername } from "../../../db";
import generateUniqueUsername from "../../../utils/helpers/generateUniqueUsername";

const options = {
  providers: [
    Providers.Twitter({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET,
    }),
  ],
  database: process.env.MONGODB_URI,
  pages: {
    signIn: "/signin",
    signUp: "/signup",
  },
  callbacks: {
    async session(session, user) {
      session.user.id = user.id;
      return Promise.resolve(session);
    },
  },
  events: {
    async createUser(user) {
      console.log("user: ", user, user.name);
      const { usernameParts, username } = await generateUniqueUsername(
        user.name
      );
      updateUserWithUsername(user.id, usernameParts, username);
    },
  },
};

export default (req, res) => NextAuth(req, res, options);
