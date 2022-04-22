import React from "react";

export default function ArmourBackpack(props) {
  const { armour, storeHandler } = props;
  return (
    <div className="armour-backpack">
      {armour.map((item, index) => {
        return (
          <li
            className="backpack-item backpack-item--armour"
            value={item}
            key={index}
          >
            {item}
            <button
              className="button button--equipment button--armour"
              value={item}
              onClick={() => storeHandler(item, "sell", "armour")}
            >
              Sell
            </button>
          </li>
        );
      })}
    </div>
  );
}
