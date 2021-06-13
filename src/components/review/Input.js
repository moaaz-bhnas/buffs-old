import { memo } from "react";
import styled from "styled-components";
import { inputStyles, reviewContainerStyles } from "../../utils/style";
import user from "../../utils/data/user";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

const Container = styled.div`
  ${({ expanded }) => !expanded && reviewContainerStyles};
  margin-bottom: ${({ expanded }) => (expanded ? ".5em" : null)};
`;

const StyledInput = styled(motion.input)`
  ${inputStyles}
  border: none;
  width: 100%;
  padding: 0.75em;
`;

const Input = ({ query, setQuery, setExpanded, layoutId, expanded }) => {
  console.log("expanded: ", expanded);

  return (
    <Container expanded={expanded}>
      <StyledInput
        layoutId={layoutId}
        aria-label={`what did you watch today, ${user.name}?`}
        placeholder={`What did you watch today, ${user.name}?`}
        list="review__results"
        value={query}
        onChange={({ target: { value } }) => setQuery(value)}
        onFocus={() => setExpanded(true)}
      />
    </Container>
  );
};

Input.propTypes = {
  query: PropTypes.string,
  setQuery: PropTypes.func,
  expanded: PropTypes.bool,
  setExpanded: PropTypes.func,
  layoutId: PropTypes.string,
};

export default memo(Input);
