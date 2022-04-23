import React from "react"
import AbilityScoreBox from "./AbilityScoreBox"
import AbilityScoreMod from "./AbilityScoreMod"
import AbilityScoreName from "./AbilityScoreName"

export default function AbilityScoresList(props) {
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
      ></AbilityScoreBox>

      <AbilityScoreMod modArray={modArray}></AbilityScoreMod>
    </React.Fragment>
  )
}
