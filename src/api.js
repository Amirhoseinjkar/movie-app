const token = import.meta.env.VITE_TMDB_TOKEN

export const options ={
  headers:{
    Authorization: `Bearer ${token}`,
  },
};

export async function getPopularMovies(){
  const response = await fetch('https://api.themoviedb.org/3/movie/popular', options
    
  )
  const data = await response.json()
  return data.results;
}

export async function searchMovies(query){
  const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}`, options)
  const data = await response.json()
  return data.results;
}
