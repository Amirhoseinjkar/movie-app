import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { options } from "../api";
import Loader from "../components/Loader";
function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    async function loadMovie() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}`,
          options,
        );

        const data = await response.json();

        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie:", error);
      } finally {
        setLoading(false);
      }
    }

    loadMovie();
  }, [id]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  if (loading) {
    return <Loader />;
  }

  function addFavoriteBtn() {
    if (
      favorites.some((favorite) => {
        return favorite.id === movie.id;
      })
    ) {
      setFavorites(
        favorites.filter((favorite) => {
          return favorite.id !== movie.id;
        }),
      );
    } else {
      setFavorites([...favorites, movie]);
    }
  }

  return (
    <div className="movie-page">
      <div
        className="hero"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div className="overlay">
          <div className="hero-content">
            <h1>{movie.title}</h1>

            <div className="movie-meta">
              <span>⭐ {movie.vote_average.toFixed(1)}</span>

              <span>{movie.release_date.slice(0, 4)}</span>

              <span>{movie.runtime} min</span>
              <span>{movie.adult ? <p>+18</p> : <p>pg-13</p>}</span>
            </div>

            {movie.tagline && <p className="tagline">{movie.tagline}</p>}
          </div>
        </div>
      </div>

      <div className="details-container">
        <div className="buttons">
          <button onClick={addFavoriteBtn}>+ Add to favorites</button>
          {console.log(favorites)}
        </div>

        <h2>Overview</h2>

        <p className="overview">{movie.overview}</p>

        <div className="genres">
          {movie.genres.map((genre) => (
            <span key={genre.id}>{genre.name}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
