import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { getUsername, updateUserWithUsername } from "../../../db";
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
      const { id } = user;

      const username = await getUsername(id);

      session.user.id = id;
      session.user.username = username;
      return Promise.resolve(session);
    },
  },
  events: {
    async createUser(user) {
      console.log("createUser - user: ", user);

      const { usernameParts, username } = await generateUniqueUsername(
        user.name
      );
      user.username = username;
      updateUserWithUsername(user.id, usernameParts, username);
    },
  },
};

export default (req, res) => NextAuth(req, res, options);
