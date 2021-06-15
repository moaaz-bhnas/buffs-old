import { memo } from "react";
import styled from "styled-components";
import { inputStyles } from "../../utils/style";
import PropTypes from "prop-types";

const TestArea = styled.textarea`
  ${inputStyles}
  border: none;
  padding: 0.4em;

  flex: 1;
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
