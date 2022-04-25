import React from "react"
import { Trans } from "react-i18next"
import PropTypes from "prop-types"

export default function NavigationOptions(props) {
  const { rollCharacter, screen, setScreen, characterClass, rollAttribute } =
    props
  return (
    <div>
      <button
        className="button button--reroll"
        value={`all`}
        onClick={rollAttribute}
      >
        Reroll
      </button>
      <button
        className="button button--class-option"
        onClick={() =>
          setScreen({
            ...screen,
            equipmentScreen: false,
            abilityScreen: false,
            classScreen: true,
          })
        }
        disabled={characterClass.name === null ? true : false}
        style={characterClass.name === null ? { opacity: 0.4 } : {}}
      >
        <Trans i18nKey="classOptions">Class Options</Trans>
      </button>{" "}
    </div>
  )
}

NavigationOptions.propTypes = {
  characterClass: PropTypes.object,
  rollCharacter: PropTypes.func,
  screen: PropTypes.objectOf(PropTypes.bool),
  setScreen: PropTypes.func,
}
