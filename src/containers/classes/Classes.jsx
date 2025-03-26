import React, { useState } from "react";
import ClassDescription from "./ClassDescription";
import ClassOptionsButton from "../../components/class/ClassOptionsButton";
import classOptionsData from "../../data/classOptionsData";
import PropTypes from "prop-types";
import CharacterClasses from "../../components/class/CharacterClasses";
import Checkbox from "../../components/general/Checkbox";

export default function ClassOptions(props) {
  const { characterClass, abilityScores, changeCharacterClass } = props;

  const [advancedClassesDisplay, setAdvancedClassesDisplay] = useState(false);

  const [carcassClassesDisplay, setCarcassClassesDisplay] = useState(false);

  const listClassOptions = (classType) => {
    const classData = classOptionsData.filter((characterClass) => {
      return characterClass.category === classType;
    });

    const classOptions = classData.map((item) => {
      return (
        <ClassOptionsButton
          key={item.name}
          characterClass={item}
          abilityScores={abilityScores}
          changeCharacterClass={changeCharacterClass}
        ></ClassOptionsButton>
      );
    });
    return classOptions;
  };

  return (
    <div className="class-options-container container">
      <CharacterClasses
        classType="basic"
        callback={listClassOptions}
      ></CharacterClasses>

      <div className="advanced-classes-container">
        <div className="advanced-class-item">
          <span>Advanced Classes</span>
          <Checkbox
            value="Advanced Classes"
            checkedCondition={advancedClassesDisplay}
            callback={() => setAdvancedClassesDisplay(!advancedClassesDisplay)}
          />
        </div>
        <div className="advanced-class-item">
          <span>Carcass Crawler Classes</span>
          <Checkbox
            value="Carcass Crawler Classes"
            checkedCondition={carcassClassesDisplay}
            callback={() => setCarcassClassesDisplay(!carcassClassesDisplay)}
          />
        </div>
      </div>

      {advancedClassesDisplay && (
        <CharacterClasses
          classType="advanced"
          callback={listClassOptions}
        ></CharacterClasses>
      )}

      {carcassClassesDisplay && (
        <CharacterClasses
          classType="carcass"
          callback={listClassOptions}
        ></CharacterClasses>
      )}

      <ClassDescription characterClass={characterClass}></ClassDescription>
    </div>
  );
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
};
