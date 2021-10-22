import { memo, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import StarSvg from "../svgs/Star";
import { decideRatingColor } from "../../utils/style";

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
  // useEffect(() => {
  //   console.log("rating changed");
  // }, [rating]);

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
