import { Link } from "react-router-dom";
import css from "./MovieList.module.css";

export default function MovieList({ popMovies }) {
  return (
    <div className={css.homeCont}>
      <ul>
        {popMovies.map(({ original_title, id }) => {
          return (
            <li key={id}>
              <Link to={`/movies/${id}`}>{original_title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
