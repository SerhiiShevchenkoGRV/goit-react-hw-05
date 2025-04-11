import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCreditsById } from "../../services/api";
import css from "./MovieCast.module.css";

export default function MovieCast() {
  const { movieId } = useParams();
  const [movieCast, setMovieCast] = useState([]);

  useEffect(() => {
    const getCredits = async () => {
      try {
        const { cast } = await fetchCreditsById(movieId);
        console.log(cast);
        setMovieCast(cast);
      } catch (error) {
        console.log(error);
      } finally {
        console.log("finally4");
      }
    };
    getCredits();
  }, [movieId]);

  return (
    <div>
      <ul>
        {movieCast.map((actor) => {
          const { character, id, name, profile_path: photo } = actor;
          return (
            <li key={id}>
              <h3>{name}</h3>
              <img
                className={css.reviewAuthAva}
                src={`https://image.tmdb.org/t/p/w185${photo}`}
                alt={name}
              />
              <p>Character: {character}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
