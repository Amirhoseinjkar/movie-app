import { useContext } from "react";
import "./favorites.css";
import { Link } from "react-router-dom";
import FavoriteContext from "../context/FavoritesContext";
import MovieGrid from "../components/MovieGrid";

function Favorites() {
  const { favorites } = useContext(FavoriteContext);
  return (
    <>
      <p className="fav-num">watchlist : {favorites.length}</p>
      {favorites.length ? (
        <MovieGrid movies={favorites} />
      ) : (
        <div className="empty-fav">
          <p>You haven't added any movies yet.</p>
          <Link to="/">
            <button>Add Movies</button>
          </Link>
        </div>
      )}
    </>
  );
}
export default Favorites;
