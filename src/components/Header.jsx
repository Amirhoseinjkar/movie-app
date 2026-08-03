import { Link } from "react-router-dom";
import SearchBar from "./Searchbar.jsx";
import download from "../assets/download.svg";
import "./Header.css";
function Header({ search, setSearch, handleSearch ,setSearched,setError}) {
  return (
    <header className="header">
      <div className="header-text">
      <Link className="logo-section" to="/">
        <img src={download} alt="logo" />
        <h1>MovieVault</h1>
      </Link>

    

      <nav className="nav-links">
       
        <Link to="/favorites">watchlist</Link>
        <Link to='/watched'>watched</Link>
      </nav>
      </div>
        <SearchBar
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
        setSearched={setSearched}
        setError={setError}
      />
    </header>
  );
}

export default Header;