
import { useContext } from "react";
import WatchedContext from "../context/WatchedContext";
import MovieGrid from "../components/MovieGrid";
import { Link } from "react-router";
import { IoCheckmarkCircleOutline, IoTimeOutline } from "react-icons/io5";
import './watchedmovies.css'

function WatchedMovies() {
  const { watched } = useContext(WatchedContext);

  const watchTime = watched.reduce(
    (total, movie) => total + (movie.runtime || 0),
    0
  );

  return (
    <main className="watched-page">
      <header className="watched-header">
        <div>
          <p className="watched-eyebrow">YOUR HISTORY</p>
          <h1>Watched Movies</h1>
        </div>

        <div className="watched-count">
          <span>{watched.length}</span>
          <small>movies</small>
        </div>
      </header>

      {watched.length > 0 ? (
        <>
          <section className="watched-movies-stats">
            <div className="watched-stat">
              <div className="watched-stat-icon">
                <IoCheckmarkCircleOutline />
              </div>

              <div>
                <span className="watched-stat-value">{watched.length}</span>
                <p>Movies watched</p>
              </div>
            </div>

            <div className="watched-stat">
              <div className="watched-stat-icon">
                <IoTimeOutline />
              </div>

              <div>
                <span className="watched-stat-value">{watchTime}</span>
                <p>Minutes watched</p>
              </div>
            </div>
          </section>

          <MovieGrid movies={watched} />
        </>
      ) : (
        <section className="empty-fav">
          <div className="empty-fav-icon">
            <IoCheckmarkCircleOutline />
          </div>

          <div className="empty-fav-content">
            <p className="empty-fav-label">YOUR WATCH HISTORY IS EMPTY</p>

            <h2>No movies watched yet.</h2>

            <p className="empty-fav-description">
              Movies you mark as watched will appear here along with your
              viewing statistics.
            </p>

            <Link to="/" className="empty-fav-link">
              <button>Add movies to your history</button>
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}

export default WatchedMovies;

