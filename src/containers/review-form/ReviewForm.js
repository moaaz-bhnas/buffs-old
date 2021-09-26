import { memo, useCallback, useEffect, useRef, useState } from "react";
import { getMovieCredits, getMovieDetails, search } from "../../api/index";
import createMovieObject from "../../utils/helpers/createMovieObject";
import { useSession } from "next-auth/client";
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/movie`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movie),
    });
    const { documentId } = await res.json();

    return documentId;
  }, []);

  const postReviewToDb = useCallback(async (review) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/review`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(review),
    });
    const { documentId } = await res.json();

    return documentId;
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
