import axios from "axios";
axios.defaults.baseURL = "https://api.themoviedb.org/3";
const MY_ACCESS_TOKEN = import.meta.env.VITE_TMDB_TOKEN;
// const MY_ACCESS_KEY = import.meta.env.VITE_API_KEY;

export const fetchPopularMovies = async () => {
  const popMovies = await axios.get("/trending/movie/day", {
    params: {
      language: "en-US",
    },
    headers: {
      Authorization: `Bearer ${MY_ACCESS_TOKEN}`,
      Accept: "application/json",
    },
  });
  return popMovies.data;
};

export const fetchMoviesByQuery = async (userQuery) => {
  const searchedMovies = await axios.get("/search/movie", {
    params: {
      query: userQuery,
      language: "en-US",
    },
    headers: {
      Authorization: `Bearer ${MY_ACCESS_TOKEN}`,
      Accept: "application/json",
    },
  });
  return searchedMovies.data;
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

export const fetchCreditsById = async (movieId) => {
  const movieCredits = await axios.get(`movie/${movieId}/credits`, {
    params: {
      language: "en-US",
    },
    headers: {
      Authorization: `Bearer ${MY_ACCESS_TOKEN}`,
      Accept: "application/json",
    },
  });
  return movieCredits.data;
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
