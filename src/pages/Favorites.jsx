import { useContext} from "react";
import MovieCard from "../components/MovieCard";
import "./favorites.css"
import { Link } from "react-router-dom";
import FavoriteContext from "../context/FavoritesContext";

function Favorites() {
  const {favorites} = useContext(FavoriteContext)
  return (
    <>
    <p className="fav-num">favorites : {favorites.length}</p>
      {favorites.length?<MovieCard movies={favorites} />:
      <div className="empty-fav"><p>you havent added any movies yet</p> 
      <Link to="/"><button > add movies</button></Link>
      </div>
       
       }
    </>
  );
}
export default Favorites;
