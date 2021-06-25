import { forwardRef, memo } from "react";
import styled, { css } from "styled-components";
import { inputStyles, shadows } from "../../utils/style";
import { useSession } from "next-auth/client";

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
  const [session, loading] = useSession();

  const fullName = session.user.name;
  const firstName = fullName.split(" ")[0];

  return (
    <StyledInput
      ref={ref}
      valid={valid}
      aria-label={`what did you watch today, ${firstName}?`}
      placeholder={`What did you watch today, ${firstName}?`}
      list="review__results"
      value={query}
      onChange={({ target: { value } }) => setQuery(value)}
      onFocus={() => setExpanded(true)}
    />
  );
};

export default memo(forwardRef(Input));
