import { useState, useEffect } from "react";
import { fetchPopularMovies } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";

export default function Home() {
  const [popMovies, setPopMovies] = useState([]);
  useEffect(() => {
    const getMovies = async () => {
      try {
        const { page, results, total_pages, total_results } =
          await fetchPopularMovies();
        console.log(page, results);
        setPopMovies(results);
      } catch (error) {
        console.log(error);
      } finally {
        console.log("finally");
      }
    };

    getMovies();
  }, []);

  return <MovieList popMovies={popMovies} />;
}
