import { memo, useCallback } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import MovieDetails from "../../components/review/BarMovieDetails";
import { cardStyles } from "../../utils/style";
import ReviewDetails from "../../components/review/BarReviewDetails";
import UserDetails from "../../components/review/BarUserDetails";
import ReactionBar from "../../components/review/BarReaction";
import { useSession } from "next-auth/client";

const StyledReview = styled.li`
  margin-bottom: 1.25rem;
`;

const Article = styled.article`
  ${cardStyles}
`;

const Hr = styled.hr`
  border: none;
  height: 1px;
  background-color: ${({ theme }) => theme.bg.grey2};
  margin: 1rem 0;
`;

const Review = ({ review }) => {
  // console.log("review: ", review);

  const {
    _id: reviewId,
    userDetails,
    movieDetails,
    rating,
    writeUp,
    timestamp,
    lovers,
  } = review;

  const [session] = useSession();

  const toggleLover = useCallback(async () => {
    const userId = session.user.id;
    const loved = lovers.includes(session.user.id);

    const res = await fetch("http://localhost:3000/api/review", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: loved ? "unlove" : "love",
        data: { reviewId, userId },
      }),
    });

    const { modifiedCount } = await res.json();
    console.log("modifiedCount: ", modifiedCount);
  }, []);

  return (
    <StyledReview>
      <Article>
        <UserDetails userDetails={userDetails} timestamp={timestamp} />

        <MovieDetails movieDetails={movieDetails} />

        <Hr />

        <ReviewDetails rating={rating} writeUp={writeUp} />

        <Hr />

        <ReactionBar
          toggleLover={toggleLover}
          loved={session && lovers.includes(session.user.id)}
        />
      </Article>
    </StyledReview>
  );
};

Review.propTypes = {
  review: PropTypes.object,
};

export default memo(Review);
