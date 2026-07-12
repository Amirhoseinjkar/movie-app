import "./movieCard.css";
import { Link } from "react-router-dom";
import "./movieDetails.css";
function MovieCard({ movies }) {
  return (
    <div className="movies-grid">
      {movies.map((movie) => (
        <Link className="movie-link" to={`/movie/${movie.id}`}>
          <div className="movie-card" key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />

            <div className="movie-info">
              <h3 className="movie-title">{movie.title}</h3>
              <div className="movie-year-rating">
                <span className="movie-rating">
                  <img src="src\assets\star.png" alt="Star" />{" "}
                  {movie.vote_average.toFixed(1)}
                </span>
                <p>{movie.release_date}</p>
              </div>

              <p className="overview">
                {movie.overview.split(" ").splice(0, 15).join(" ")} ...
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
export default MovieCard;
