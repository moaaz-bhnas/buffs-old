import { forwardRef, memo } from "react";
import styled from "styled-components";
// import ReactStars from "react-rating-stars-component";
import ReactStars from "../../containers/react-stars/ReactStars";
import PropTypes from "prop-types";
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

const StarContainer = styled.div`
  height: 48px;
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

const Icon = ({ state }) => {
  return (
    <StarContainer>
      <Star state={state} height={28} />
    </StarContainer>
  );
};

const Rating = forwardRef(({ rating, setRating, className = "" }, ref) => {
  return (
    <StyledRating>
      <P>Rate: </P>
      <ReactStars
        classNames={className}
        count={10}
        emptyIcon={<Icon state="empty" />}
        filledIcon={<Icon state="filled" />}
        value={rating}
        onChange={(newRating) => setRating(newRating)}
        ref={ref}
      />
    </StyledRating>
  );
});

Rating.propTypes = {
  className: PropTypes.string,
  rating: PropTypes.number,
  setRating: PropTypes.func,
};

export default memo(Rating);
