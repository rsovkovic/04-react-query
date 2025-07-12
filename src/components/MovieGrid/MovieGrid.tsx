import css from "./MovieGrid.module.css";
import { Movie } from "../../types/movie";
interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}
export default function MovieGrid({ movies, onSelect }: MovieGridProps) {
  return (
    <ul className={css.grid}>
      {movies.map((movie) => (
        <li key={movie.id} onClick={() => onSelect(movie)}>
          <div className={css.card}>
            {/* <img
              className={css.image}
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              loading="lazy"
            /> */}
            {movie.poster_path ? (
              <img
                className={css.image}
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                loading="lazy"
              />
            ) : (
              <div className={css.image}>No poster</div>
            )}

            <h2 className={css.title}>{movie.title}</h2>
          </div>
        </li>
      ))}
    </ul>
  );
}
