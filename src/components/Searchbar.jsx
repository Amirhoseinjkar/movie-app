import "./Searchbar.css";
function SearchBar({ search, setSearch, handleSearch }) {
  return (
    <div className="search-container">
      <input
        className="search-input"
        type="text"
        placeholder="search movies"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
      />
     
      <button className="search-button" onClick={handleSearch}>
        Search
      </button>
      
    </div>
  );
}
export default SearchBar;
