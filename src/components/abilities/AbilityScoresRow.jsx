import React from 'react'
import AbilityScoreMod from './AbilityScoreMod'
import ScoreName from './ScoreName'
import PropTypes from 'prop-types'
import ScoreBox from '../../containers/abilties/ScoreBox'

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
    rollAttribute
  } = props

  const showPrimeReq = !!characterClass.primeReqs?.includes(abilityScoreName)

  return (
    <React.Fragment>
      <ScoreName
        abilityScoreName={abilityScoreName}
        primeReq={primeReq}
        showPrimeReq={showPrimeReq}
      ></ScoreName>

      <ScoreBox
        abilityScoreValue={abilityScoreValue}
        abilityScoreValueOriginal={abilityScoreValueOriginal}
        abilityScoreName={abilityScoreName}
        scoreIncrease={scoreIncrease}
        scoreDecrease={scoreDecrease}
        canDecrease={canDecrease}
        characterClass={characterClass}
        pointBuy={pointBuy}
        rollAttribute={rollAttribute}
      ></ScoreBox>

      <AbilityScoreMod modArray={modArray}></AbilityScoreMod>
    </React.Fragment>
  )
}

AbilityScoresRow.propTypes = {
  abilityScoreName: PropTypes.string,
  abilityScoreValueOriginal: PropTypes.number,
  primeReq: PropTypes.string,
  characterClass: PropTypes.object,
  abilityScoreValue: PropTypes.number,
  AbilityScoreValueOriginal: PropTypes.number,
  scoreIncrease: PropTypes.func,
  scoreDecrease: PropTypes.func,
  canDecrease: PropTypes.bool,
  pointBuy: PropTypes.number,
  modArray: PropTypes.arrayOf(PropTypes.object),
  rollAttribute: PropTypes.func
}
