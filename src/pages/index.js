import Layout from "../containers/layout/Layout";
import Review from "../containers/review/Review";
import { getSession } from "next-auth/client";

export default function Home({ session }) {
  return (
    <Layout>
      <Review />
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
