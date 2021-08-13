import { memo } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Row = styled.div``;

const Title = styled.h3``;

const MovieDetails = ({ movieDetails }) => {
  const { name, releaseYear } = movieDetails;

  return (
    <Row>
      <Title>
        {name} ({releaseYear})
      </Title>
    </Row>
  );
};

MovieDetails.propTypes = {
  movieDetails: PropTypes.object,
};

export default memo(MovieDetails);
