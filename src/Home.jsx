import { useEffect, useState } from "react";
import { getPopularMovies, searchMovies } from "./api";
import SearchBar from "./SearchBar";
import MovieCard from "./MovieCard";
import Loader from "./Loader";


function Home() {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    async function loadMovies() {
      setLoading(true);
      try {
        const movieData = await getPopularMovies();
        console.log(movieData);
        setMovies(movieData);
      } catch (error) {
        console.error("Error fetching popular movies", error);
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
      <SearchBar
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />
      {error && <p>{error}</p>}
      <MovieCard movies={movies} />
    </>
  );
}
export default Home;
