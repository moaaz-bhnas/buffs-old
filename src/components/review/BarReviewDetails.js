import { memo, useState } from "react";
import styled from "styled-components";
import Rating from "./Rating";
import PropTypes from "prop-types";
import truncateText from "../../utils/helpers/truncateText";
import { rawButton } from "../../utils/style";

const Container = styled.div`
  .review__star {
    margin-right: 0.2rem;
  }
`;

const WriteUp = styled.p`
  margin-bottom: 0;
`;

const Button = styled.button`
  ${rawButton};
  display: inline;
  padding-right: 0;
  padding-left: 0;
  color: ${({ theme }) => theme.text.link};

  &:hover {
    text-decoration: underline;
  }
`;

const ReviewDetails = ({ rating, writeUp }) => {
  const [textTruncated, setTextTruncated] = useState(true);

  return (
    <Container>
      <Rating rating={rating} />

      <WriteUp>
        {textTruncated ? truncateText(writeUp) : writeUp}{" "}
        {textTruncated && (
          <Button type="button" onClick={() => setTextTruncated(false)}>
            Read more
          </Button>
        )}
      </WriteUp>
    </Container>
  );
};

ReviewDetails.propTypes = {
  writeUp: PropTypes.string,
  rating: PropTypes.number,
};

export default memo(ReviewDetails);
