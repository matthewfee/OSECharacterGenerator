/* eslint-disable react/prop-types */

import React from "react";

export default function ClassOptionsButton(props) {
  if (props.requirements) {
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
