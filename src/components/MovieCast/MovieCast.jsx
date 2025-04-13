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
        setMovieCast(cast);
      } catch (error) {
        alert(error);
      } finally {
        console.log("finally Movie Cast");
      }
    };
    getCredits();
  }, [movieId]);

  return (
    <div className={css.movieCastCont}>
      <ul className={css.movieCastList}>
        {movieCast.map((actor) => {
          const { character, id, name, profile_path: photo } = actor;
          return (
            <li className={css.movieCastItem} key={id}>
              <img
                className={css.actorsPhoto}
                src={
                  photo
                    ? `https://image.tmdb.org/t/p/w185${photo}`
                    : "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
                }
                alt={name}
              />
              <h4 className={css.actorsName}>{name}</h4>
              <p className={css.chrctName}> Character: {character}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
