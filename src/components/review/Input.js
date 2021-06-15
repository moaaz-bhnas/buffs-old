import { forwardRef, memo } from "react";
import styled, { css } from "styled-components";
import { inputStyles, shadows } from "../../utils/style";
import user from "../../utils/data/user";

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

const Input = ({ query, setQuery, setExpanded, valid }, ref) => {
  return (
    <StyledInput
      ref={ref}
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

export default memo(forwardRef(Input));
