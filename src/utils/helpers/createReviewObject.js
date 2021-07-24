export default function createReviewObject({
  userId,
  movieId,
  rating,
  writeUp,
}) {
  const timestamp = new Date();

  const review = {
    userId,
    movieId,
    rating,
    writeUp,
    timestamp,
  };

  return review;
}
