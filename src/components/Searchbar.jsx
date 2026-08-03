import "./searchbar.css";
import {FiSearch} from "react-icons/fi"
function SearchBar({ search, setSearch, handleSearch ,setSearched,setError}) {
  return (
    <div className="search-container">
      <input
        className="search-input"
        type="text"
        placeholder="search movies"
        value={search}
        onChange={(e) => {
          const value = e.target.value
          setSearch(value);
          if (value.trim() === "") {
    setSearched(false);
    setError("");
  }
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
      />
     
      <button className="search-button" onClick={handleSearch}>
        <FiSearch className="search-icon" />
       <span>search</span>
      </button>
      
    </div>
  );
}
export default SearchBar;
