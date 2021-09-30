import { useRouter } from "next/dist/client/router";
import Layout from "../containers/layout/Layout";
import { readUserReviews } from "../db/crud-functions/review";
import toJson from "../utils/helpers/toJson";

export default function Profile({ session, reviews }) {
  // console.log("reviews: ", reviews);

  const router = useRouter();
  const { username } = router.query;

  return <Layout>{username}</Layout>;
}

export async function getStaticPaths(context) {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { username } = params;

  const reviews = await readUserReviews({ username });

  return {
    props: {
      reviews: toJson(reviews),
    },
    revalidate: 60,
  };
}
