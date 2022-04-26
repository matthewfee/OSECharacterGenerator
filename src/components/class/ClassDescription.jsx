import React from 'react'
import PropTypes from 'prop-types'

export default function ClassDescription (props) {
  const { characterClass } = props

  if (!characterClass.name) {
    return <div className="class-details" style={{ border: 'none' }}></div>
  }

  return (
    <details className="class-details">
      <summary className="class-summary">
        {characterClass.name} Details{' '}
      </summary>

      <ul className="class-description-list">
        <li>
          <h4 className="class-description-list--header">
            {characterClass.name}
          </h4>
        </li>
        <li>
          <b>Description:</b>
          <p className="class-description--summary">
            {characterClass.description}
          </p>
        </li>
        <li className="class-description--prime-reqs">
          <b>Prime Requisites:</b> {characterClass.primeReqs.join(', ')}
        </li>
        <li>
          <b>Hit Dice:</b> d{characterClass.hd}
        </li>
        <li>
          <b>Armour:</b> {characterClass.armour}
        </li>
        <li>
          <b>Weapons:</b> {characterClass.weapons}
        </li>
        <li>
          <b>Special Abilities:</b> {characterClass.abilities.join(', ')}
        </li>
        <li>
          <b>Languages:</b> {characterClass.languages}
        </li>
        <li>
          <b>XP to level 2:</b> {characterClass.nextLevel}
        </li>
        <li>
          <b>Maximium Level:</b> {characterClass.maxLevel}
        </li>
        <li>
          <b>Saving Throws:</b>
          <p>
            Death {characterClass.savingThrows[0]}, Wands{' '}
            {characterClass.savingThrows[1]}, Paralysis
            {characterClass.savingThrows[2]}, Breath Attacks{' '}
            {characterClass.savingThrows[3]}, Spells{' '}
            {characterClass.savingThrows[4]}
          </p>
        </li>
        <li>
          <b>
            <a
              href={characterClass.link}
              target="_blank"
              rel="noopener noreferrer"
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
