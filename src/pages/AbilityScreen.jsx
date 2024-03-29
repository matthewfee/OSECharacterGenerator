import React from 'react'
import Classes from '../containers/classes/Classes'
import AbilityScores from '../containers/abilties/AbilityScores'
import NavigationOptions from '../containers/abilties/NavigationOptions'
import PropTypes from 'prop-types'
import Header from '../components/general/Header'

import { useEffect } from 'react'

export default function AbilityScreen(props) {
  const {
    characterClass,
    abilityScores,
    changeCharacterClass,
    setAbilityScores,
    pointBuy,
    setPointBuy,
    characterModifiers,
    rollCharacter,
    rollAttribute,
    screen,
    setScreen,
    diceEnabled
  } = props

  useEffect(() => {
    console.log('Loaded')

    if (!diceEnabled) {
      rollAttribute('e', 'all')
    }
  }, [])

  return (
    <div className='ability-screen container'>
      <Header translation={'characterClass'} name={'character-class'}></Header>

      <Classes
        characterClass={characterClass}
        abilityScores={abilityScores}
        changeCharacterClass={changeCharacterClass}
      ></Classes>

      <Header translation={'abilityScores'} name={'character-class'}></Header>

      <AbilityScores
        abilityScores={abilityScores}
        setAbilityScores={setAbilityScores}
        pointBuy={pointBuy}
        setPointBuy={setPointBuy}
        characterClass={characterClass}
        characterModifiers={characterModifiers}
        rollAttribute={rollAttribute}
      ></AbilityScores>

      <NavigationOptions
        rollAttribute={rollAttribute}
        rollCharacter={rollCharacter}
        screen={screen}
        setScreen={setScreen}
        characterClass={characterClass}
        abilityScores={abilityScores}
      ></NavigationOptions>
    </div>
  )
}

AbilityScreen.propTypes = {
  characterRolled: PropTypes.bool,
  characterClass: PropTypes.object,
  abilityScores: PropTypes.shape({
    strength: PropTypes.number,
    strengthOriginal: PropTypes.number,
    intelligence: PropTypes.number,
    intelligenceOriginal: PropTypes.number,
    wisdom: PropTypes.number,
    wisdomOriginal: PropTypes.number,
    dexterity: PropTypes.number,
    dexterityOriginal: PropTypes.number,
    constitution: PropTypes.number,
    constitutionOriginal: PropTypes.number,
    charisma: PropTypes.number,
    charismaOriginal: PropTypes.number
  }),
  changeCharacterClass: PropTypes.func,
  setAbilityScores: PropTypes.func,
  pointBuy: PropTypes.number,
  setPointBuy: PropTypes.func,
  characterModifiers: PropTypes.objectOf(PropTypes.string),
  rollCharacter: PropTypes.func,
  screen: PropTypes.objectOf(PropTypes.bool),
  setScreen: PropTypes.func,
  rollAttribute: PropTypes.func,
  diceEnabled: PropTypes.bool
}
