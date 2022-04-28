import React from 'react'
import PropTypes from 'prop-types'
import Header from '../components/general/Header'
import CharacterDetails from '../containers/character-details/CharacterDetails'

export default function DetailsScreen(props) {
  const {
    screen,
    setScreen,
    character,
    setCharacter,
    characterClass,
    characterModifiers,
    diceEnabled
  } = props

  return (
    <div className='details-screen-container'>
      <div id='print-wrapper'>
        <Header translation='characterDetails'></Header>

        <CharacterDetails
          screen={screen}
          setScreen={setScreen}
          character={character}
          setCharacter={setCharacter}
          characterClass={characterClass}
          characterModifiers={characterModifiers}
          diceEnabled={diceEnabled}
        ></CharacterDetails>
      </div>
    </div>
  )
}

DetailsScreen.propTypes = {
  diceEnabled: PropTypes.func,
  screen: PropTypes.objectOf(PropTypes.bool),
  setScreen: PropTypes.func,
  character: PropTypes.object,
  setCharacter: PropTypes.func,
  characterClass: PropTypes.object,
  characterModifiers: PropTypes.objectOf(PropTypes.string)
}
