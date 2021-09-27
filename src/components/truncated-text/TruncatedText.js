import { memo, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { rawButton } from "../../utils/style";

const Text = styled.p``;

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

const TruncatedText = ({ className, text, wordsNumber = 26 }) => {
  const textArray = text.split(" ");
  const overflowing = textArray.length > wordsNumber;

  const [truncated, setTruncated] = useState(overflowing);
  const truncatedText = truncated
    ? textArray.slice(0, wordsNumber).join(" ") + "..."
    : text;

  return (
    <Text className={className}>
      {truncatedText}{" "}
      {truncated && (
        <Button type="button" onClick={() => setTruncated(false)}>
          Read more
        </Button>
      )}
    </Text>
  );
};

TruncatedText.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
  wordsNumber: PropTypes.number,
};

export default memo(TruncatedText);
