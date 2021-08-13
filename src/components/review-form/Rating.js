import { memo } from "react";
import styled from "styled-components";
import ReactStars from "react-rating-stars-component";
import PropTypes from "prop-types";
import Image from "next/image";
import { mediaQueries } from "../../utils/style";
import Star from "../star/Star";

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

const P = styled.p`
  margin: 0 0.5em 0 0;
  font-weight: bold;

  // To match stars height
  height: 48px;
  display: flex;
  align-items: center;

  @media screen and (max-width: ${mediaQueries.reviewForm.rating}) {
    display: none;
  }
`;

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
