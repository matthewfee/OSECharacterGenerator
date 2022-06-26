import React from 'react'
import PropTypes from 'prop-types'

const NumberInput = ({ defaultValue, editMode }) => {
  return (
    <input
      type='number'
      defaultValue={defaultValue}
      className={`character-sheet--number-input ${
        editMode ? '' : 'character-sheet--number-no-edit'
      }`}
      disabled={!editMode}
    />
  )
}

NumberInput.propTypes = {
  defaultValue: PropTypes.number,
  editMode: PropTypes.bool
}

export default NumberInput
