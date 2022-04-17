import React from "react";

export default function ClassOptionsButton(props) {
  if (props.requirements) {
    // what is the data structure of 'requirements'? Use PropTypes
    // this whole if statement below does not seem right. Think about other way of doing it
    // Tip: put all the attributes like (STR) to the array, and then use one of those methods map(), find()
    if (
      (props.requirements.includes("STR") && props.strength < 9) ||
      (props.requirements.includes("INT") && props.intelligence < 9) ||
      (props.requirements.includes("WIS") && props.wisdom < 9) ||
      (props.requirements.includes("DEX") && props.dexterity < 9) ||
      (props.requirements.includes("CON") && props.constitution < 9) ||
      (props.requirements.includes("CHA") && props.charisma < 9)
    ) {
      return (
        <button
          className="button button-class-option"
          value={props.classOption}
          key={props.classOption}
          onClick={props.classFunction}
          disabled
        >
          {props.classOption}
        </button>
      );
    }
  }

  return (
    <button
      className="button button-class-option"
      value={props.classOption}
      key={props.classOption}
      onClick={props.classFunction}
    >
      {props.classOption}
    </button>
  );
}
