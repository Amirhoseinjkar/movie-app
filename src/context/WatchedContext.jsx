import { createContext,useEffect,useState } from "react"

const WatchedContext = createContext()
export function WatchedProvider({children}){
  const[watched,setWatched] = useState(()=>{
    const saved = localStorage.getItem('watched')
    return saved? JSON.parse(saved): []
  })
    


  useEffect(()=>{
     localStorage.setItem('watched',JSON.stringify(watched))
  },[watched])
  return(
    <>
    <WatchedContext.Provider value={{watched,setWatched}}>
      {children}
    </WatchedContext.Provider>
    </>
  )
}
export default WatchedContext