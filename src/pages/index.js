import Layout from "../containers/layout/Layout";
import Review from "../containers/review-form/Review";
import Form from "../containers/review-form/containers/Default";
import { getSession } from "next-auth/client";
import getReviews from "../utils/helpers/getReviews";
import Feed from "../containers/feed/Feed";

export default function Home({ session, reviews }) {
  console.log("reviews: ", reviews);

  return (
    <Layout>
      <Review>{(props) => <Form {...props} />}</Review>

      <Feed reviews={reviews} />
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
