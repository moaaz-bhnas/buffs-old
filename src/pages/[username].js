import Layout from "../containers/layout/Layout";
import ReviewsList from "../containers/reviews-list/ReviewsList";
import { readUserReviews } from "../db/crud-operations/review";
import { readUser } from "../db/crud-operations/user";
import toJson from "../utils/helpers/toJson";

export default function Profile({ user, reviews }) {
  console.log("user: ", user);

  return <Layout>{reviews && <ReviewsList reviews={reviews} />}</Layout>;
}

export async function getStaticPaths(context) {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const { username } = context.params;
  // user data
  const user = await readUser(username);
  // user reviews
  const reviews = await readUserReviews({ username });

  return {
    props: {
      user: toJson(user),
      reviews: toJson(reviews),
    },
    revalidate: 60,
  };
}
