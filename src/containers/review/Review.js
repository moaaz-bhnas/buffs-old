import { memo } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import MovieDetails from "../../components/review/MovieDetails";
import { cardStyles } from "../../utils/style";
import ReviewDetails from "../../components/review/ReviewDetails";

const StyledReview = styled.li`
  margin-bottom: 1rem;
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
  console.log("review: ", review);

  const { movieDetails, rating, writeUp } = review;

  return (
    <StyledReview>
      <Article>
        <MovieDetails movieDetails={movieDetails} />

        <Hr />

        <ReviewDetails rating={rating} writeUp={writeUp} />
      </Article>
    </StyledReview>
  );
};

Review.propTypes = {
  review: PropTypes.object,
};

export default memo(Review);
