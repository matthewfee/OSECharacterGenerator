import React from 'react'
import { Trans } from 'react-i18next'
import PropTypes from 'prop-types'
import HPRoller from '../containers/class-details/HPRoller'
import SavingThrows from '../components/class/SavingThrows'
import ClassAbilitiesList from '../components/class/ClassAbilitiesList'
import SpellSelection from '../containers/class-details/SpellSelection'
import Button from '../components/general/Button'

export default function ClassScreen (props) {
  const {
    screen,
    setScreen,
    characterClass,
    characterStatistics,
    setCharacterStatistics,
    characterModifiers
  } = props

  return (
    <div className="class-options-screen">
      <h3 className="header-default">
        <Trans i18nKey="classOptions">Class Options</Trans>
      </h3>

      <HPRoller
      characterClass={characterClass}
      characterStatistics={characterStatistics}
      setCharacterStatistics={setCharacterStatistics}
      characterModifiers={characterModifiers}>
      </HPRoller>

        <div className="saving-throws-menu">
          <h5 className="saving-throws-menu--header">
            {characterClass.name} Saving Throws
          </h5>

          <SavingThrows characterClass={characterClass}></SavingThrows>

        </div>

        <div className="class-ability-menu">
          <h5 className="class-ability-menu--header">
            {characterClass.name} Abilities
          </h5>

          <ClassAbilitiesList characterClass={characterClass}></ClassAbilitiesList>
        </div>

      <SpellSelection
      setCharacterStatistics={setCharacterStatistics}
      characterClass={characterClass}
      ></SpellSelection>

        <Button name={'equipment-options'} text={'Go to Equipment'} callback={() => {
          setScreen({ ...screen, equipmentScreen: true, classScreen: false })
        }}
        >
        </Button>

    </div>
  )
}

ClassScreen.propTypes = {
  screen: PropTypes.objectOf(PropTypes.bool),
  setScreen: PropTypes.func,
  characterClass: PropTypes.object,
  character: PropTypes.object,
  setCharacter: PropTypes.func,
  characterStatistics: PropTypes.shape({
    hitPoints: PropTypes.number,
    armourClass: PropTypes.number,
    spell: PropTypes.string,
    hasSpells: PropTypes.bool,
    unarmouredAC: PropTypes.number
  }),
  setCharacterStatistics: PropTypes.func,
  characterModifiers: PropTypes.object
}
