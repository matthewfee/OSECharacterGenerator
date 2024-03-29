import React from 'react'
import { armourTypes } from '../../constants/constants'
import PropTypes from 'prop-types'

export default function ArmourOptionsContainer(props) {
  const {
    characterClass,
    armourSelected,
    handleOptionChange,
    shieldSelected,
    handleShieldChange,
    storeHandler
  } = props

  return (
    <div className='armour-container-parent'>
      <div className='equipment-container--header'>
        {characterClass.name} Armour
      </div>

      <div className='equipment-restrictions'>
        Allowed Armour: {characterClass.armour}
      </div>

      <div className='armour-container'>
        <div className='radio-container'>
          <label className='armour-radio'>
            <input
              type='radio'
              value={armourTypes.unarmoured}
              className='form-check-input'
              onChange={handleOptionChange}
              checked={armourSelected === armourTypes.unarmoured}
            />
            Unarmoured - AC 9 [10] - 0 gp
          </label>

          {characterClass.armour.includes('leather') && (
            <label className='armour-radio'>
              <input
                type='radio'
                value={armourTypes.leather}
                className='form-check-input'
                checked={armourSelected === armourTypes.leather}
                onChange={handleOptionChange}
                disabled={!characterClass.armour.includes('leather')}
              />

              <span className='radio--label'>Leather - AC 7 [12] - 20 gp</span>
            </label>
          )}

          {characterClass.armour.includes('chainmail') && (
            <label className='armour-radio'>
              <input
                type='radio'
                value={armourTypes.chainMail}
                className='form-check-input'
                checked={armourSelected === armourTypes.chainMail}
                onChange={handleOptionChange}
                disabled={!characterClass.armour.includes('chainmail')}
              />
              <span className='radio--label'>
                Chainmail - AC 5 [14] - 40 gp
              </span>
            </label>
          )}

          {characterClass.armour.includes('plate') && (
            <label className='armour-radio'>
              <input
                type='radio'
                value={armourTypes.plateMail}
                className='form-check-input'
                checked={armourSelected === armourTypes.plateMail}
                onChange={handleOptionChange}
                disabled={!characterClass.armour.includes('plate')}
              />
              <span className='radio--label'>
                Plate mail - AC 3 [16] - 60 gp
              </span>
            </label>
          )}

          {characterClass.armour.includes('shield') && (
            <label className='armour-radio'>
              <input
                type='checkbox'
                value={armourTypes.shield}
                className='form-check-input'
                checked={shieldSelected === true}
                onChange={handleShieldChange}
                disabled={!characterClass.armour.includes('shields')}
              />
              Shield (AC +1 bonus) - 10gp
            </label>
          )}
        </div>

        <div className='armour-button-container'>
          <button
            className='button--buy-armour'
            type='button'
            value='Choose'
            onClick={() => {
              storeHandler(armourSelected, 'buy', 'armour')
            }}
            price={null}
            disabled={!armourSelected}
          >
            Choose
          </button>
        </div>
      </div>
    </div>
  )
}

ArmourOptionsContainer.propTypes = {
  characterClass: PropTypes.object,
  handleOptionChange: PropTypes.func,
  armourSelected: PropTypes.string,
  shieldSelected: PropTypes.bool,
  handleShieldChange: PropTypes.func,
  storeHandler: PropTypes.func
}
