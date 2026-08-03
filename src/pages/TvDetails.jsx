import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { options } from "../api";
import Loader from "../components/Loader";
import FavoriteContext from "../context/FavoritesContext";
import useEmblaCarousel from "embla-carousel-react";
import unknownActor from "../assets/unknown-actor.png";
import WatchedContext from "../context/WatchedContext";
import { IoIosArrowRoundBack } from "react-icons/io";

function TvDetails() {
  const { id } = useParams();
  const [emblaRef] = useEmblaCarousel();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const { favorites, setFavorites } = useContext(FavoriteContext);
  const { watched, setWatched } = useContext(WatchedContext);
  const [seasons, setSeasons] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [watchedEpisodes, setWatchedEpisodes] = useState(() => {
    const saved = localStorage.getItem("watchedEpisodes");

    return saved
      ? JSON.parse(saved)
      : {
          tvId: id,
          episodes: [],
        };
  });

  useEffect(() => {
    localStorage.setItem("watchedEpisodes", JSON.stringify(watchedEpisodes));
  }, [watchedEpisodes]);
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

        const seasonsData = await Promise.all(
          data.seasons.map(async (season) => {
            const response = await fetch(
              `https://api.themoviedb.org/3/tv/${id}/season/${season.season_number}`,
              options,
            );
            return response.json();
          }),
        );
        console.log(seasonsData);
        setSeasons(seasonsData);
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
  function handleEpisodeWatched(episodeId) {
    const currentEpisodes = watchedEpisodes.episodes;
    if (watchedEpisodes.episodes.includes(episodeId)) {
      const updatedEpisodes = currentEpisodes.filter((id) => id !== episodeId);
      if (
        updatedEpisodes.length > 0 &&
        !favorites.some((favorite) => favorite.id === movie.id)
      ) {
        addFavoriteBtn();
      }
      setWatchedEpisodes({
        tvId: watchedEpisodes.tvId,
        episodes: watchedEpisodes.episodes.filter((id) => id !== episodeId),
      });
    } else {
      const updatedEpisodes = [...currentEpisodes, episodeId];

      if (updatedEpisodes.length > 0) {
        addToWatchlist();
      }

      setWatchedEpisodes({
        tvId: watchedEpisodes.tvId,
        episodes: updatedEpisodes,
      });
    }
  }
  function addToWatchlist() {
    if (!favorites.some((favorite) => favorite.id === movie.id)) {
      setFavorites([...favorites, movie]);
    }
  }
  function handleSeasonWatched(season) {
    const episodeIds = season.episodes.map((episode) => episode.id);

    const allWatched = episodeIds.every((id) =>
      watchedEpisodes.episodes.includes(id),
    );

    if (allWatched) {
      setWatchedEpisodes({
        tvId: watchedEpisodes.tvId,
        episodes: [
          ...watchedEpisodes.episodes,
          ...episodeIds.filter((id) => !episodeIds.episodes.includes(id)),
        ],
      });
    } else {
      setWatchedEpisodes({
        tvId: watchedEpisodes.tvId,
        episodes: [
          ...watchedEpisodes.episodes,
          ...episodeIds.filter((id) => !watchedEpisodes.episodes.includes(id)),
        ],
      });
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
      <button className="back-btn" onClick={() => window.history.back()}>
        <IoIosArrowRoundBack />
      </button>
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
        <div className="seasons-container">
          {seasons.map((season) => {
            const isExpanded = expandedId === season.id;

            const isSeasonWatched = season.episodes.every((episode) =>
              watchedEpisodes.episodes.includes(episode.id),
            );

            return (
              <div className="season-card" key={season.id}>
                <div
                  className="brief-season"
                  onClick={() => setExpandedId(isExpanded ? null : season.id)}
                >
                  <div className="season-info">
                    <h3>{season.name}</h3>
                    <span>{season.episodes.length} episodes</span>
                  </div>

                  <div
                    className={`watched-indicator ${
                      isSeasonWatched ? "watched" : ""
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSeasonWatched(season);
                    }}
                  >
                    {isSeasonWatched ? "✓" : ""}
                  </div>
                </div>

                {isExpanded && (
                  <div className="episodes-container">
                    {season.episodes.map((episode) => {
                      const isEpisodeWatched =
                        watchedEpisodes.episodes.includes(episode.id);
                      return (
                        <div className="episode" key={episode.id}>
                          <div className="episode-poster">
                            {episode.still_path ? (
                              <img
                                src={`https://image.tmdb.org/t/p/w300${episode.still_path}`}
                                alt={episode.name}
                              />
                            ) : (
                              <div className="no-episode-image">No image</div>
                            )}
                          </div>

                          <div className="episode-info">
                            <div className="episode-header">
                              <div>
                                <span className="episode-number">
                                  Episode {episode.episode_number}
                                </span>

                                <h4>{episode.name}</h4>
                              </div>

                              <div
                                className={`watched-indicator ${
                                  isEpisodeWatched ? "watched" : ""
                                }`}
                                onClick={() => handleEpisodeWatched(episode.id)}
                              >
                                {isEpisodeWatched ? "✓" : ""}
                              </div>
                            </div>

                            <div className="episode-meta">
                              {episode.air_date && (
                                <span>{episode.air_date}</span>
                              )}

                              {episode.runtime && (
                                <span>{episode.runtime} min</span>
                              )}
                            </div>

                            {episode.overview && (
                              <p className="episode-overview">
                                {episode.overview}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
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
