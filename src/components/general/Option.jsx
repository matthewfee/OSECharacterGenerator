import React from 'react'
import PropTypes from 'prop-types'

export default function Option ({ value }) {
  return (
    <option className={`option option--${value}`} value={value}>
    {value}
  </option>
  )
}

Option.propTypes = {
  value: PropTypes.string
}
