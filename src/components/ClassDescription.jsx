import React from "react"
import classOptionsData from "../data/classOptionsData"
import PropTypes from "prop-types"

export default function ClassDescription(props) {
  const { characterClass } = props

  if (!characterClass.name) {
    return <div className="class-details" style={{ border: "none" }}></div>
  }
  const obj = classOptionsData.find((obj) => obj.name === characterClass.name)
  return (
    <details className="class-details">
      <summary className="class-summary">
        {characterClass.name} Details{" "}
      </summary>

      <ul className="class-description-list">
        <li>
          <h4 className="class-description-list--header">
            {characterClass.name}
          </h4>
        </li>
        <li>
          <b>Description:</b> {obj.description}
        </li>
        <li>
          <b>Prime Requisites:</b> {obj.primeReqs}{" "}
        </li>
        <li>
          <b>Hit Dice:</b> d{obj.hd}
        </li>
        <li>
          <b>Armour:</b> {obj.armour}
        </li>
        <li>
          <b>Weapons:</b> {obj.weapons}
        </li>
        <li>
          <b>Special Abilities:</b> {obj.abilities.join(", ")}
        </li>
        <li>
          <b>Languages:</b> {obj.languages}
        </li>
        <li>
          <b>XP to level 2:</b> {obj.nextLevel}
        </li>
        <li>
          <b>Maximium Level:</b> {obj.maxLevel}
        </li>
        <li>
          <b>Saving Throws:</b>
          <span>
            Death {obj.savingThrows[0]}, Wands {obj.savingThrows[1]}, Paralysis
            {obj.savingThrows[2]}, Breath Attacks {obj.savingThrows[3]},
            Spells/rods/staves {obj.savingThrows[4]}
          </span>
        </li>
        <li>
          <b>
            <a href={obj.link} target="_blank" rel="noopener noreferrer">
              More Details
            </a>
          </b>
        </li>
      </ul>
    </details>
  )
}

ClassDescription.propTypes = {
  characterClass: PropTypes.object,
}
