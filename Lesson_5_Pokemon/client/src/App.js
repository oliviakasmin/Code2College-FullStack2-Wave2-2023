import "./App.css";
import React, { useState } from "react";
import Axios from "axios";
import PokemonSearch from "./PokemonSearch";

function App() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");

  const submitPokemon = () => {
    try {
      Axios.post("http://localhost:3001/api/insert", {
        name: name,
        type: type,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <h1>POKEMON APPLICATION</h1>
      <img
        id="bannerImg"
        src="https://cdn.vox-cdn.com/thumbor/IKt535q8LMnJDddmLL74TBtzv88=/0x266:1024x949/1280x854/cdn.vox-cdn.com/uploads/chorus_image/image/48942277/N3DS_PokemonSuperMysteryDungeon_MainIllustration_png_jpgcopy.0.0.jpg"
        alt=""
      />

      <div className="form">
        <label>Pokemon Name</label>
        <input
          type="text"
          name="name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />

        <label>Pokemon Type</label>
        <input
          type="text"
          name="type"
          onChange={(e) => {
            setType(e.target.value);
          }}
        />
        <button onClick={submitPokemon}> Submit </button>
      </div>
      <PokemonSearch />
    </div>
  );
}

export default App;