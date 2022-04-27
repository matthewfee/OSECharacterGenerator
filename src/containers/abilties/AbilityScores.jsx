import React from 'react'
import { Thief, abilityScoreNames } from '../../constants/constants'
import AbilityScoresRow from '../../components/abilities/AbilityScoresRow'
import PropTypes from 'prop-types'

export default function AbilityScores(props) {
  const {
    abilityScores,
    characterClass,
    setAbilityScores,
    pointBuy,
    setPointBuy,
    characterModifiers,
    rollAttribute
  } = props

  const {
    primeReq,
    strengthModMelee,
    strengthModDoors,
    intelligenceModLanguages,
    intelligenceModLiteracy,
    wisdomMod,
    dexterityModAC,
    dexterityModMissiles,
    dexterityModInitiative,
    constitutionMod,
    charismaModNPCReactions,
    charismaModRetainersMax,
    charismaModLoyalty
  } = characterModifiers

  const scoreIncrease = (key) => {
    const keyOriginal = key + 'Original'
    const value = abilityScores[key]

    // check if score has already been decreased

    const increment = value < abilityScores[keyOriginal] ? 2 : 1

    if (pointBuy < 1) {
      return
    }

    const maximumAbilityScore = 18

    if (value === maximumAbilityScore) {
      return
    }

    const newValue = value + increment

    setAbilityScores({ ...abilityScores, [key]: newValue })
    setPointBuy(pointBuy - 1)
  }

  const scoreDecrease = (key) => {
    const keyOriginal = key + 'Original'
    const value = abilityScores[key]
    const decrement = value > abilityScores[keyOriginal] ? -1 : -2

    if (abilityScores[key] <= 10) {
      return
    }

    const newValue = value + decrement

    setPointBuy(pointBuy + 1)
    setAbilityScores({ ...abilityScores, [key]: newValue })
  }

  const abilityScoreModDescriptions = {
    strength: [
      { text: 'Melee Attacks', value: strengthModMelee },
      { text: 'Doors', value: strengthModDoors }
    ],
    intelligence: [
      { text: 'Languages', value: intelligenceModLanguages },
      { text: 'Literacy', value: intelligenceModLiteracy }
    ],
    dexterity: [
      { text: 'AC', value: dexterityModAC },
      { text: 'Missiles', value: dexterityModMissiles },
      { text: 'Initiative', value: dexterityModInitiative }
    ],
    wisdom: [{ text: 'Magic Saves', value: wisdomMod }],
    constitution: [{ text: 'Hit Points', value: constitutionMod }],
    charisma: [
      { text: 'Reactions', value: charismaModNPCReactions },
      { text: 'Max Retainers', value: charismaModRetainersMax },
      { text: 'Loyalty', value: charismaModLoyalty }
    ]
  }

  const abilityScoresCanDecrease = {
    strength: characterClass.name !== Thief,
    intelligence: true,
    dexterity: true,
    wisdom: false,
    constitution: false,
    charisma: false
  }

  return (
    <div className='container ability-score-container'>
      {pointBuy > 0 && <div className='point-buy'>Point Buy: {pointBuy}</div>}

      {abilityScoreNames.map((abilityScoreName, index) => {
        const originalScore = `${abilityScoreName}Original`

        return (
          <AbilityScoresRow
            key={index}
            abilityScoreName={abilityScoreName}
            primeReq={primeReq}
            abilityScoreValue={abilityScores[abilityScoreName]}
            abilityScoreValueOriginal={abilityScores[originalScore]}
            scoreIncrease={scoreIncrease}
            scoreDecrease={scoreDecrease}
            canDecrease={abilityScoresCanDecrease[abilityScoreName]}
            characterClass={characterClass}
            pointBuy={pointBuy}
            modArray={abilityScoreModDescriptions[abilityScoreName]}
            rollAttribute={rollAttribute}
          ></AbilityScoresRow>
        )
      })}
    </div>
  )
}

AbilityScores.propTypes = {
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
  setAbilityScores: PropTypes.func,
  pointBuy: PropTypes.number,
  setPointBuy: PropTypes.func,
  characterModifiers: PropTypes.objectOf(PropTypes.string),
  rollAttribute: PropTypes.func
}
