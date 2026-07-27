import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import "./app.css";
import MovieDetails from "./pages/MovieDetails.jsx";
import Favorites from "./pages/Favorites.jsx";
import WatchedMovies from './pages/WatchedMovies.jsx'
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path='watched' element ={<WatchedMovies />} />
      </Routes>
    </div>
  );
}

export default App;
