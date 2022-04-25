import React from "react"
import { redFail, greenSuccess } from "../constants/constants"
import PropTypes from "prop-types"
import { componentsToColor } from "pdf-lib"

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
    rollAttribute,
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

  //determine text color for ability score

  let buttonColor

  if (abilityScoreValue > 0 && abilityScoreValue <= lowScore) {
    buttonColor = redFail
  }

  if (abilityScoreValue >= highScore) {
    buttonColor = greenSuccess
  }

  const scoreFontSize = abilityScoreValue > 0 ? "30px" : "14px"

  return (
    <button
      className={`ability-score ${
        abilityScoreValue > highScore ? "abilityscore--high" : ""
      }`}
      style={{ color: buttonColor, fontSize: scoreFontSize }}
      value={`${abilityScoreName}`}
      onClick={rollAttribute}
    >
      {abilityScoreValue > 1 ? abilityScoreValue : `ROLL`}

      {showDecreaseButton && (
        <div
          className="button button--ability button--ability--decrease"
          onClick={(e) => {
            e.stopPropagation()
            scoreDecrease(abilityScoreName)
          }}
        >
          <div className="arrow-down"></div>
        </div>
      )}

      {showIncrementButton && (
        <div
          className="button button--ability button--ability--increase"
          onClick={(e) => {
            e.stopPropagation()
            scoreIncrease(abilityScoreName)
          }}
        >
          <div className="arrow-up"></div>
        </div>
      )}
    </button>
  )
}

AbilityScoreBox.propTypes = {
  abilityScoreName: PropTypes.string,
  characterClass: PropTypes.object,
  abilityScoreValue: PropTypes.number,
  AbilityScoreValueOriginal: PropTypes.number,
  scoreIncrease: PropTypes.func,
  scoreDecrease: PropTypes.func,
  canDecrease: PropTypes.bool,
  pointBuy: PropTypes.number,
  rollAttribute: PropTypes.func,
}
