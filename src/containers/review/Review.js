import { memo } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledReview = styled.li``;

const Review = ({ review }) => {
  return <StyledReview>{review._id}</StyledReview>;
};

Review.propTypes = {
  review: PropTypes.object,
};

export default memo(Review);
