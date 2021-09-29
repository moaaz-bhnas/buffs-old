export default function createReviewObject({
  username,
  movieId,
  rating,
  writeUp,
}) {
  const timestamp = new Date();

  const review = {
    username,
    movieId,
    rating,
    writeUp,
    likers: [],
    timestamp,
  };

  return review;
}
