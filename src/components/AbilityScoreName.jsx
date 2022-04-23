import React from "react"
import { Trans } from "react-i18next"

export default function AbilityScoreName(props) {
  const { abilityScoreName, primeReq, showPrimeReq } = props

  return (
    <div className="ability-score-name">
      <h2>
        <Trans i18nKey={`abilityScoreNames.${abilityScoreName}`}></Trans>
      </h2>

      {showPrimeReq && <div className="prime-req">Prime Req: {primeReq}</div>}
    </div>
  )
}
