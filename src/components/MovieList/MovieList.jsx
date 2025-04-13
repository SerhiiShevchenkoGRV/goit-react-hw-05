import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

export default function MovieList({ moviesList }) {
  const location = useLocation();
  return (
    <div className={css.movieListCont}>
      <ul>
        {moviesList.map(({ original_title: title, id }) => {
          return (
            <li key={id}>
              <Link to={`/movies/${id}`} state={location}>
                {title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
