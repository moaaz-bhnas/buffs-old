import Layout from "../containers/layout/Layout";
import { getSession } from "next-auth/client";

export default function Account({ session }) {
  return <Layout>Account</Layout>;
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
