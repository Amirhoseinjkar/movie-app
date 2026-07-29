import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { options } from "../api";
import Loader from "../components/Loader";
import FavoriteContext from "../context/FavoritesContext";
import useEmblaCarousel from "embla-carousel-react";
import unknownActor from "../assets/unknown-actor.png";
import WatchedContext from "../context/WatchedContext";

function TvDetails() {
  const { id } = useParams();
  const [emblaRef] = useEmblaCarousel();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const { favorites, setFavorites } = useContext(FavoriteContext);
  const { watched, setWatched } = useContext(WatchedContext);

  useEffect(() => {
    async function loadMovie() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/${id}`,
          options,
        );

        const data = await response.json();

        setMovie(data);
        const creditsResponse = await fetch(
          `https://api.themoviedb.org/3/tv/${id}/credits`,
          options,
        );
        const creditsData = await creditsResponse.json();
        setCast(creditsData.cast);
      } catch (error) {
        console.error("Error fetching movie:", error);
      } finally {
        setLoading(false);
      }
    }

    loadMovie();
  }, [id]);

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
  function addWatchedBtn() {
    if (
      watched.some((watch) => {
        return watch.id === movie.id;
      })
    ) {
      setWatched(
        watched.filter((watch) => {
          return watch.id !== movie.id;
        }),
      );
    } else {
      setWatched([...watched, movie]);
    }
  }
  const isAdded = favorites.some((favorite) => {
    return favorite.id === movie.id;
  });
  const isWatched = watched.some((watch) => {
    return watch.id === movie.id;
  });
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
            <h1>{movie.name}</h1>

            <div className="movie-meta">
              <span>⭐ {movie.vote_average.toFixed(1)}</span>

              <span>{movie.first_air_date.slice(0, 4)}</span>

              <span>{movie.adult ? <p>+18</p> : <p>pg-13</p>}</span>
            </div>

            {movie.tagline && <p className="tagline">{movie.tagline}</p>}
          </div>
        </div>
      </div>

      <div className="details-container">
        <div className="buttons">
          <button
            className={`watchlist-btn ${isAdded ? "active" : ""}`}
            onClick={addFavoriteBtn}
          >
            {isAdded ? "✓ In Watchlist" : "+ Add to Watchlist"}
          </button>
          <button
            className={`watched-btn ${isWatched ? "active" : ""}`}
            onClick={addWatchedBtn}
          >
            {isWatched ? "✓ Watched" : "Mark as Watched"}
          </button>
        </div>

        <h2>Overview</h2>

        <p className="overview">{movie.overview}</p>

        <div className="genres">
          {movie.genres.map((genre) => (
            <span key={genre.id}>{genre.name}</span>
          ))}
        </div>
        <h2>cast</h2>
        <div className="cast-embla" ref={emblaRef}>
          <div className="cast-container">
            {cast.slice(0, 10).map((actor) => (
              <div className="cast-slide" key={actor.id}>
                <a
                  href={`https://www.google.com/search?q=${encodeURIComponent(actor.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="actor-card">
                    {actor.profile_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                        alt={actor.name}
                      />
                    ) : (
                      <img src={unknownActor} />
                    )}

                    <h4>{actor.name}</h4>

                    <p>{actor.character}</p>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TvDetails;
