import React from 'react'
import PropTypes from 'prop-types'
import { Trans } from 'react-i18next'

export default function Header ({ name, text, translation }) {
  return (
    <div className={`header-default header-default--${name}`}>
        {text}
        {translation ? <Trans i18nKey={`${translation}`}></Trans> : ''}
    </div>
  )
}

Header.propTypes = {
  name: PropTypes.string,
  text: PropTypes.string,
  translation: PropTypes.string
}
