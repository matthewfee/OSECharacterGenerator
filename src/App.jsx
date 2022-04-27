import React from 'react'
import './css/App.css'
import './css/normalize.css'
import './css/skeleton.css'
import './img/header.jpg'
import CharacterGenerator from './pages/CharacterGenerator'
import { Dice } from './utilities/DiceBox'

Dice.init().then(() => {
  // clear dice on click anywhere on the screen
  document.addEventListener('mousedown', () => {
    const diceBoxCanvas = document.getElementById('dice-canvas')
    if (window.getComputedStyle(diceBoxCanvas).display !== 'none') {
      Dice.hide().clear()
    }
  })
})

class App extends React.Component {
  render() {
    return <CharacterGenerator />
  }
}

export default App
