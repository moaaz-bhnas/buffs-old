import { memo } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { AnimatePresence, motion } from "framer-motion";
import { visibilityVariants } from "../../utils/animation";
import { overlays } from "../../utils/style";

const StyledOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${overlays.review.default};
  z-index: ${({ zIndex }) => zIndex};
`;

const Overlay = ({ expanded, close, zIndex = 2 }) => {
  return (
    <AnimatePresence>
      {expanded && (
        <StyledOverlay
          zIndex={zIndex}
          variants={visibilityVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          aria-hidden="true"
          onClick={close}
        />
      )}
    </AnimatePresence>
  );
};

Overlay.propTypes = {
  expanded: PropTypes.bool,
  close: PropTypes.func,
  zIndex: PropTypes.number,
};

export default memo(Overlay);
