import React from 'react'
import PropTypes from 'prop-types'
import Header from '../components/general/Header'
import EquipmentStore from '../containers/equipment/EquipmentStore'

export default function EquipmentScreen(props) {
  const {
    characterClass,
    screen,
    setScreen,
    characterModifiers,
    characterStatistics,
    setCharacterStatistics,
    setCharacterEquipment
  } = props

  return (
    <div className='equipment-screen'>
      <Header translation='equipment'></Header>

      <EquipmentStore
        characterClass={characterClass}
        characterModifiers={characterModifiers}
        characterStatistics={characterStatistics}
        setCharacterStatistics={setCharacterStatistics}
        setCharacterEquipment={setCharacterEquipment}
        screen={screen}
        setScreen={setScreen}
      ></EquipmentStore>
    </div>
  )
}

EquipmentScreen.propTypes = {
  characterClass: PropTypes.object,
  screen: PropTypes.objectOf(PropTypes.bool),
  setScreen: PropTypes.func,
  characterModifiers: PropTypes.objectOf(PropTypes.string),
  characterStatistics: PropTypes.shape({
    hitPoints: PropTypes.number,
    armourClass: PropTypes.number,
    spell: PropTypes.string,
    hasSpells: PropTypes.bool,
    unarmouredAC: PropTypes.number
  }),
  setCharacterStatistics: PropTypes.func,
  pointBuy: PropTypes.number,
  characterEquipment: PropTypes.shape({
    armour: PropTypes.array,
    weapons: PropTypes.array,
    adventuringGear: PropTypes.array,
    gold: PropTypes.number
  }),
  randomNumbers: PropTypes.array,
  setCharacterEquipment: PropTypes.func
}
