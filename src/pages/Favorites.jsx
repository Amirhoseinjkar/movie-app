import { useState } from "react";
import MovieCard from "../components/MovieCard";

function Favorites() {
  const [favorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });
  return (
    <>
      <MovieCard movies={favorites} />
    </>
  );
}
export default Favorites;
