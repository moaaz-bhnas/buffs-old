import axios from "axios";

const { NEXT_PUBLIC_TMDB_API_KEY: apiKey } = process.env;
const baseUrl = "https://api.themoviedb.org/3";

export const search = async (query) => {
  const response = await axios.get(
    `${baseUrl}/search/movie?api_key=${apiKey}&query=${query}`
  );
  return response.data;
};

export const getMovieDetails = async (id) => {
  const response = await axios.get(`${baseUrl}/movie/${id}?api_key=${apiKey}`);
  return response.data;
};

export const getMovieCredits = async (id) => {
  const response = await axios.get(
    `${baseUrl}/movie/${id}/credits?api_key=${apiKey}`
  );
  return response.data;
};
