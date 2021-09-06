export default function createMovieObject({ movieDetails, movieCredits }) {
  const cast = movieCredits.cast.slice(0, 3).map((actor) => ({
    tmdbId: actor.id,
    name: actor.name,
  }));

  const director = movieCredits.crew.find(
    (member) => member.job === "Director"
  );

  const movie = {
    tmdbId: movieDetails.id,
    name: movieDetails.title,
    genres: movieDetails.genres,
    releaseDate: movieDetails.release_date,
    posterPath: movieDetails.poster_path,
    imdbRating: movieDetails.vote_average,
    cast,
    director: { tmdbId: director.id, name: director.name },
    reviewsId: [],
  };

  return movie;
}
