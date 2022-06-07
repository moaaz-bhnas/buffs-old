import Head from "next/head";
import { useRouter } from "next/dist/client/router";
import Layout from "../../containers/layout/Layout";
import FormContainer from "../../containers/review-form/ReviewForm";
import Form from "../../containers/review-form/containers/MobileEdit";
import { getSession } from "next-auth/client";
import { readReview } from "../../db/crud-operations/review";
import toJson from "../../utils/helpers/toJson";

const EditReview = ({ review }) => {
  console.log("review: ", review);
  const { _id: reviewId, movieDetails, rating, writeUp } = review;

  return (
    <Layout returnable returnableTitle="Edit Review">
      <Head>
        <title>Edit Review | Buffs</title>
      </Head>

      <FormContainer
        editable
        reviewToEdit={{ reviewId, movieDetails, rating, writeUp }}
      >
        {(props) => <Form {...props} />}
      </FormContainer>
    </Layout>
  );
};

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

  const { reviewId } = context.query;
  const review = await readReview(reviewId);

  return {
    props: {
      session,
      review: toJson(review),
    },
  };
}

export default EditReview;
