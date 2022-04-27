import React from 'react'
import PropTypes from 'prop-types'

export default function CharacterClasses (props) {
  const { callback, classType } = props
  return (
    <div className={`container class-container class-container--${classType}`}>{callback(classType)}</div>
  )
}

CharacterClasses.propTypes = {
  callback: PropTypes.func,
  classType: PropTypes.string
}
