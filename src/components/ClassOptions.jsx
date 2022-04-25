import React, { useState } from "react"
import ClassDescription from "./ClassDescription"
import ClassOptionsButton from "./ClassOptionsButton"
import classOptionsData from "../data/classOptionsData"
import PropTypes from "prop-types"

export default function ClassOptions(props) {
  const { characterClass, abilityScores, changeCharacterClass } = props

  const [advancedClassesDisplay, setAdvancedClassesDisplay] = useState(false)

  const listBasicClassOptions = () => {
    const basicCharacterData = classOptionsData.filter((characterClassObj) => {
      return characterClassObj.category === "basic"
    })

    const basicCharacters = basicCharacterData.map((item) => (
      <ClassOptionsButton
        key={item.name}
        characterClass={item}
        abilityScores={abilityScores}
        changeCharacterClass={changeCharacterClass}
      ></ClassOptionsButton>
    ))

    return basicCharacters
  }

  const listAdvancedClassOptions = () => {
    const advCharacterData = classOptionsData.filter((characterClassObj) => {
      return characterClassObj.category === "advanced"
    })

    const advCharacters = advCharacterData.map((item) => (
      <ClassOptionsButton
        key={item.name}
        characterClass={item}
        abilityScores={abilityScores}
        changeCharacterClass={changeCharacterClass}
      ></ClassOptionsButton>
    ))

    return advCharacters
  }

  return (
    <div className="class-options-container container">
      <div className="basic-class-container">{listBasicClassOptions()}</div>
      <h3 className="advanced-classes-header">
        Advanced Classes
        <input
          type="checkbox"
          value="Advanced Classes"
          className="checkbox"
          checked={advancedClassesDisplay}
          onChange={() => setAdvancedClassesDisplay(!advancedClassesDisplay)}
        ></input>
      </h3>
      <div className="advanced-class-container">
        {advancedClassesDisplay ? listAdvancedClassOptions() : ""}
      </div>

      <ClassDescription characterClass={characterClass}></ClassDescription>
    </div>
  )
}

ClassOptions.propTypes = {
  characterClass: PropTypes.object,
  abilityScores: PropTypes.shape({
    strength: PropTypes.number,
    strengthOriginal: PropTypes.number,
    intelligence: PropTypes.number,
    intelligenceOriginal: PropTypes.number,
    wisdom: PropTypes.number,
    wisdomOriginal: PropTypes.number,
    dexterity: PropTypes.number,
    dexterityOriginal: PropTypes.number,
    constitution: PropTypes.number,
    constitutionOriginal: PropTypes.number,
    charisma: PropTypes.number,
    charismaOriginal: PropTypes.number,
  }),
  changeCharacterClass: PropTypes.func,
}
