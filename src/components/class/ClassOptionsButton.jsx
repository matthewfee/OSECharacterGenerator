import React from 'react'
import { abilityScoreNames } from '../../constants/constants'
import PropTypes from 'prop-types'

export default function ClassOptionsButton(props) {
  const { characterClass, abilityScores, changeCharacterClass } = props

  const checkAbilityScoreRequirements = (abilityScores, characterClass) => {
    let meetsAbilityScoreRequirements = true

    if (!characterClass.requirements) {
      return meetsAbilityScoreRequirements
    }

    const minimumAbilityScore = 9

    abilityScoreNames.forEach((ability) => {
      if (
        characterClass.requirements.includes(ability) &&
        abilityScores[ability] < minimumAbilityScore
      ) {
        meetsAbilityScoreRequirements = false
      }
    })

    return meetsAbilityScoreRequirements
  }

  return (
    <button
      className='button button-class-option'
      value={characterClass.name}
      key={characterClass.name}
      onClick={changeCharacterClass}
      disabled={!checkAbilityScoreRequirements(abilityScores, characterClass)}
    >
      {characterClass.name}
    </button>
  )
}

ClassOptionsButton.propTypes = {
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
  changeCharacterClass: PropTypes.func
}
