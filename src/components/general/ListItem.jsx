import React from 'react'
import PropTypes from 'prop-types'

export default function ListItem({ type, value }) {
  return (
    <li className={`list-item list-item--${type}`}>
          <b>{type}:</b> {value}
    </li>
  )
}

ListItem.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string
}
