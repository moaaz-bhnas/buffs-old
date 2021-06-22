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
import { getMovieCredits, getMovieDetails, search } from "../../api/index";
import { visibilityVariants } from "../../utils/animation";
import Button from "../../components/review/Button";
import createMovieObject from "../../utils/helpers/createMovieObject";
import user from "../../utils/data/user";
import movieNameWithReleaseYear from "../../utils/helpers/movieNameWithReleaseDate";
import dateToYear from "../../utils/helpers/dateToYear";

const Form = styled.form`
  background-color: #fff;
  border: 1px solid ${({ theme }) => theme.border.grey2};
  width: ${sizes.width.card};
  padding: 0.8rem 1rem;
  border-radius: ${sizes.borderRadius.default};
  position: relative;
  z-index: 1;
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
  console.log("selectedMovie: ", selectedMovie);

  const [expanded, setExpanded] = useState(false);

  const [rating, setRating] = useState(0);
  const [writeUp, setWriteUp] = useState("");

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
      const selectedMovie = results.find(
        ({ title, release_date }) =>
          movieNameWithReleaseYear(title, dateToYear(release_date)) === query
      );
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

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      const { id: tmdbId } = selectedMovie;
      const movieDetails = getMovieDetails(tmdbId);
      const movieCredits = getMovieCredits(tmdbId);

      const { id: userId } = user;
      const movie = createMovieObject({
        userId,
        movieDetails: await movieDetails,
        movieCredits: await movieCredits,
      });

      console.log("movie: ", movie);

      try {
        const res = await fetch("http://localhost:3000/api/movie", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(movie),
        });
        console.log("res: ", res);
      } catch (error) {
        console.log(error);
      }
    },
    [selectedMovie, rating, writeUp]
  );

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
