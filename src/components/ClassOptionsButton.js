import React from "react";
import classOptionsData from "../data/classOptionsData";
import { abilityScoreNames } from "../constants/constants";

export default function ClassOptionsButton(props) {
  const { characterClass, abilityScores, changeCharacterClass } = props;

  const checkAbilityScoreRequirements = (abilityScores, characterClass) => {
    let meetsAbilityScoreRequirements = true;

    if (!characterClass.requirements) {
      return meetsAbilityScoreRequirements;
    }

    const minimumAbilityScore = 9;

    abilityScoreNames.forEach(ability => {
      if (
        characterClass.requirements.includes(ability) &&
        abilityScores[ability] < minimumAbilityScore
      ) {
        meetsAbilityScoreRequirements = false;
      }
    });

    return meetsAbilityScoreRequirements;
  };

  return (
    <button
      className="button button-class-option"
      value={characterClass.name}
      key={characterClass.name}
      onClick={changeCharacterClass}
      disabled={!checkAbilityScoreRequirements(abilityScores, characterClass)}
    >
      {characterClass.name}
    </button>
  );
}
