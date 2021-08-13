import { memo } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Star from "../star/Star";

const StyledRating = styled.div`
  display: flex;
  align-items: center;
`;

const P = styled.p`
  margin: 0;
  margin-left: 0.35rem;
  font-weight: bold;
`;

const Rating = ({ rating }) => {
  return (
    <StyledRating>
      <Star state="filled" height={20} />
      <P>{rating}</P>
    </StyledRating>
  );
};

Rating.propTypes = {
  rating: PropTypes.number,
};

export default memo(Rating);
