import { forwardRef, memo } from "react";
import Image from "next/image";
import styled from "styled-components";
import PropTypes from "prop-types";
import { rawButton, transitions } from "../../utils/style";

const StyledButton = styled.button`
  ${rawButton}
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.bg.grey1};

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;

  transition: background-color ${transitions.bg.default};

  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.bg.grey2};
  }
`;

const Button = forwardRef(({ close }, ref) => {
  return (
    <StyledButton
      type="button"
      aria-label="Close modal"
      onClick={close}
      ref={ref}
    >
      <Image
        src="/images/close.svg"
        alt=""
        width={20}
        height={20}
        layout="fixed"
        quality={100}
      />
    </StyledButton>
  );
});

Button.propTypes = {
  close: PropTypes.func,
};

export default memo(Button);
