import React from 'react'
import PropTypes from 'prop-types'

const TextInput = ({ defaultValue, editMode }) => {
  return (
    <input
      type='text'
      defaultValue={defaultValue}
      className={`character-sheet--text-input ${
        editMode ? '' : 'character-sheet--text-no-edit'
      }`}
      disabled={!editMode}
    />
  )
}

TextInput.propTypes = {
  defaultValue: PropTypes.string,
  editMode: PropTypes.bool
}

export default TextInput
