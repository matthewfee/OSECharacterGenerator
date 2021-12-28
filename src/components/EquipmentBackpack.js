import React from "react";

export default function EquipmentBackpack(props) {
  return (
    <li
      className="backpack-item backpack-item--gear"
      value={props.name}
      key={props.keyName}
    >
      {props.name}
      <button
        className="button button--equipment"
        value={props.name}
        onClick={() => props.sellSelectedEquipment(props.name)}
      >
        Sell
      </button>
    </li>
  );
}
