import React from 'react'
import PropTypes from 'prop-types'

export default function Arrow (props) {
  const { abilityScoreName, direction, callBack } = props

  let classDirection

  if (direction === 'up') {
    classDirection = 'increase'
  } else {
    classDirection = 'decrease'
  }

  return (
    <div
      className={`button button--ability button--ability--${classDirection}`}
      onClick={(e) => {
        e.stopPropagation()
        callBack(abilityScoreName)
      }}
    >
      <div className={`arrow-${direction}`}></div>
    </div>
  )
}

Arrow.propTypes = {
  abilityScoreName: PropTypes.string,
  direction: PropTypes.string,
  callBack: PropTypes.func
}
