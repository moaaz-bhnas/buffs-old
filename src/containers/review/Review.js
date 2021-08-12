import { memo, useCallback, useEffect, useRef, useState } from "react";
import { getMovieCredits, getMovieDetails, search } from "../../api/index";
import createMovieObject from "../../utils/helpers/createMovieObject";
import { useSession } from "next-auth/client";
import PropTypes from "prop-types";
import createReviewObject from "../../utils/helpers/createReviewObject";

const Review = ({ children }) => {
  const [session] = useSession();

  const [selectedMovie, setSelectedMovie] = useState(null);

  const [rating, setRating] = useState(0);
  const [writeUp, setWriteUp] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(
    function reset() {
      if (!selectedMovie) {
        setRating(0);
        setWriteUp("");
      }
    },
    [selectedMovie]
  );

  const handleSubmit = useCallback(async () => {
    setLoading(true);

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

    const { user } = session;
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

    setSelectedMovie(null);
    setLoading(false);
  }, [selectedMovie, rating, writeUp]);

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

  return children({
    onSubmit: handleSubmit,
    selectedMovie,
    setSelectedMovie,
    rating,
    setRating,
    writeUp,
    setWriteUp,
    loading,
  });
};

export default memo(Review);
