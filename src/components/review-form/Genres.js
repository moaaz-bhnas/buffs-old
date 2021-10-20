import { memo } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledGenres = styled.p`
  margin: 0 0 0.5rem;
  color: ${({ theme }) => theme.text.grey};
`;

const Genres = ({ genres }) => {
  return <StyledGenres>{genres}</StyledGenres>;
};

Genres.propTypes = {
  genres: PropTypes.string,
};

export default memo(Genres);
