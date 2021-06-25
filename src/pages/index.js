import Layout from "../containers/layout/Layout";
import Review from "../containers/review/Review";
import { connectToDatabase } from "../db/dbConnect";
import { signIn, signOut, useSession } from "next-auth/client";

export default function Home({}) {
  const [session, loading] = useSession();

  return (
    <Layout>
      <Review />

      {!session ? (
        <button onClick={signIn}>Sign In</button>
      ) : (
        <>
          Signed in as {session.user.email}{" "}
          <button onClick={signOut}>Sign Out</button>
        </>
      )}
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { db } = await connectToDatabase();

  // const movies = await db
  //   .collection("movies")
  //   .find()
  //   .sort({ _id: 1 })
  //   .limit(10)
  //   .toArray();

  // const names = movies.map((movie) => movie.name);

  return {
    props: {
      // names
    },
  };
}
