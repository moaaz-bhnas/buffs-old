import Layout from "../containers/layout/Layout";
import SignInForm from "../containers/signin/SignIn";
import { getProviders } from "next-auth/client";

const SignIn = ({ providers }) => {
  console.log("providers: ", providers);

  return (
    <Layout>
      <SignInForm providers={providers} />
    </Layout>
  );
};

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}

export default SignIn;
