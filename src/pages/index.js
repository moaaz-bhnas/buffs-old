import styled from "styled-components";
import Layout from "../containers/layout/Layout";
import Review from "../containers/review/Review";
import { connectToDatabase } from "../db/dbConnect";

const Title = styled.h2``;

export default function Home({}) {
  return (
    <Layout>
      <Review />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { db } = await connectToDatabase();

  // const movies = await db
  //   .collection("movies")
  //   .find()
  //   .sort({ _id: 1 })
  //   .limit(10)
  //   .toArray();

  // const names = movies.map((movie) => movie.name);

  return {
    props: {
      // names
    },
  };
}
