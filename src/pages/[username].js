import styled from "styled-components";
import Layout from "../containers/layout/Layout";
import ReviewsList from "../containers/reviews-list/ReviewsList";
import { readUserReviews } from "../db/crud-operations/review";
import { readUser } from "../db/crud-operations/user";
import toJson from "../utils/helpers/toJson";
import { offScreen } from "../utils/style";

const Username = styled.h2`
  text-transform: capitalize;
  font-weight: 300;
  margin-bottom: 2rem;
`;

const Section = styled.section``;

const Subtitle = styled.h2`
  ${offScreen}
`;

export default function Profile({ user, reviews }) {
  console.log("user: ", user);

  return (
    <Layout>
      <Username>{user && user.name}</Username>

      <Section>
        <Subtitle>Reviews</Subtitle>
        {reviews && <ReviewsList reviews={reviews} />}
      </Section>
    </Layout>
  );
}

export async function getStaticPaths(context) {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const { username } = context.params;
  // user data
  const user = await readUser(username);
  // user reviews
  const reviews = await readUserReviews({ username });

  return {
    props: {
      user: toJson(user),
      reviews: toJson(reviews),
    },
    revalidate: 60,
  };
}
