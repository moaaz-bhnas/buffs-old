import { memo } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { AnimatePresence, motion } from "framer-motion";
import { visibilityVariants } from "../../utils/animation";

const StyledOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
`;

const Overlay = ({ expanded, setExpanded }) => {
  return (
    <AnimatePresence>
      {expanded && (
        <StyledOverlay
          variants={visibilityVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          aria-hidden="true"
          onClick={() => setExpanded(false)}
        />
      )}
    </AnimatePresence>
  );
};

Overlay.propTypes = {
  expanded: PropTypes.bool,
  // reset: PropTypes.func,
  setExpanded: PropTypes.func,
  // setSelectedMovie: PropTypes.func,
};

export default memo(Overlay);
