import React from 'react'
import PropTypes from 'prop-types'

export default function WeaponOptionsContainer(props) {
  const {
    characterClass,
    weaponSelected,
    updateSelectedWeapon,
    weaponsList,
    storeHandler,
    selectRandomWeapon
  } = props

  return (
    <React.Fragment>
      <div className='equipment-container--header'>
        {characterClass.name} Weapons
      </div>

      <div className='equipment-restrictions'>
        Allowed Weapons: {characterClass.weapons}
      </div>

      <div className='weapons-container'>
        <select
          className='weapons-select'
          value={weaponSelected}
          onChange={updateSelectedWeapon}
        >
          {weaponsList()}
        </select>

        <button className='button--random-weapon' onClick={selectRandomWeapon}>
          Random
        </button>

        <input
          className='button--buy-weapon'
          type='submit'
          value='Buy'
          onClick={() => storeHandler(weaponSelected, 'buy', 'weapon')}
          price={null}
        />
      </div>
    </React.Fragment>
  )
}

WeaponOptionsContainer.propTypes = {
  characterClass: PropTypes.object,
  weaponSelected: PropTypes.string,
  updateSelectedWeapon: PropTypes.func,
  weaponsList: PropTypes.func,
  selectRandomWeapon: PropTypes.func,
  storeHandler: PropTypes.func
}
