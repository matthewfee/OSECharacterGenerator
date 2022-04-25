import React from "react"
import "./css/App.css"
import "./css/normalize.css"
import "./css/skeleton.css"
import "./img/header.jpg"
import CharacterGenerator from "./components/CharacterGenerator"
import { useTranslation, Trans } from "react-i18next"
import { Dice } from "./components/DiceBox"

Dice.init().then(() => {
  // clear dice on click anywhere on the screen
  document.addEventListener("mousedown", () => {
    const diceBoxCanvas = document.getElementById("dice-canvas")
    if (window.getComputedStyle(diceBoxCanvas).display !== "none") {
      Dice.hide().clear()
    }
  })
})
const d6 = () => {
  Dice.show().roll("1d6")
}

class App extends React.Component {
  render() {
    return <CharacterGenerator />
  }
}

export default App
