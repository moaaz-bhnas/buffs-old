import { memo } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

const StyledResults = styled(motion.datalist)``;

const Result = styled.option``;

const Results = ({ results }) => {
  return (
    <StyledResults layout id="review__results">
      {results.map((result, index) => (
        <Result key={index} value={result.title} />
      ))}
    </StyledResults>
  );
};

Results.propTypes = {
  results: PropTypes.array,
};

export default memo(Results);
