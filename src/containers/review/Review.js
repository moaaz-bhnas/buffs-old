import { memo } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import MovieDetails from "../../components/review/BarMovieDetails";
import { cardStyles } from "../../utils/style";
import ReviewDetails from "../../components/review/BarReviewDetails";
import UserDetails from "../../components/review/BarUserDetails";
import ReactionBar from "../../components/review/BarReaction";

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

  const { userDetails, movieDetails, rating, writeUp, timestamp } = review;

  return (
    <StyledReview>
      <Article>
        <UserDetails userDetails={userDetails} timestamp={timestamp} />

        <MovieDetails movieDetails={movieDetails} />

        <Hr />

        <ReviewDetails rating={rating} writeUp={writeUp} />

        <Hr />

        <ReactionBar />
      </Article>
    </StyledReview>
  );
};

Review.propTypes = {
  review: PropTypes.object,
};

export default memo(Review);
