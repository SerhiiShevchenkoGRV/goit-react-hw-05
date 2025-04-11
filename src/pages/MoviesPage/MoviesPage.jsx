import css from "./MoviesPage.module.css";

export default function About() {
  return (
    <div className={css.moviesCont}>
      <form className={css.form}>
        <input type="text" className={css.srchInpt}></input>
        <button type="submit">Search</button>
      </form>
    </div>
  );
}
