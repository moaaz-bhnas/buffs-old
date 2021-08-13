import { memo } from "react";
import styled from "styled-components";
import { offScreen } from "../../utils/style";
import PropTypes from "prop-types";
import List from "../reviews-list/ReviewsList";

const StyledFeed = styled.section``;

const Title = styled.h2`
  ${offScreen}
`;

const Feed = ({ reviews }) => {
  return (
    <StyledFeed>
      <Title>Feed</Title>

      <List reviews={reviews} />
    </StyledFeed>
  );
};

Feed.propTypes = {
  reviews: PropTypes.array,
};

export default memo(Feed);
