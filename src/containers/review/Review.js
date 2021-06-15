import { motion, AnimatePresence } from "framer-motion";
import { memo, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Title from "../../components/review/Title";
import Input from "../../components/review/Input";
import Results from "../../components/review/Results";
import Cover from "../../components/review/Cover";
import Rating from "../../components/review/Rating";
import { sizes } from "../../utils/style";
import { search } from "../../api/index";
import Overlay from "../../components/review/Overlay";
import { visibilityVariants } from "../../utils/animation";

const Form = styled.form`
  background-color: #fff;
  border: 1px solid ${({ theme }) => theme.border.grey2};
  width: ${sizes.width.card};
  padding: 0.8rem 1rem;
  border-radius: ${sizes.borderRadius.default};
  position: relative;
  z-index: 2;
`;

const Row = styled(motion.div)`
  margin-top: 0.25em;

  display: flex;
  /* align-items: center; */
`;

const Review = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const [expanded, setExpanded] = useState(false);

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

  const reset = useCallback(() => {
    setQuery("");
    setSelectedMovie(null);
    setExpanded(false);
  }, []);

  const coverPath = selectedMovie && selectedMovie.poster_path;

  return (
    <>
      <Overlay expanded={expanded} reset={reset} />
      <Form onSubmit={(event) => event.preventDefault()}>
        <Title expanded={expanded} />
        <Input query={query} setQuery={setQuery} setExpanded={setExpanded} />
        <Results results={results} />
        {selectedMovie && (
          <Row variants={visibilityVariants} initial="hidden" animate="visible">
            <Cover coverPath={coverPath} />
            <Rating rating={rating} setRating={setRating} />
          </Row>
        )}
      </Form>
    </>
  );
};

export default memo(Review);
