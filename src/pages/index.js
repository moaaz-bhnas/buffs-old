import Layout from "../containers/layout/Layout";
import Review from "../containers/review-form/ReviewForm";
import Form from "../containers/review-form/containers/Default";
import { getSession, useSession } from "next-auth/client";
import Feed from "../containers/feed/Feed";
import { useCallback, useEffect, useState } from "react";
import Pusher from "pusher-js";
import toJson from "../utils/helpers/toJson";
import { readReviews } from "../db/crud-operations/review";

export default function Home({ session, reviews }) {
  const [liveReviews, setLiveReviews] = useState(reviews);

  const addReview = useCallback(
    (review) => {
      const reviewsCopy = [...liveReviews];
      reviewsCopy.unshift(review);
      setLiveReviews(reviewsCopy);
    },
    [liveReviews]
  );

  const updateReview = useCallback(
    (updatedReview) => {
      const reviewsCopy = liveReviews.map((review) => {
        if (review._id === updatedReview._id) {
          review = Object.assign(review, updatedReview);
          return review;
        }
        return review;
      });
      setLiveReviews(reviewsCopy);
    },
    [liveReviews]
  );

  const deleteReview = useCallback(
    (deletedId) => {
      const reviewCopy = liveReviews.filter(
        (review) => review._id !== deletedId
      );
      setLiveReviews(reviewCopy);
    },
    [liveReviews]
  );

  useEffect(
    function subscribeToPusher() {
      const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
        cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
        forceTLS: true,
      });

      const channel = pusher.subscribe("reviews");
      channel.bind("inserted", addReview);
      channel.bind("updated", updateReview);
      channel.bind("deleted", deleteReview);
    },
    [liveReviews]
  );

  return (
    <Layout>
      <Review>{(props) => <Form {...props} />}</Review>

      <Feed reviews={liveReviews} />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  // Add a listener and aria-live

  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/signin",
      },
    };
  }

  const reviews = await readReviews({ skip: 0, limit: 20 });

  return {
    props: {
      session,
      reviews: toJson(reviews),
    },
  };
}
