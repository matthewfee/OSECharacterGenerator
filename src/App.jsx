import React from "react"
import "./css/App.css"
import "./css/normalize.css"
import "./css/skeleton.css"
import "./img/header.jpg"
import CharacterGenerator from "./components/CharacterGenerator"
import { useTranslation, Trans } from "react-i18next"

class App extends React.Component {
  render() {
    return <CharacterGenerator />
  }
}

export default App