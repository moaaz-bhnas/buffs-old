import { memo } from "react";
import styled from "styled-components";
import Rating from "./Rating";
import PropTypes from "prop-types";

const Container = styled.div`
  .review__star {
    margin-right: 0.2rem;
  }
`;

const WriteUp = styled.p`
  margin-bottom: 0;
`;

const ReviewDetails = ({ rating, writeUp }) => {
  return (
    <Container>
      <Rating rating={rating} />

      <WriteUp>{writeUp}</WriteUp>
    </Container>
  );
};

ReviewDetails.propTypes = {
  writeUp: PropTypes.string,
  rating: PropTypes.number,
};

export default memo(ReviewDetails);
