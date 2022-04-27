import React from 'react'
import PropTypes from 'prop-types'

export default function Checkbox(props) {
  const { value, checkedCondition, callback } = props

  return (
    <input
        type="checkbox"
        value={value}
        className={`checkbox --${value}`}
        checked={checkedCondition}
        key={callback}
        onChange={() => callback()}
    >
    </input>
  )
}

Checkbox.propTypes = {
  value: PropTypes.string,
  checkedCondition: PropTypes.bool,
  callback: PropTypes.func
}
