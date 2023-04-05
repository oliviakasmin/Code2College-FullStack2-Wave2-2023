import "./App.css";
import React, { useState } from "react";
import PokemonSearch from "./PokemonSearch";
// import Axios from 'axios';

function App() {
  const [pkmName, setPkmName] = useState("");
  const [Type, setType] = useState("");

  const submitPokemon = () => {
    // replace with axios code when connect backend
    console.log("submit");
    console.log(pkmName);
    console.log(Type);

    // Axios.post("http://localhost:3001/api/insert", {
    //   pkmName:pkmName,
    //   pkmType:Type,
    // }).then(()=>{
    //   alert('successful insert');
    // });
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
          name="pkmName"
          onChange={(e) => {
            setPkmName(e.target.value);
          }}
        />

        <label>Pokemon Type</label>
        <input
          type="text"
          name="pkmType"
          onChange={(e) => {
            setType(e.target.value);
          }}
        />

        <button onClick={submitPokemon}> Submit </button>
      </div>
      <div id="search">
        <PokemonSearch />
      </div>
    </div>
  );
}

export default App;
