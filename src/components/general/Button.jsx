import React from 'react'
import PropTypes from 'prop-types'

export default function Button({
  name,
  callback,
  text,
  color,
  disabled,
  children,
  value
}) {
  return (
    <button
      className={`button button--${name}`}
      style={{ 'backgroundColor': color }}
      value={value}
      onClick={callback}
      disabled={disabled}
    >
      {text} {children}
    </button>
  )
}

Button.propTypes = {
  name: PropTypes.string,
  callback: PropTypes.func,
  text: PropTypes.string,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.any,
  value: PropTypes.string
}
