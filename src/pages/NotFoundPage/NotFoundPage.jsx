import css from "./NotFoundPage.module.css";

export default function NotFound() {
  return (
    <div className={css.notFoundCont}>
      <p className={css.notFoundText}>This page does not exist</p>
    </div>
  );
}
