import { memo, useCallback } from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { inputStyles, mediaQueries } from "../../utils/style";

const inactiveStyles = css`
  padding: 0;
  width: 0;
`;

const StyledInput = styled.input`
  ${inputStyles};
  border: none;
  background-color: transparent;
  padding: 0.6em;

  width: 100%;
  height: 100%;

  @media screen and (max-width: ${mediaQueries.search}) {
    ${({ active }) => (!active ? inactiveStyles : null)}
  }
`;

const Input = ({ active, setActive }) => {
  const handleKeyDown = useCallback(({ key }) => {
    if (key === "Tab") {
      setActive(false);
    }
  }, []);

  return (
    <StyledInput
      type="search"
      aria-label="search"
      placeholder="Search"
      active={active}
      onFocus={() => setActive(true)}
      onKeyDown={handleKeyDown}
      aria-expanded={active}
      aria-controls="header__searchDropdown"
    />
  );
};

Input.propTypes = {
  active: PropTypes.bool,
  setActive: PropTypes.func,
};

export default memo(Input);
