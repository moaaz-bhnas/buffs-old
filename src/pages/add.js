import Layout from "../containers/layout/Layout";
import { getSession } from "next-auth/client";
import Review from "../containers/review/Review";

export default function Add({ session }) {
  return (
    <Layout>
      <Review className="add__review" />
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
