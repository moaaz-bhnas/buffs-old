import Layout from "../containers/layout/Layout";
import SignUpForm from "../containers/signup/SignUp";
import { getProviders } from "next-auth/client";

const SignUp = ({ providers }) => {
  console.log("providers: ", providers);

  return (
    <Layout>
      <SignUpForm providers={providers} />
    </Layout>
  );
};

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}

export default SignUp;
