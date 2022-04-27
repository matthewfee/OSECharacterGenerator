import React from 'react'
import PropTypes from 'prop-types'

export default function ClassAbilitiesList({ characterClass }) {
  return (
    <div className="class-ability-menu--abilities">
    <ul className="class-ability-list">
              {characterClass.abilities.map((item) => {
                return (
                  <li key={item} className="class-ability">
                    {item}
                  </li>
                )
              })}
    </ul>
    </div>
  )
}

ClassAbilitiesList.propTypes = {
  characterClass: PropTypes.object
}
