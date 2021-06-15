import { memo } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { AnimatePresence, motion } from "framer-motion";

const StyledOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;

const variants = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.15,
    },
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.15,
    },
  },
};

const Overlay = ({ expanded, reset }) => {
  return (
    <AnimatePresence>
      {expanded && (
        <StyledOverlay
          key="overlay"
          variants={variants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          aria-hidden="true"
          onClick={() => reset()}
        />
      )}
    </AnimatePresence>
  );
};

Overlay.propTypes = {
  expanded: PropTypes.bool,
  reset: PropTypes.func,
  // setExpanded: PropTypes.func,
  // setSelectedMovie: PropTypes.func,
};

export default memo(Overlay);
