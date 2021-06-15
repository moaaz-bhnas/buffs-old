import { motion } from "framer-motion";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Overlay from "../../components/review/Overlay";
import Title from "../../components/review/Title";
import Input from "../../components/review/Input";
import Results from "../../components/review/Results";
import Cover from "../../components/review/Cover";
import Rating from "../../components/review/Rating";
import WriteUp from "../../components/review/WriteUp";
import { sizes } from "../../utils/style";
import { search } from "../../api/index";
import { visibilityVariants } from "../../utils/animation";
import Button from "../../components/review/Button";

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
  margin-top: 0.375rem;
  margin-bottom: 1rem;

  display: flex;
  /* align-items: center; */
`;

const Column = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
`;

const Review = () => {
  const inputRef = useRef(null);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const [expanded, setExpanded] = useState(false);

  const [rating, setRating] = useState(0);
  const [writeUp, setWriteUp] = useState("");
  console.log("writeUp: ", writeUp);

  useEffect(
    async function fetchAndSetResults() {
      if (query === "") {
        setSelectedMovie(null);
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

  useEffect(
    function reset() {
      if (!selectedMovie) {
        setRating(0);
        setWriteUp("");
      }
    },
    [selectedMovie]
  );

  const handleKeyDown = useCallback(({ key }) => {
    if (key === "Escape") {
      setExpanded(false);
      inputRef.current.blur();
    }
  }, []);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
  }, []);

  return (
    <>
      <Overlay expanded={expanded} setExpanded={setExpanded} />
      <Form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
        <Title expanded={expanded} />
        <Input
          ref={inputRef}
          query={query}
          setQuery={setQuery}
          setExpanded={setExpanded}
          valid={expanded && selectedMovie != null}
        />
        <Results results={results} />
        {expanded && selectedMovie && (
          <>
            <Row
              variants={visibilityVariants}
              initial="hidden"
              animate="visible"
            >
              <Cover coverPath={selectedMovie.poster_path} />
              <Column>
                <Rating rating={rating} setRating={setRating} />
                <WriteUp writeUp={writeUp} setWriteUp={setWriteUp} />
              </Column>
            </Row>
            <Button disabled={rating === 0} />
          </>
        )}
      </Form>
    </>
  );
};

export default memo(Review);
