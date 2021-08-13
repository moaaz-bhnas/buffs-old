import { memo } from "react";
import styled from "styled-components";
import { rawList } from "../../utils/style";
import PropTypes from "prop-types";
import Review from "../review/Review";

const StyledList = styled.ul`
  ${rawList}
`;

const List = ({ reviews }) => {
  return (
    <StyledList>
      {reviews.map((review) => (
        <Review key={review._id} review={review} />
      ))}
    </StyledList>
  );
};

List.propTypes = {
  reviews: PropTypes.array,
};

export default memo(List);
