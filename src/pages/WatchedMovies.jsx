import { useContext } from "react"
import WatchedContext from "../context/WatchedContext"
import MovieCard from "../components/MovieCard"

function WatchedMovies (){
  const {watched} =useContext(WatchedContext)
return(
  <>
  <p>watched movies = {watched.length}</p>
  {watched.length>0?(watched.map((movie)=>{
    return(
      <MovieCard key={movie.id} movie={movie} />
    )
   })) :( <p>no movies here</p>)
   }
   
  </>
)
}
export default WatchedMovies