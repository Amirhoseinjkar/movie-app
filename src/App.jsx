import {Route, Routes} from "react-router-dom";
import Home from "./Home.jsx";
import "./app.css"
import MovieDetails from "./MovieDetails.jsx";
function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/movie/:id' element={<MovieDetails />} />
      </Routes>
    </div>
  )
}

export default App
