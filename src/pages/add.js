import Head from "next/head";
import Layout from "../containers/layout/Layout";
import { getSession } from "next-auth/client";
import Review from "../containers/review-form/ReviewForm";
import Form from "../containers/review-form/containers/Mobile";

export default function Add({ session }) {
  return (
    <Layout returnable returnableTitle="Add Review">
      <Head>
        <title>Add Review | Buffs</title>
      </Head>

      <Review>{(props) => <Form {...props} />}</Review>
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

  return {
    props: {
      session,
    },
  };
}
