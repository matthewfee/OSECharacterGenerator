import React from "react";
import "./css/App.css";
import "./css/normalize.css";
import "./css/skeleton.css";
import "./img/header.jpg";
import NewCharacter from "./components/NewCharacter";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <NewCharacter />
      </div>
    );
  }
}

export default App;
