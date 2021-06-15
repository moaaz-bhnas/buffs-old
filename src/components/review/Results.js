import { memo } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import dateToYear from "../../utils/helpers/dateToYear";
import movieNameWithReleaseYear from "../../utils/helpers/movieNameWithReleaseDate";

const StyledResults = styled.datalist``;

const Result = styled.option``;

const Results = ({ results }) => {
  return (
    <StyledResults id="review__results">
      {results.map(({ title, release_date }, index) => (
        <Result
          key={index}
          value={movieNameWithReleaseYear(title, dateToYear(release_date))}
        />
      ))}
    </StyledResults>
  );
};

Results.propTypes = {
  results: PropTypes.array,
};

export default memo(Results);
