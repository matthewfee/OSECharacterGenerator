import React from "react";
import { joinDuplicates } from "../utilities/utilities";

export default function GearBackpack(props) {
  const { storeHandler, adventuringGear } = props;
  return (
    <div className="gear-backpack">
      {joinDuplicates(adventuringGear).map((item, index) => {
        return (
          <li
            className="backpack-item backpack-item--gear"
            value={item}
            key={index}
          >
            {item}
            <button
              className="button button--equipment"
              value={item}
              onClick={() => storeHandler(item, "sell", "gear")}
            >
              Sell
            </button>
          </li>
        );
      })}
    </div>
  );
}
