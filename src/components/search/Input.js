import { memo, useCallback } from "react";
import styled from "styled-components";
import { inputStyles, mediaQueries } from "../../utils/style";
import PropTypes from "prop-types";

const inputWidth = 16;
const activeInputWidth = 20;
const smallInputWidth = 3;

const StyledInput = styled.input`
  ${inputStyles}
  border: 1px solid ${({ theme }) => theme.border.grey2};
  width: ${({ active }) => (active ? activeInputWidth : inputWidth)}rem;
  padding: 0.6em 0 0.6em ${smallInputWidth}rem;
  transition-property: width;
  transition-duration: 0.4s;

  @media screen and (max-width: ${mediaQueries.search}) {
    cursor: ${({ active }) => (active ? "text" : "pointer")};
    width: ${({ active }) => (active ? "100%" : `${smallInputWidth}rem`)};
    height: 3rem;
    border-radius: 3rem;
    transition-duration: 0s;
  }
`;

const Input = ({ active, setActive }) => {
  const handleKeyDown = useCallback(({ key, shiftKey }) => {
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
