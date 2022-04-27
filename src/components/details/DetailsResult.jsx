import React from 'react'
import PropTypes from "prop-types"

export default function DetailsResult({name, value, callback}) {
  return (
    <div className='details-result'>
      <span className='details-result--name'>{name}:</span>
      <span className='details-result--data'>{value}</span>
      <button
        type='button'
        className='button button--details-reroll'
        onClick={callback}
      >
        Reroll
      </button>
    </div>
  )
}

DetailsResult.propTypes = {
  callback: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.string
}
