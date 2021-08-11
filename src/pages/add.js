import Layout from "../containers/layout/Layout";
import { getSession } from "next-auth/client";
import Review from "../containers/review/Review";
import Form from "../containers/review/containers/Mobile";

export default function Add({ session }) {
  return (
    <Layout>
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
