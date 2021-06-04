import styled from "styled-components";
import Layout from "../containers/layout/Layout";
import Review from "../containers/review/Review";

const Title = styled.h2``;

export default function Home() {
  return (
    <Layout>
      <Review />
    </Layout>
  );
}
