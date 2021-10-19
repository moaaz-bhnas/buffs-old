import { memo, useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getMovieCredits, getMovieDetails } from "../../api/index";
import createMovieObject from "../../utils/helpers/createMovieObject";
import { useSession } from "next-auth/client";
import createReviewObject from "../../utils/helpers/createReviewObject";

const Review = ({ children, editable = false, reviewToEdit = null }) => {
  const [session] = useSession();

  const [selectedMovie, setSelectedMovie] = useState(
    editable ? reviewToEdit.movieDetails : null
  );

  const [rating, setRating] = useState(editable ? reviewToEdit.rating : 0);
  const [writeUp, setWriteUp] = useState(editable ? reviewToEdit.writeUp : "");

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

  const handleCreateSubmit = useCallback(
    async (event) => {
      event.preventDefault();

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

      const { username } = session.user;

      // create a review object
      const review = createReviewObject({
        username,
        movieId: movieDocumentId,
        rating,
        writeUp,
      });

      // post review to database
      const reviewDocumentId = await postReviewToDb(review);
      console.log("reviewDocumentId: ", reviewDocumentId);

      setSelectedMovie(null);
      setLoading(false);
    },
    [selectedMovie, rating, writeUp]
  );

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

  const handleUpdateSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/review`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: "default",
            data: { reviewId: reviewToEdit.reviewId, rating, writeUp },
          }),
        }
      );

      const { modifiedCount } = await res.json();
      console.log("modifiedCount: ", modifiedCount);

      setLoading(false);
    },
    [rating, writeUp]
  );

  return children({
    onSubmit: editable ? handleUpdateSubmit : handleCreateSubmit,
    selectedMovie,
    setSelectedMovie,
    rating,
    setRating,
    writeUp,
    setWriteUp,
    loading,
  });
};

Review.propTypes = {
  editable: PropTypes.bool,
  reviewToEdit: PropTypes.object,
};

export default memo(Review);
