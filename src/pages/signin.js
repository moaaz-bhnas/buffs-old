import Layout from "../containers/layout/Layout";
import SignIn from "../containers/signin/SignIn";
import { getProviders } from "next-auth/client";

const Signin = ({ providers }) => {
  console.log("providers: ", providers);

  return (
    <Layout>
      <SignIn providers={providers} />
    </Layout>
  );
};

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}

export default Signin;
