import React from "react";
import "./css/App.css";
import "./css/normalize.css";
import "./css/skeleton.css";
import "./img/header.jpg";
import CharacterGenerator from "./components/CharacterGenerator";
import { useTranslation, Trans } from "react-i18next";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <CharacterGenerator />
        </div>
      </Router>
    );
  }
}

export default App;
