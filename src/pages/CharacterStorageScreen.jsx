import React, { useState, useEffect } from 'react'
import { CHARACTER_STORAGE } from '../constants/constants'
import PropTypes from 'prop-types'

export default function CharacterStorageScreen(props) {
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

  const [myCharacters, setMyCharacters] = useState([])

  useEffect(() => {
    const characters = JSON.parse(
      window.localStorage.getItem(CHARACTER_STORAGE)
    )
    setMyCharacters(characters)
  }, [])

  const handleCharacter = (e, index, action) => {
    e.stopPropagation()

    const characterObject = myCharacters[index]
    const newStorage = [...myCharacters]
    switch (action) {
      case 'setActiveCharacter':
        setCharacter(characterObject.character)
        setCharacterStatistics(characterObject.characterStatistics)
        setCharacterClass(characterObject.characterClass)
        setCharacterEquipment(characterObject.characterEquipment)
        setCharacterModifiers(characterObject.characterModifiers)
        setAbilityScores(characterObject.abilityScores)
        setCharacterRolled(true)

        setScreen({
          ...screen,
          characterSheetScreen: true,
          characterStorageScreen: false
        })

        break

      case 'deleteCharacter':
        newStorage.splice(index, 1)
        localStorage.setItem(CHARACTER_STORAGE, JSON.stringify(newStorage))
        setMyCharacters(newStorage)
        break
      default:
    }
  }

  const characterButton = (char, index) => {
    const characterStorageName = char.character.name

    return (
      <button
        className="character-button"
        key={index}
        onClick={(e) => handleCharacter(e, index, 'setActiveCharacter')}
        value={index}
        name="setActiveCharacter"
      >
        <div className="character-button--name" value={index}>
          {characterStorageName}
        </div>
        <div className="character-button--level" value={index}>
          {char.characterClass.name}
        </div>

        <div
          onClick={(e) => handleCharacter(e, index, 'deleteCharacter')}
          className="character-button--delete"
          key={index}
          value={index}
          name="deleteCharacter"
        >
          x
        </div>
      </button>
    )
  }

  return (
    <div className="character-storage-screen">
      <h3 className="header-default"> Tavern </h3>

      <div className="character-storage">
        {myCharacters
          ? myCharacters.map((item, index) => characterButton(item, index))
          : ''}
      </div>

      <button
        className="button--new-character"
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
