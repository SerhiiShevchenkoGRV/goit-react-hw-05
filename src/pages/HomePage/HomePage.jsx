import { useState, useEffect } from "react";
import { fetchPopularMovies } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";
import css from "./HomePage.module.css";

export default function HomePage() {
  const [popMovies, setPopMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const { results } = await fetchPopularMovies();
        const filteredMovies = results.filter(
          (movie) => movie.original_language === "en"
        );
        setPopMovies(filteredMovies);
      } catch (error) {
        alert(error.message);
      } finally {
        console.log("finally Home Page");
      }
    };

    getMovies();
  }, []);

  return (
    <div>
      <h1 className={css.homeTitle}>Trending today</h1>
      <MovieList moviesList={popMovies} />
    </div>
  );
}
