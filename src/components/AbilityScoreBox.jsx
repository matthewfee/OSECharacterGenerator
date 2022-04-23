import React from "react"
import { redFail } from "../constants/constants"

export default function AbilityScoreBox(props) {
  const {
    abilityScoreValue,
    abilityScoreValueOriginal,
    abilityScoreName,
    scoreIncrease,
    scoreDecrease,
    canDecrease,
    characterClass,
    pointBuy,
  } = props

  const lowScore = 6
  const highScore = 15
  const maxScore = 18
  const minimumDecrementRequirement = 10

  let showIncrementButton = false

  let hasPointstoIncrease =
    characterClass.primeReqs?.includes(abilityScoreName) ||
    abilityScoreValue < abilityScoreValueOriginal

  if (pointBuy > 0 && hasPointstoIncrease && abilityScoreValue < maxScore) {
    showIncrementButton = true
  }

  const showDecreaseButton =
    abilityScoreValue > minimumDecrementRequirement && canDecrease

  return (
    <div
      className={`ability-score ${
        abilityScoreValue > highScore ? "abilityscore--high" : ""
      }`}
      style={{ color: abilityScoreValue < lowScore ? redFail : "" }}
    >
      {abilityScoreValue}

      {showDecreaseButton && (
        <button
          className="button button--ability button--ability--decrease"
          onClick={() => {
            scoreDecrease(abilityScoreName)
          }}
        >
          <div className="arrow-down"></div>
        </button>
      )}

      {showIncrementButton && (
        <button
          className="button button--ability button--ability--increase"
          onClick={() => {
            scoreIncrease(abilityScoreName)
          }}
        >
          <div className="arrow-up"></div>
        </button>
      )}
    </div>
  )
}
