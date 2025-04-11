import { NavLink, Outlet, useParams } from "react-router-dom";
import css from "./MovieDetailsPage.module.css";
import { useEffect, useState } from "react";
import { fetchMovieById } from "../../services/api";

export const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [searchedMovie, setSearchedMovie] = useState(null);

  useEffect(() => {
    const getMovie = async () => {
      try {
        const movie = await fetchMovieById(movieId);
        setSearchedMovie(movie);
        console.log(movie);
      } catch (error) {
        console.log(error);
      } finally {
        console.log("finally");
      }
    };
    getMovie();
  }, [movieId]);

  if (!searchedMovie) {
    return <h1>Loading...</h1>;
  }

  const {
    original_title: title,
    poster_path: poster,
    genres,
    overview,
    vote_average: score,
  } = searchedMovie;

  return (
    <div className={css.movieDetailsCont}>
      <div className={css.movieCont}>
        <img
          src={`https://image.tmdb.org/t/p/w500${poster}`}
          className={css.moviePoster}
        ></img>
        <div className={css.movieDescr}>
          <h1>{title}</h1>
          <p>User score: {score}</p>
          <h2>Overview</h2>
          <p>{overview}</p>
          <h3>Genres</h3>
          <p>{genres.map((g) => g.name).join(", ")}</p>
        </div>
      </div>

      <nav className={css.addInfo}>
        <ul>
          <li>
            <NavLink to="cast">Cast</NavLink>
          </li>
          <li>
            <NavLink to="reviews">Reviews</NavLink>
          </li>
        </ul>
      </nav>
      <div>
        <Outlet />
      </div>
    </div>
  );
};
