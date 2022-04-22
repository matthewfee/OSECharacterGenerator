import React from "react";
import { joinDuplicates } from "../utilities/utilities";

export default function WeaponsBackpack(props) {
  const { storeHandler, weapons } = props;
  return (
    <div className="weapons-backpack">
      {joinDuplicates(weapons).map((item, index) => {
        return (
          <li
            className="backpack-item backpack-item--weapon"
            value={item}
            key={index}
          >
            {item}
            <button
              className="button button--equipment button--weapon"
              value={item}
              onClick={() => storeHandler(item, "sell", "weapon")}
            >
              Sell
            </button>
          </li>
        );
      })}
    </div>
  );
}
