import { memo } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Cover from "../cover/Cover";

const Row = styled.div`
  display: flex;
`;

const CoverContainer = styled.div`
  margin-right: 1rem;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  margin: 0 0 0.25rem 0;
  font-weight: normal;
`;

const Genres = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.text.grey};
`;

const MovieDetails = ({ movieDetails }) => {
  const { name, releaseYear, posterPath, genres } = movieDetails;

  return (
    <Row>
      <CoverContainer>
        <Cover
          height={110}
          coverPath={posterPath}
          tmdbWidth={185}
          boxShadow={false}
        />
      </CoverContainer>
      <TextContainer>
        <Title>
          {name} ({releaseYear})
        </Title>
        <Genres>{genres.join(", ")}</Genres>
      </TextContainer>
    </Row>
  );
};

MovieDetails.propTypes = {
  movieDetails: PropTypes.object,
};

export default memo(MovieDetails);
