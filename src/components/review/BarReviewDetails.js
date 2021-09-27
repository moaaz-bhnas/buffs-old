import { memo } from "react";
import styled from "styled-components";
import Rating from "./Rating";
import PropTypes from "prop-types";
import TruncatedText from "../truncated-text/TruncatedText";

const Container = styled.div`
  .review__star {
    margin-right: 0.2rem;
  }

  .review__writeUp {
    margin-bottom: 0;
  }
`;

const ReviewDetails = ({ rating, writeUp }) => {
  return (
    <Container>
      <Rating rating={rating} />

      <TruncatedText className="review__writeUp" text={writeUp} />
    </Container>
  );
};

ReviewDetails.propTypes = {
  writeUp: PropTypes.string,
  rating: PropTypes.number,
};

export default memo(ReviewDetails);
