import { memo } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import MovieDetails from "../../components/review/MovieDetails";

const StyledReview = styled.li``;

const Article = styled.article``;

const Review = ({ review }) => {
  console.log("review: ", review);

  const { movieDetails, rating, writeUp } = review;

  return (
    <StyledReview>
      <Article>
        <MovieDetails movieDetails={movieDetails} />
      </Article>
    </StyledReview>
  );
};

Review.propTypes = {
  review: PropTypes.object,
};

export default memo(Review);
