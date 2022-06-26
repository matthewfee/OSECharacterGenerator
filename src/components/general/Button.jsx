import React from 'react'
import PropTypes from 'prop-types'

export default function Button({ name, callback, color, children }) {
  return (
    <button
      className={`button button--${name}`}
      style={{ 'backgroundColor': color }}
      onClick={() => {
        callback()
      }}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  name: PropTypes.string,
  callback: PropTypes.func,
  text: PropTypes.string,
  color: PropTypes.string,
  children: PropTypes.node
}
