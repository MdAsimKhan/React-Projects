import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    navigate(`/search/${search}`);
    setSearch("");
  };

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <form className="d-flex ms-auto" role="search" onSubmit={handleSearch}>
      <input
        className="form-control me-2"
        type="text"
        placeholder="Search"
        aria-label="Search"
        value={search}
        name="search"
        onChange={handleInputChange}
      />
      <button className="btn btn-success" type="submit">
        Search
      </button>
    </form>
  );
};
export default SearchBox;
