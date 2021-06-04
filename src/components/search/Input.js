import { memo, useCallback } from "react";
import styled from "styled-components";
import { mediaQueries, sizes } from "../../utils/style";
import PropTypes from "prop-types";

const inputWidth = 16;
const activeInputWidth = 20;
const smallInputWidth = 3.5;

const StyledInput = styled.input`
  width: ${({ active }) => (active ? activeInputWidth : inputWidth)}em;
  padding: 1.2em 0 1.2em ${smallInputWidth}em;
  border: none;
  border-radius: ${sizes.borderRadius.default};
  background-color: ${({ theme }) => theme.bg.default};
  transition-property: width;
  transition-duration: 0.4s;

  &::placeholder {
    color: ${({ theme }) => theme.text.grey};
    font-size: 0.95rem;
  }

  &:focus {
    &::placeholder {
      color: #999;
    }
  }

  @media screen and (max-width: ${mediaQueries.search}) {
    cursor: ${({ active }) => (active ? "text" : "pointer")};
    width: ${({ active }) => (active ? "100%" : `${smallInputWidth}em`)};
    transition-duration: 0s;
  }
`;

const Input = ({ active, setActive }) => {
  const handleKeyDown = useCallback(({ key, shiftKey }) => {
    if (key === "Tab" && !shiftKey) {
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
