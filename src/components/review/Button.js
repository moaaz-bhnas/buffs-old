import { motion } from "framer-motion";
import { forwardRef, memo } from "react";
import styled from "styled-components";
import { visibilityVariants } from "../../utils/animation";
import { rawButton, sizes } from "../../utils/style";
import PropTypes from "prop-types";

const StyledButton = styled(motion.button)`
  ${rawButton}
  font-weight: 500;
  color: #fff;
  background-color: ${({ theme }) => theme.bg.dark};
  display: block;
  width: 100%;
  padding: 0.5em;
  border-radius: ${sizes.borderRadius.default};

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5 !important;
  }
`;

const Button = forwardRef(({ disabled }, ref) => {
  return (
    <StyledButton
      ref={ref}
      type="submit"
      disabled={disabled}
      variants={visibilityVariants}
      initial="hidden"
      animate="visible"
    >
      Submit
    </StyledButton>
  );
});

Button.propTypes = {
  disabled: PropTypes.bool,
};

export default memo(Button);
