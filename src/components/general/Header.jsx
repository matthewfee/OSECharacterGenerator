import React from 'react'
import PropTypes from 'prop-types'
import { Trans } from 'react-i18next'

export default function Header({ name, text, translation }) {
  return (
    <h2 className={`header header-default header--${name}`}>
      {text}
      {translation ? <Trans i18nKey={`${translation}`}></Trans> : ''}
    </h2>
  )
}

Header.propTypes = {
  name: PropTypes.string,
  text: PropTypes.string,
  translation: PropTypes.string
}
