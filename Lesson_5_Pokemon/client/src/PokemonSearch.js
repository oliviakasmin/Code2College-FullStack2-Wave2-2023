import React, { useState } from "react";
import Axios from "axios";

function PokemonSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await Axios.get(
        `http://localhost:3001/api/pokemon/search?pkmType=${searchTerm}`
      );
      setSearchResults(response.data);
      console.log(searchResults);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <h3>
          {" "}
          Search for pokemon by type! Enter the type below (water, fire,
          electric, etc) and see what pokemon of that type are on file!{" "}
        </h3>
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </label>
      <button type="submit">Search</button>
      <div className="search-results">
        {searchResults.map((pokemon) => (
          <div key={pokemon.name}>
            <h3>{pokemon.name}</h3>
            <p>Type: {pokemon.type}</p>
          </div>
        ))}
      </div>
    </form>
  );
}

export default PokemonSearch;