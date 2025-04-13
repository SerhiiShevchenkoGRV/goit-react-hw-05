import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import css from "./NotFoundPage.module.css";

export default function NotFound() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 5000);
  }, [navigate]);
  return (
    <div className={css.notFoundCont}>
      <Link to={navigate("/")} className={css.goHomeLink}>
        <BsArrowLeft className={css.arrowIcon} />
        Go Home
      </Link>
      <p className={css.notFoundText}>This page does not exist</p>
    </div>
  );
}
