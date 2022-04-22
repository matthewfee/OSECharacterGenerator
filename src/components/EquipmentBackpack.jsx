import React from "react";

export default function EquipmentBackpack(props) {
  const { name, keyName, sellSelectedEquipment } = props;

  return (
    <li
      className="backpack-item backpack-item--gear"
      value={name}
      key={keyName}
    >
      {name}
      <button
        className="button button--equipment"
        value={name}
        onClick={() => sellSelectedEquipment(props.name)}
      >
        Sell
      </button>
    </li>
  );
}
