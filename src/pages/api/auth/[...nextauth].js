import NextAuth from "next-auth";
import Providers from "next-auth/providers";

const options = {
  providers: [
    Providers.Twitter({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET,
      profile(profile) {
        return {
          id: profile.id_str,
          name: profile.name,
          email: profile.email,
          image: profile.profile_image_url_https.replace(
            /_normal\.(jpg|png|gif)$/,
            ".$1"
          ),
          profile: profile,
        };
      },
    }),
  ],
  database: process.env.MONGODB_URI,
  pages: {
    signIn: "/signin",
    signUp: "/signup",
  },
  callbacks: {
    session: async (session, user) => {
      session.user.id = user.id;
      return Promise.resolve(session);
    },
  },
};

export default (req, res) => NextAuth(req, res, options);
