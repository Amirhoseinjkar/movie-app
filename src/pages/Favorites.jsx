
import { useContext } from "react";
import "./favorites.css";
import { Link } from "react-router-dom";
import { IoBookmarkOutline } from "react-icons/io5";
import FavoriteContext from "../context/FavoritesContext";
import MovieGrid from "../components/MovieGrid";

function Favorites() {
  const { favorites } = useContext(FavoriteContext);

  return (
    <main className="favorites-page">
      <header className="favorites-header">
        <div>
          <p className="favorites-eyebrow">YOUR COLLECTION</p>
          <h1>Watchlist</h1>
        </div>

        <div className="favorites-count">
          <span>{favorites.length}</span>
          <small>movies</small>
        </div>
      </header>

      {favorites.length ? (
        <MovieGrid movies={favorites} />
      ) : (
        <section className="empty-fav">
          <div className="empty-fav-icon">
            <IoBookmarkOutline />
          </div>

          <div className="empty-fav-content">
            <p className="empty-fav-label">YOUR WATCHLIST IS EMPTY</p>

            <h2>Nothing here yet.</h2>

            <p className="empty-fav-description">
              Save movies you want to watch later and they'll appear here.
            </p>

            <Link to="/" className="empty-fav-link">
              <button>Add movies to your watchlist</button>
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}

export default Favorites;
