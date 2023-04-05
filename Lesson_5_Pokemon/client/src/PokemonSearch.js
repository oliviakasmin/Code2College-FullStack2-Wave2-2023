import React, { useState } from "react";
// import axios from 'axios';

function PokemonSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // replace with axios code when connect backend
    setSearchResults("test");
    /*
    try {
      const response = await axios.get(`http://localhost:3001/api/pokemon/search?pkmType=${searchTerm}`);
      setSearchResults(response.data);
      console.log(searchResults);
    } catch (error) {
      console.error(error);
    }
    */
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
          <div key={pokemon.pkmName}>
            <h3>{pokemon.pkmName}</h3>
            <p>Type: {pokemon.pkmType}</p>
          </div>
        ))}
      </div>
    </form>
  );
}

export default PokemonSearch;
