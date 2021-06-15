import { memo } from "react";
import styled, { css } from "styled-components";
import { inputStyles, shadows } from "../../utils/style";
import user from "../../utils/data/user";
import PropTypes from "prop-types";

const successStyles = css`
  outline: none;
  box-shadow: ${shadows.input.success};
`;

const StyledInput = styled.input`
  ${inputStyles}
  border: none;
  width: 100%;
  padding: 0.75em;
  ${({ valid }) => valid && successStyles}
`;

const Input = ({ query, setQuery, setExpanded, valid }) => {
  return (
    <StyledInput
      valid={valid}
      aria-label={`what did you watch today, ${user.name}?`}
      placeholder={`What did you watch today, ${user.name}?`}
      list="review__results"
      value={query}
      onChange={({ target: { value } }) => setQuery(value)}
      onFocus={() => setExpanded(true)}
    />
  );
};

Input.propTypes = {
  query: PropTypes.string,
  setQuery: PropTypes.func,
  setExpanded: PropTypes.func,
  valid: PropTypes.bool,
};

export default memo(Input);
