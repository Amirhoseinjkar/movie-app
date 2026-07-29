import MovieCard from "./MovieCard"
import './movieGrid.css'
function MovieGrid({movies}){
return(
  <>
  <div className="search-grid">
    {movies.map((movie)=>{
      return(
        <MovieCard key={movie.id} movie={movie} />
      )
    })}
  </div>

  </>
)
}
export default MovieGrid