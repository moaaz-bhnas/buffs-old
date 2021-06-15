import { motion } from "framer-motion";
import { memo } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { visibilityVariants } from "../../utils/animation";

const StyledTitle = styled(motion.h2)`
  font-size: 1.15rem;
  padding: 0 1rem 0.8rem;
  border-bottom: 1px solid ${({ theme }) => theme.border.grey2};
  margin: 0 -1rem 0.8rem;
`;

const Title = ({ expanded }) => {
  return (
    <>
      {expanded && (
        <StyledTitle
          layout
          variants={visibilityVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          Review Movie
        </StyledTitle>
      )}
    </>
  );
};

Title.propTypes = {
  expanded: PropTypes.bool,
};

export default memo(Title);
