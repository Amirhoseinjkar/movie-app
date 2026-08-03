import "./movieCard.css";
import { Link } from "react-router-dom";
import "../pages/movieDetails.css";
import star from "../assets/star.png";
function MovieCard({ movie }) {
  const type = movie.media_type || (movie.name ? "tv" : "movie");
  
  return (
    <>
      {
         <Link
    className="movie-link"
    draggable={false}
    to={`/${type}/${movie.id}`}
  >
    <div className="movie-card">
      <img
        draggable={false}
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />

      <div className="movie-info">
        <h3 className="movie-title">{movie.title || movie.name}</h3>

        <div className="movie-footer">
          <span className="movie-rating">
            <img src={star} alt="Star" />
            {movie.vote_average.toFixed(1)}
          </span>

          <span className="movie-year">
            {(movie.release_date || movie.first_air_date)?.slice(0, 4)}
          </span>
        </div>
      </div>
    </div>
  </Link>
      }
    </>
  );
}
export default MovieCard;
