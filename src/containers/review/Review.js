import { motion } from "framer-motion";
import { memo, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Input from "../../components/review/Input";
import Results from "../../components/review/Results";
import Cover from "../../components/review/Cover";
import Rating from "../../components/review/Rating";
import { sizes } from "../../utils/style";
import { search } from "../../api/index";

const Form = styled(motion.form)`
  background-color: #fff;
  border: 1px solid ${({ theme }) => theme.border.grey2};
  width: ${sizes.width.card};
  padding: 0.8em 1em;
  border-radius: ${sizes.borderRadius.default};
`;

const Title = styled.h2``;

const Row = styled.div`
  margin-top: 0.25em;

  display: flex;
  /* align-items: center; */
`;

const Review = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const [rating, setRating] = useState(0);
  console.log("rating: ", rating);

  useEffect(
    async function fetchAndSetResults() {
      if (query === "") {
        return setResults([]);
      }

      const selectedMovie = getSelectedMovie(query);
      if (selectedMovie) {
        setSelectedMovie(selectedMovie);
        return setResults([]);
      }

      setSelectedMovie(null);
      const { results } = await search(query);
      setResults(results);
    },
    [query]
  );

  const getSelectedMovie = useCallback(
    (query) => {
      const selectedMovie = results.find((result) => result.title === query);
      return selectedMovie;
    },
    [results]
  );

  const coverPath = selectedMovie && selectedMovie.poster_path;

  return (
    <Form>
      {selectedMovie && <Title id="review__title">Review Movie</Title>}
      <Input query={query} setQuery={setQuery} />
      <Results results={results} />
      {selectedMovie && (
        <Row>
          <Cover coverPath={coverPath} />
          <Rating rating={rating} setRating={setRating} />
        </Row>
      )}
    </Form>
  );
};

export default memo(Review);
