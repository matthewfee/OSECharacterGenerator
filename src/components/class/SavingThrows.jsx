import React from 'react'
import PropTypes from 'prop-types'

export default function SavingThrows({ characterClass }) {
  return (
    <div className='saving-throws container'>
      <div className='saving-throw--death saving-throw-name'>Death </div>
      <div className='saving-throw--death--value saving--value'>
        {characterClass.savingThrows[0]}
      </div>
      <div className='saving-throw--wands saving-throw-name'>Wands </div>
      <div className='saving-throw--wands--value saving--value'>
        {characterClass.savingThrows[1]}
      </div>
      <div className='saving-throw--paralysis saving-throw-name'>
        Paralysis{' '}
      </div>
      <div className='saving-throw--paralysis--value saving--value'>
        {characterClass.savingThrows[2]}
      </div>
      <div className='saving-throw--breath saving-throw-name'>Breath</div>
      <div className='saving-throw--breath--value saving--value'>
        {characterClass.savingThrows[3]}
      </div>
      <div className='saving-throw--spells saving-throw-name'>Spells </div>
      <div className='saving-throw--spells--value saving--value'>
        {characterClass.savingThrows[4]}
      </div>
    </div>
  )
}

SavingThrows.propTypes = {
  characterClass: PropTypes.object
}
