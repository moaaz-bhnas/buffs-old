import Layout from "../containers/layout/Layout";
import Review from "../containers/review/Review";
import { getSession } from "next-auth/client";
import getReviews from "../utils/helpers/getReviews";

export default function Home({ session, reviews }) {
  console.log("reviews: ", reviews);

  return (
    <Layout>
      <Review className="home__review" />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/signin",
      },
    };
  }

  const reviews = await getReviews({ skip: 0, limit: 20 });

  return {
    props: {
      session,
      reviews,
    },
  };
}
