import { forwardRef, memo } from "react";
import Image from "next/image";
import styled from "styled-components";
import PropTypes from "prop-types";
import { rawButton, transitions } from "../../utils/style";
import Icon from "./Icon";

const Button = styled.button`
  ${rawButton}

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0.8rem;
  margin-top: -0.6rem;
  border-radius: 50%;

  transition: background-color ${transitions.bg.default};

  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.bg.grey1};
  }
`;

const Toggler = forwardRef(({ expanded, setExpanded }, ref) => {
  return (
    <Button
      type="button"
      aria-label="Show actions on this review"
      aria-haspopup="true"
      aria-expanded={expanded}
      onClick={() => setExpanded(!expanded)}
      onMouseDown={(event) => event.preventDefault()}
      tabIndex={expanded ? -1 : 0}
      ref={ref}
    >
      <Icon />
    </Button>
  );
});

Toggler.propTypes = {
  expanded: PropTypes.bool,
  setExpanded: PropTypes.func,
};

export default memo(Toggler);
