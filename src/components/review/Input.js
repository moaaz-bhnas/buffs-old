import { memo, useCallback } from "react";
import styled from "styled-components";
import { inputStyles } from "../../utils/style";
import user from "../../utils/data/user";
import PropTypes from "prop-types";

const StyledInput = styled.input`
  ${inputStyles}
  border: none;
  width: 100%;
  padding: 0.75em;
`;

const Input = ({ query, setQuery }) => {
  return (
    <StyledInput
      aria-label={`what did you watch today, ${user.name}?`}
      placeholder={`What did you watch today, ${user.name}?`}
      list="review__results"
      value={query}
      onChange={({ target: { value } }) => setQuery(value)}
    />
  );
};

Input.propTypes = {
  query: PropTypes.string,
  setQuery: PropTypes.func,
  results: PropTypes.array,
  setSelectedMovie: PropTypes.func,
};

export default memo(Input);
