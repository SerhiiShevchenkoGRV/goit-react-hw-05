import axios from "axios";
axios.defaults.baseURL = "https://api.themoviedb.org/3";
const MY_ACCESS_KEY = import.meta.env.VITE_API_KEY;
const MY_ACCESS_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export const fetchPopularMovies = async () => {
  const popMovies = await axios.get("/discover/movie", {
    params: {
      with_original_language: "en",
      language: "en-US",
      sort_by: "popularity.desc",
    },
    headers: {
      Authorization: `Bearer ${MY_ACCESS_TOKEN}`,
      Accept: "application/json",
    },
  });
  return popMovies.data;
};

export const fetchMovieById = async (movieId) => {
  const searchedMovie = await axios.get(`/movie/${movieId}`, {
    headers: {
      Authorization: `Bearer ${MY_ACCESS_TOKEN}`,
      Accept: "application/json",
    },
  });
  return searchedMovie.data;
};

export const fetchReviewsById = async (movieId) => {
  const movieReviews = await axios.get(`movie/${movieId}/reviews`, {
    headers: {
      Authorization: `Bearer ${MY_ACCESS_TOKEN}`,
      Accept: "application/json",
    },
  });
  return movieReviews.data;
};

export const fetchCreditsById = async (movieId) => {
  const movieCredits = await axios.get(`movie/${movieId}/credits`, {
    params: {
      // with_original_language: "en",
      language: "en-US",
    },
    headers: {
      Authorization: `Bearer ${MY_ACCESS_TOKEN}`,
      Accept: "application/json",
    },
  });
  return movieCredits.data;
};
