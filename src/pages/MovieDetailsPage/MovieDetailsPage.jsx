import { useEffect, useRef, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import { fetchMovieById } from "../../services/api";
import css from "./MovieDetailsPage.module.css";
import { BsArrowLeft } from "react-icons/bs";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [searchedMovie, setSearchedMovie] = useState(null);
  const location = useLocation();
  const goBackUrl = useRef(location.state ?? "/movies");
  const isRootRoute = location.pathname === `/movies/${movieId}`;

  useEffect(() => {
    const getMovie = async () => {
      try {
        const movie = await fetchMovieById(movieId);
        setSearchedMovie(movie);
      } catch (error) {
        alert(error.message);
      } finally {
        console.log("finally Movie Details Page");
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
      <Link to={goBackUrl.current} className={css.goBackLink}>
        <BsArrowLeft className={css.arrowIcon} />
        Go back
      </Link>
      <div className={css.movieCont}>
        <img
          src={`https://image.tmdb.org/t/p/w500${poster}`}
          alt={`${title} poster`}
          className={css.moviePoster}
        ></img>
        <div className={css.movieDescr}>
          <h1>{title}</h1>
          <p>User score: {(score * 10).toFixed(0)}%</p>
          <h2>Overview</h2>
          <p>{overview}</p>
          <h3>Genres</h3>
          <p>{genres.map((g) => g.name).join(", ")}</p>
        </div>
      </div>

      <nav className={css.addInfoNav}>
        <ul>
          <li>
            <NavLink to="cast">Cast</NavLink>
          </li>
          <li>
            <NavLink to="reviews">Reviews</NavLink>
          </li>
        </ul>
      </nav>

      {!isRootRoute && (
        <div className={css.addInfoCont}>
          <Outlet />
        </div>
      )}
    </div>
  );
}
