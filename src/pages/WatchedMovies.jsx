import { useContext } from "react";
import WatchedContext from "../context/WatchedContext";
import MovieGrid from "../components/MovieGrid";
import { Link } from "react-router";

function WatchedMovies() {
  const { watched } = useContext(WatchedContext);
  
  return (
    <>
     <div className="watched-movies-stats"> 
      <p>watched movies : {watched.length}</p>
       <p>watch time : {watched.reduce((total,movie)=> total + (movie.runtime || 0), 0)} minutes</p>
       </div>

      {watched.length > 0 ? (
        <MovieGrid movies={watched} />
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
export default WatchedMovies;
