import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchReviewsById } from "../../services/api";
import css from "./MovieReviews.module.css";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const { results } = await fetchReviewsById(movieId);
        setReviews(results);
        console.log(results);
      } catch (error) {
        console.log(error);
      } finally {
        console.log("finally3");
      }
    };
    getReviews();
  }, [movieId]);
  return (
    <div className={css.reviewsCont}>
      <ul>
        {reviews.map((review) => {
          const {
            author,
            author_details: { avatar_path: avatar },
            content,
            created_at,
            id,
          } = review;
          return (
            <li key={id}>
              <img
                className={css.reviewAuthAva}
                src={
                  avatar
                    ? `https://image.tmdb.org/t/p/w185${avatar}`
                    : "https://www.gravatar.com/avatar/?d=mp"
                }
                alt={`${author}'s avatar`}
              />
              <h3>{author}</h3>
              <p>{created_at}</p>
              <p>{content}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
