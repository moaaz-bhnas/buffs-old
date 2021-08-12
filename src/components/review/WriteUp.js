import { memo } from "react";
import styled from "styled-components";
import { inputStyles, mediaQueries } from "../../utils/style";
import PropTypes from "prop-types";

const TestArea = styled.textarea`
  ${inputStyles}
  border: none;
  padding: 0.4em;

  flex: 1;

  @media screen and (max-width: ${mediaQueries.reviewForm.row}) {
    min-height: 7.5rem;
  }
`;

const WriteUp = ({ writeUp, setWriteUp }) => {
  return (
    <TestArea
      aria-label="Your review"
      placeholder="How do you feel about this movie?"
      value={writeUp}
      onChange={({ target: { value } }) => setWriteUp(value)}
    />
  );
};

WriteUp.propTypes = {
  writeUp: PropTypes.string,
  setWriteUp: PropTypes.func,
};

export default memo(WriteUp);
