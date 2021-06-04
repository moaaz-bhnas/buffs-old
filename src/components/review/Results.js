import { memo } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledResults = styled.datalist``;

const Result = styled.option``;

const Results = ({ results }) => {
  return (
    <StyledResults id="review__results">
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
