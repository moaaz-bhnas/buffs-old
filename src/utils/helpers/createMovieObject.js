export default function createMovieObject({
  userId,
  movieDetails,
  movieCredits,
  rating,
  review,
}) {
  const cast = movieCredits.cast.slice(0, 3).map((actor) => ({
    tmdbId: actor.id,
    name: actor.name,
  }));

  const director = movieCredits.crew.find(
    (member) => member.job === "Director"
  );

  const movie = {
    userId,
    tmdbId: movieDetails.id,
    name: movieDetails.title,
    genres: movieDetails.genres,
    posterPath: movieDetails.poster_path,
    imdbRating: movieDetails.vote_average,
    cast,
    director: { tmdbId: director.id, name: director.name },
    rating,
    review,
  };

  return movie;
}
