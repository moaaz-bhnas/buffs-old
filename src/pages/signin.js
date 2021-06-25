import Layout from "../containers/layout/Layout";
import SignInForm from "../containers/signin/SignIn";
import { getProviders, getSession } from "next-auth/client";

const SignIn = ({ providers }) => {
  console.log("providers: ", providers);

  return (
    <Layout>
      <SignInForm providers={providers} />
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

export default SignIn;
