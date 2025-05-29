import React, { useState } from 'react';

function SearchBar({ placeholder = "Tìm kiếm...", onSearch = () => {}, className = "", iconClass = "bi bi-search" }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  return (
    <div className={`search-bar ${className}`}>
      <form className="search-form d-flex align-items-center" onSubmit={handleSubmit}>
        <input
          type="text"
          name="query"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          title="Enter search keyword"
        />
        <button type="submit" title="Search">
          <i className={iconClass}></i>
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
