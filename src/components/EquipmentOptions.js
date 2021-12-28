import React from "react";

export default function EquipmentOptions(props) {
  return (
    <option value={props.name} price={props.price}>
      {props.name} - {props.price} gp
    </option>
  );
}
