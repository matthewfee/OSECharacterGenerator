import React from 'react'
import { Trans } from 'react-i18next'
import PropTypes from 'prop-types'

export default function NavigationOptions(props) {
  const { screen, setScreen, characterClass, abilityScores } = props

  let hasNotRolledAbilityScores = false

  Object.values(abilityScores).forEach((value) => {
    if (!value) {
      hasNotRolledAbilityScores = true
    }
  })

  const hasNotChosenCharacterClass = characterClass.name === null

  return (
    <div>
      <button
        className='button button--class-option'
        onClick={() =>
          setScreen({
            ...screen,
            equipmentScreen: false,
            abilityScreen: false,
            classScreen: true
          })
        }
        disabled={hasNotChosenCharacterClass || hasNotRolledAbilityScores}
        style={
          hasNotChosenCharacterClass || hasNotRolledAbilityScores
            ? { opacity: 0.4 }
            : {}
        }
      >
        <Trans i18nKey='classOptions'>Class Options</Trans>
      </button>
    </div>
  )
}

NavigationOptions.propTypes = {
  abilityScores: PropTypes.objectOf(PropTypes.number),
  characterClass: PropTypes.object,
  rollCharacter: PropTypes.func,
  screen: PropTypes.objectOf(PropTypes.bool),
  setScreen: PropTypes.func,
  rollAttribute: PropTypes.func
}
