import React from 'react'
import PropTypes from 'prop-types'

export default function AbilityScoreMod({ modArray }) {
  return (
    <div className="ability-mod">
      {modArray.map((item, index) => {
        return (
          <span key={index}>
            {item.text}: {item.value}
          </span>
        )
      })}
    </div>
  )
}

AbilityScoreMod.propTypes = {
  modArray: PropTypes.arrayOf(PropTypes.object)
}
