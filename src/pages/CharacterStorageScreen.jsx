import React from 'react'
import PropTypes from 'prop-types'
import CharacterStorage from '../containers/storage/CharacterStorage'
import Header from '../components/general/Header'

export default function CharacterStorageScreen (props) {
  const {
    screen,
    setScreen,
    setCharacter,
    setAbilityScores,
    setCharacterStatistics,
    setCharacterClass,
    setCharacterEquipment,
    setCharacterModifiers,
    setCharacterRolled
  } = props


  return (
    <div className='character-storage-screen'>
      <Header name='tavern' text='tavern'></Header>
      <CharacterStorage
        screen={screen}
        setScreen={setScreen}
        setCharacter={setCharacter}
        setAbilityScores={setAbilityScores}
        setCharacterStatistics={setCharacterStatistics}
        setCharacterClass={setCharacterClass}
        setCharacterEquipmen={setCharacterEquipment}
        setCharacterModifiers={setCharacterModifiers}
        setCharacterRolled={setCharacterRolled}
      ></CharacterStorage>

      <button
        className='button--new-character'
        onClick={() => {
          setScreen({
            ...screen,
            abilityScreen: true,
            characterStorageScreen: false
          })
          setCharacterRolled(false)
        }}
      >
        Back to Main
      </button>
    </div>
  )
}

CharacterStorageScreen.propTypes = {
  screen: PropTypes.objectOf(PropTypes.bool),
  setScreen: PropTypes.func,
  character: PropTypes.object,
  setCharacter: PropTypes.func,
  characterStatistics: PropTypes.shape({
    hitPoints: PropTypes.number,
    armourClass: PropTypes.number,
    spell: PropTypes.string,
    hasSpells: PropTypes.bool,
    unarmouredAC: PropTypes.number
  }),
  setCharacterStatistics: PropTypes.func,
  characterClass: PropTypes.object,
  setCharacterClass: PropTypes.func,
  characterEquipment: PropTypes.shape({
    armour: PropTypes.array,
    weapons: PropTypes.array,
    adventuringGear: PropTypes.array,
    gold: PropTypes.number
  }),
  setCharacterEquipment: PropTypes.func,
  characterModifiers: PropTypes.objectOf(PropTypes.string),
  setCharacterModifiers: PropTypes.func,
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
  setAbilityScores: PropTypes.func,
  setCharacterRolled: PropTypes.func
}
