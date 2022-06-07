import Head from "next/head";
import Layout from "../containers/layout/Layout";
import { getSession } from "next-auth/client";

export default function Notifications({ session }) {
  return (
    <Layout>
      <Head>
        <title>Notifications | Buffs</title>
      </Head>
      Notifications
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
