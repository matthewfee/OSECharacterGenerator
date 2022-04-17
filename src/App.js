import React from "react";
import "./css/App.css";
import "./css/normalize.css";
import "./css/skeleton.css";
import "./img/header.jpg";
import CharacterGenerator from "./components/CharacterGenerator";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <CharacterGenerator />
      </div>
    );
  }
}

export default App;
