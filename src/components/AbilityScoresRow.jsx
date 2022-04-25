import React from "react"
import AbilityScoreBox from "./AbilityScoreBox"
import AbilityScoreMod from "./AbilityScoreMod"
import AbilityScoreName from "./AbilityScoreName"
import PropTypes from "prop-types"

export default function AbilityScoresRow(props) {
  const {
    abilityScoreName,
    abilityScoreValue,
    abilityScoreValueOriginal,
    scoreIncrease,
    scoreDecrease,
    canDecrease,
    characterClass,
    pointBuy,
    primeReq,
    modArray,
    rollAttribute,
  } = props

  const showPrimeReq = characterClass.primeReqs?.includes(abilityScoreName)
    ? true
    : false

  return (
    <React.Fragment>
      <AbilityScoreName
        abilityScoreName={abilityScoreName}
        primeReq={primeReq}
        showPrimeReq={showPrimeReq}
      ></AbilityScoreName>

      <AbilityScoreBox
        abilityScoreValue={abilityScoreValue}
        abilityScoreValueOriginal={abilityScoreValueOriginal}
        abilityScoreName={abilityScoreName}
        scoreIncrease={scoreIncrease}
        scoreDecrease={scoreDecrease}
        canDecrease={canDecrease}
        characterClass={characterClass}
        pointBuy={pointBuy}
        rollAttribute={rollAttribute}
      ></AbilityScoreBox>

      <AbilityScoreMod modArray={modArray}></AbilityScoreMod>
    </React.Fragment>
  )
}

AbilityScoresRow.propTypes = {
  abilityScoreName: PropTypes.string,
  primeReq: PropTypes.string,
  characterClass: PropTypes.object,
  abilityScoreValue: PropTypes.number,
  AbilityScoreValueOriginal: PropTypes.number,
  scoreIncrease: PropTypes.func,
  scoreDecrease: PropTypes.func,
  canDecrease: PropTypes.bool,
  pointBuy: PropTypes.number,
  characterClass: PropTypes.object,
  modArray: PropTypes.arrayOf(PropTypes.object),
}
