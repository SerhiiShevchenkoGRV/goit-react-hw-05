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
      } catch (error) {
        alert(error);
      } finally {
        console.log("finally Movie Reviews");
      }
    };
    getReviews();
  }, [movieId]);

  return (
    <div className={css.reviewsCont}>
      {reviews.length ? (
        <ul className={css.reviewsList}>
          {reviews.map((review) => {
            const {
              author,
              author_details: { avatar_path: avatar },
              content,
              created_at,
              id,
            } = review;
            return (
              <li className={css.reviewItem} key={id}>
                <img
                  className={css.reviewAuthAva}
                  src={
                    avatar
                      ? `https://image.tmdb.org/t/p/w185${avatar}`
                      : "https://www.gravatar.com/avatar/?d=mp"
                  }
                  alt={`${author}'s avatar`}
                />
                <div className={css.reviewContent}>
                  <h3 className={css.reviewAuthor}>{author}</h3>
                  <p>{created_at.slice(0, 16).replace("T", " ")}</p>
                  <p>{content}</p>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className={css.noReviewsText}>
          We don't have any reviews for this movie.
        </p>
      )}
    </div>
  );
}
