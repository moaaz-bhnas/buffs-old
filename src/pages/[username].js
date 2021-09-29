import { getSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import Layout from "../containers/layout/Layout";

export default function Profile({ session, reviews }) {
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
}
