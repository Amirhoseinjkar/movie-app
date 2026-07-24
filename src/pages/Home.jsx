import { useEffect, useState } from "react";
import {
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getNowPlayingMovies,
  searchMovies,
} from "../api";

import Loader from "../components/Loader";
import Header from "../components/Header";
import "./home.css";
import MovieSection from "../components/MovieSection";

function Home() {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");
  const [popularMovies, setPopularMovies] = useState([]);

  const [topRatedMovies, setTopRatedMovies] = useState([]);

  const [upcomingMovies, setUpcomingMovies] = useState([]);

  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  useEffect(() => {
    async function loadMovies() {
      setLoading(true);
      try {
        const popularMovies = await getPopularMovies();
        setPopularMovies(popularMovies);
        const topRated = await getTopRatedMovies();
        setTopRatedMovies(topRated);
        const nowPlaying = await getNowPlayingMovies();
        setNowPlayingMovies(nowPlaying);
        const upcoming = await getUpcomingMovies();
        setUpcomingMovies(upcoming);
      } catch (error) {
        console.error("Error fetching  movies", error);
      } finally {
        setLoading(false);
      }
    }
    loadMovies();
  }, []);
 
  async function handleSearch() {
    if (search.trim() === "") {
      return;
    }
    setSearched(true)
    setLoading(true);
    setError("");

    try {
      const results = await searchMovies(search);
      setMovies(results);
      if (results.length === 0) {
        setError("No movies found for the search query.");
      }
    } catch (error) {
      console.error("Error searching movies", error);
    } finally {
      setLoading(false);
    }
  }
  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Header
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
        setSearched ={setSearched}
         setError={setError}
      />
      {error && <p>{error}</p>}
      {!searched? (
        <>
          <MovieSection title="Popular" movies={popularMovies} />

      <MovieSection title="Top Rated" movies={topRatedMovies} />

      <MovieSection title="Upcoming" movies={upcomingMovies} />

      <MovieSection title="Now Playing" movies={nowPlayingMovies} />
        </>
      ) : (
        <MovieSection title="search results" movies={movies} />
      )

    }
    
    </>
  );
}
export default Home;
