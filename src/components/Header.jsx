import { Link } from "react-router-dom";
import SearchBar from "./Searchbar.jsx";
import download from "../assets/download.svg";
import "./Header.css";
function Header({ search, setSearch, handleSearch }) {
  return (
    <header className="header">
      
      <Link className="logo-section" to="/">
        <img src={download} alt="logo" />
        <h1>MovieVault</h1>
      </Link>

      <SearchBar
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />

      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/favorites">Favorites</Link>
      </nav>
    </header>
  );
}

export default Header;