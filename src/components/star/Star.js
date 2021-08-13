import Image from "next/image";
import { memo } from "react";
import styled from "styled-components";
import { mediaQueries } from "../../utils/style";
import PropTypes from "prop-types";

const starContainerHeight = 48;
const starHeight = 28;

const StyledStar = styled.div`
  height: ${starContainerHeight}px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: ${mediaQueries.reviewForm.rating}) {
    > div {
      width: 25px !important;
      height: 25px !important;
    }
  }
`;

const Star = ({ state }) => {
  return (
    <StyledStar>
      <Image
        className="review__star"
        src={`/images/star-${state}.svg`}
        alt={`${state} star`}
        layout="fixed"
        width={starHeight}
        height={starHeight}
        quality={100}
      />
    </StyledStar>
  );
};

Star.propTypes = {
  state: PropTypes.string,
};

export default memo(Star);
