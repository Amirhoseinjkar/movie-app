import { createContext, useState , useEffect} from "react";
const FavoriteContext = createContext()
export function FavoritesProvider({children}){
  const [favorites,setFavorites]=useState(()=>{const saved = localStorage.getItem("favorites")
  return saved? JSON.parse(saved) : []
})
   useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);
 
return(
  <FavoriteContext.Provider
  value={{
    favorites,
    setFavorites,
  }} 
  >
    {children}
  </FavoriteContext.Provider>
)


}
export default FavoriteContext

