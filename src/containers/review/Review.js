import { motion } from "framer-motion";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import Overlay from "../../components/review/Overlay";
import Title from "../../components/review/Title";
import Cover from "../../components/review/Cover";
import Rating from "../../components/review/Rating";
import WriteUp from "../../components/review/WriteUp";
import { mediaQueries, sizes } from "../../utils/style";
import { getMovieCredits, getMovieDetails, search } from "../../api/index";
import { visibilityVariants } from "../../utils/animation";
import Button from "../../components/review/Button";
import createMovieObject from "../../utils/helpers/createMovieObject";
import { useSession } from "next-auth/client";
import PropTypes from "prop-types";
import createReviewObject from "../../utils/helpers/createReviewObject";
import Select from "../../components/review/Select";

const expandedStyles = css`
  position: relative;
  z-index: 2;
`;

const Container = styled.div`
  &.home__review {
    @media screen and (max-width: ${mediaQueries.main}) {
      display: none;
    }
  }
`;

const Form = styled.form`
  background-color: #fff;
  border: 1px solid ${({ theme }) => theme.border.grey2};
  width: ${sizes.width.card};
  padding: 0.8rem 1rem;
  border-radius: ${sizes.borderRadius.default};

  ${({ expanded }) => expanded && expandedStyles}
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

const Review = ({ className }) => {
  const [session, loading] = useSession();
  const { user } = session;

  const selectRef = useRef(null);
  const buttonRef = useRef(null);

  const [selectedMovie, setSelectedMovie] = useState(null);

  const [expanded, setExpanded] = useState(false);
  const [menuExpanded, setMenuExpanded] = useState(false);

  const [rating, setRating] = useState(0);
  const [writeUp, setWriteUp] = useState("");

  useEffect(
    function reset() {
      if (!selectedMovie) {
        setRating(0);
        setWriteUp("");
      }
    },
    [selectedMovie]
  );

  const handleKeyDown = useCallback(
    (event) => {
      const { target, key, shiftKey } = event;
      const { inputRef } = selectRef.current.select.select;
      const firstInteractive = inputRef;
      const lastInteractive = selectedMovie ? buttonRef.current : inputRef;

      if (key === "Tab" && shiftKey && target === firstInteractive) {
        setExpanded(false);
      }

      if (key === "Tab" && !shiftKey && target === lastInteractive) {
        setExpanded(false);
      }

      if (key === "Escape" && !menuExpanded) {
        setExpanded(false);
        selectRef.current.blur();
      }
    },
    [selectedMovie, menuExpanded, selectRef.current, buttonRef.current]
  );

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      const { id: tmdbId } = selectedMovie;
      const movieDetails = getMovieDetails(tmdbId);
      const movieCredits = getMovieCredits(tmdbId);

      // create a movie object
      const movie = createMovieObject({
        movieDetails: await movieDetails,
        movieCredits: await movieCredits,
      });

      // post movie to database
      const movieDocumentId = await postMovieToDb(movie);

      const { id: userId } = user;

      // create a review object
      const review = createReviewObject({
        userId,
        movieId: movieDocumentId,
        rating,
        writeUp,
      });

      // post review to database
      const reviewDocumentId = await postReviewToDb(review);

      console.log("reviewDocumentId: ", reviewDocumentId);
    },
    [selectedMovie, rating, writeUp]
  );

  const postMovieToDb = useCallback(async (movie) => {
    const res = await fetch("http://localhost:3000/api/movie", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movie),
    });
    const { data } = await res.json();

    return data.insertedId;
  }, []);

  const postReviewToDb = useCallback(async (review) => {
    const res = await fetch("http://localhost:3000/api/review", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(review),
    });
    const { data } = await res.json();

    return data.insertedId;
  }, []);

  return (
    <Container className={className}>
      <Overlay expanded={expanded} setExpanded={setExpanded} />
      <Form
        expanded={expanded}
        onSubmit={handleSubmit}
        onKeyDown={handleKeyDown}
      >
        <Title expanded={expanded} />
        <Select
          id="review__select"
          value={selectedMovie}
          onChange={(movie) => setSelectedMovie(movie)}
          onFocus={() => setExpanded(true)}
          setMenuExpanded={setMenuExpanded}
          ref={selectRef}
        />
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
            <Button ref={buttonRef} disabled={rating === 0} />
          </>
        )}
      </Form>
    </Container>
  );
};

Review.propTypes = {
  className: PropTypes.string,
};

export default memo(Review);
