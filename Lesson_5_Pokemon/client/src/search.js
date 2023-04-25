import React, { useState } from "react";
import Axios from "axios";

const Search = () => {
  // Declare state variables for searchTerm and searchResults using useState
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Try to send a request to the backend with the searchTerm
    // Update searchResults with the response data
    // Catch any errors and log them

    try {
      const response = await Axios.get(
        `http://localhost:3001/api/pokemon/search?pkmType=${searchTerm}`
      );
      setSearchResults(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <h3>Search for (fill in information based on your app!)</h3>
        <input
          type="text"
          // Bind the value of the input to the searchTerm state variable
          // Add an onChange event to update searchTerm with the input value
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
      </label>
      <button type="submit">Search</button>
      <div className="search-results">
        {/* Map over searchResults and render a div for each result */}
      </div>
    </form>
  );
};

export default Search;
