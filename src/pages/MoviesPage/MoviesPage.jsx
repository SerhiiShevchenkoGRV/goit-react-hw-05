import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchMoviesByQuery } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";
import css from "./MoviesPage.module.css";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const userQuery = searchParams.get("query");

  useEffect(() => {
    const getMovies = async () => {
      try {
        const { results } = await fetchMoviesByQuery(userQuery);
        const filteredMovies = results.filter(
          (movie) => movie.original_language === "en"
        );
        setMovies(filteredMovies);
      } catch (error) {
        alert(error.message);
      } finally {
        console.log("finally Movies Page");
      }
    };

    getMovies();
  }, [userQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.target;
    const newSearch = form.elements.search.value;

    if (newSearch.trim() === "") {
      alert("Please enter search movie");
      return;
    }

    searchParams.set("query", newSearch);
    setSearchParams(searchParams);
    form.reset();
  };

  return (
    <div className={css.moviesPageCont}>
      <form className={css.form} onSubmit={handleSearch}>
        <input type="text" name="search" className={css.srchInpt}></input>
        <button type="submit">Search</button>
      </form>
      <MovieList moviesList={movies} />
    </div>
  );
}
