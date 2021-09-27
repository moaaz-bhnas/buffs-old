import { memo } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import StarSvg from "../svgs/Star";

const decideRatingColor = ({ rating, theme }) => {
  const { rating1, rating2, rating3, rating4, rating5 } = theme.text;
  return rating >= 9
    ? rating5
    : rating >= 7
    ? rating4
    : rating >= 5
    ? rating3
    : rating >= 3
    ? rating2
    : rating1;
};

const StyledRating = styled.div`
  display: flex;
  align-items: center;
  color: ${decideRatingColor};

  .svg {
    width: 20px;
    fill: ${decideRatingColor};
  }
`;

const P = styled.p`
  font-size: 1.05rem;
  margin: 0;
  margin-left: 0.35rem;
  font-weight: bold;
`;

const Rating = ({ rating }) => {
  return (
    <StyledRating rating={rating}>
      <StarSvg />
      <P>{rating}</P>
    </StyledRating>
  );
};

Rating.propTypes = {
  rating: PropTypes.number,
};

export default memo(Rating);
