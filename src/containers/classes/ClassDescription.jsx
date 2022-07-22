import React from 'react'
import PropTypes from 'prop-types'
import ListItem from '../../components/general/ListItem'

export default function ClassDescription(props) {
  const { characterClass } = props

  if (!characterClass.name) {
    return (
      <div className='class-details-indicator' style={{ border: 'none' }}>
        Select Your Class
      </div>
    )
  }

  const primeReqString = characterClass.primeReqs.join(', ')

  const classDescriptionValues = {
    'Prime Requisites': primeReqString,
    'Hit Dice': `d${characterClass.hd}`,
    Armour: characterClass.armour,
    Weapons: characterClass.weapons,
    'Special Abilities': `${characterClass.abilities.join(', ')}`,
    Languages: characterClass.languages,
    'XP to level 2': characterClass.nextLevel,
    'Maximum Level': characterClass.maxLevel,
    'Saving Throws': `Death ${characterClass.savingThrows[0]}, 
    Wands ${characterClass.savingThrows[1]}, Paralysis ${characterClass.savingThrows[2]}, 
    Breath Attacks ${characterClass.savingThrows[3]}, Spells ${characterClass.savingThrows[4]}`
  }

  return (
    <details className='class-details'>
      <summary className='class-summary'>
        {characterClass.name} Details{' '}
      </summary>

      <ul className='class-description-list'>
        <li>
          <h4 className='class-description-list--header'>
            {characterClass.name}
          </h4>
        </li>
        <li>
          <b>Description:</b>
          <p className='class-description--summary'>
            {characterClass.description}
          </p>
        </li>
        {Object.keys(classDescriptionValues).map((key) => {
          return (
            <ListItem
              type={key}
              key={key}
              value={classDescriptionValues[key].toString()}
            ></ListItem>
          )
        })}
        <li>
          <b>
            <a
              href={characterClass.link}
              target='_blank'
              rel='noopener noreferrer'
            >
              More Details
            </a>
          </b>
        </li>
      </ul>
    </details>
  )
}

ClassDescription.propTypes = {
  characterClass: PropTypes.object
}
