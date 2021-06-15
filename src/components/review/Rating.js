import { memo } from "react";
import styled from "styled-components";
import ReactStars from "react-rating-stars-component";
import PropTypes from "prop-types";
import Image from "next/image";

const StyledRating = styled.div`
  display: flex;
  align-items: flex-start;

  > div {
    flex: 1;
  }

  .react-stars {
    width: 100%;
    display: flex;

    > span {
      flex: 1;
    }
  }
`;

const starContainerHeight = 48;
const starHeight = 28;

const P = styled.p`
  margin: 0 0.5em 0 0;
  font-weight: bold;

  height: ${starContainerHeight}px;
  display: flex;
  align-items: center;
`;

const StyledStar = styled.div`
  height: ${starContainerHeight}px;
  display: flex;
  justify-content: center;
  align-items: center;
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

const Rating = ({ rating, setRating }) => {
  return (
    <StyledRating>
      <P>Rate: </P>
      <ReactStars
        count={10}
        emptyIcon={<Star state="empty" />}
        filledIcon={<Star state="filled" />}
        value={rating}
        onChange={(newRating) => setRating(newRating)}
      />
    </StyledRating>
  );
};

Rating.propTypes = {
  rating: PropTypes.number,
  setRating: PropTypes.func,
};

export default memo(Rating);
