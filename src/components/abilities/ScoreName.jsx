import React from 'react'
import { Trans } from 'react-i18next'
import PropTypes from 'prop-types'

export default function ScoreName(props) {
  const { abilityScoreName, primeReq, showPrimeReq } = props

  return (
    <div className='ability-score-name'>
      <h2>
        <Trans i18nKey={`abilityScoreNames.${abilityScoreName}`}></Trans>
      </h2>

      {showPrimeReq && <div className='prime-req'>Prime Req: {primeReq}</div>}
    </div>
  )
}

ScoreName.propTypes = {
  abilityScoreName: PropTypes.string,
  primeReq: PropTypes.string,
  showPrimeReq: PropTypes.bool
}
