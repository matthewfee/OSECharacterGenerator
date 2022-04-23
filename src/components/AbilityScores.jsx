import React from "react"
import AbilityScoreBox from "./AbilityScoreBox"
import { redFail, Thief } from "../constants/constants"
import { abilityScoreNames } from "../constants/constants"
import { Trans } from "react-i18next"
import AbilityScoresList from "./AbilityScoresList"

export default function AbilityScores(props) {
  const {
    abilityScores,
    characterClass,
    setAbilityScores,
    pointBuy,
    setPointBuy,
    characterModifiers,
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
    charismaModLoyalty,
  } = characterModifiers

  const scoreIncrease = (key) => {
    const keyOriginal = key + "Original"
    const value = abilityScores[key]

    //check if score has already been decreased

    const increment = value < abilityScores[keyOriginal] ? 2 : 1

    if (pointBuy < 1) {
      return
    }

    const maximumAbilityScore = 18

    if (value === maximumAbilityScore) {
      return
    }

    let newValue = value + increment

    setAbilityScores({ ...abilityScores, [key]: newValue })
    setPointBuy(pointBuy - 1)
  }

  const scoreDecrease = (key) => {
    const keyOriginal = key + "Original"
    const value = abilityScores[key]
    let decrement = value > abilityScores[keyOriginal] ? -1 : -2

    if (abilityScores[key] <= 10) {
      return
    }

    let newValue = value + decrement

    setPointBuy(pointBuy + 1)
    setAbilityScores({ ...abilityScores, [key]: newValue })
  }

  const abilityScoreModDescriptions = {
    strength: [
      { text: "Melee Attacks", value: strengthModMelee },
      { text: "Open Doors", value: strengthModDoors },
    ],
    intelligence: [
      { text: "Languages", value: intelligenceModLanguages },
      { text: "Literacy", value: intelligenceModLiteracy },
    ],
    dexterity: [
      { text: "AC", value: dexterityModAC },
      { text: "Missiles", value: dexterityModMissiles },
      { text: "Initiative", value: dexterityModInitiative },
    ],
    wisdom: [{ text: "Magic Saves", value: wisdomMod }],
    constitution: [{ text: "Hit Points", value: constitutionMod }],
    charisma: [
      { text: "NPC Reactions", value: charismaModNPCReactions },
      { text: "Retainers Max #", value: charismaModNPCReactions },
      { text: "Loyalty", value: charismaModLoyalty },
    ],
  }

  const abilityScoresCanDecrease = {
    strength: characterClass.name === Thief ? false : true,
    intelligence: true,
    dexterity: true,
    wisdom: false,
    constitution: false,
    charisma: false,
  }

  return (
    <div className="container ability-score-container">
      {pointBuy > 0 && <div className="point-buy">Point Buy: {pointBuy}</div>}

      {abilityScoreNames.map((abilityScoreName) => {
        const originalScore = `${abilityScoreName}Original`

        return (
          <AbilityScoresList
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
          ></AbilityScoresList>
        )
      })}
    </div>
  )
}
