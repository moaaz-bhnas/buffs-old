import axios from "axios";

export const search = async (query) => {
  const { NEXT_PUBLIC_TMDB_API_KEY } = process.env;
  const response = await axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=${NEXT_PUBLIC_TMDB_API_KEY}&query=${query}`
  );
  return response.data;
};
