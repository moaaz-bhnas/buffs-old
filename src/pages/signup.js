import Layout from "../containers/layout/Layout";
import SignUpForm from "../containers/signup/SignUp";
import { getProviders, getSession } from "next-auth/client";

const SignUp = ({ providers }) => {
  console.log("providers: ", providers);

  return (
    <Layout>
      <Head>
        <title>Sign Up</title>
      </Head>

      <SignUpForm providers={providers} />
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  const providers = await getProviders();
  return {
    props: { providers },
  };
}

export default SignUp;
