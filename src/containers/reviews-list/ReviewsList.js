import { memo } from "react";
import styled from "styled-components";
import { mediaQueries, rawList } from "../../utils/style";
import PropTypes from "prop-types";
import Review from "../review/Review";

const StyledList = styled.ul`
  ${rawList}
  display: flex;
  flex-direction: column;

  @media screen and (max-width: ${mediaQueries.main}) {
    align-items: center;
  }
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
