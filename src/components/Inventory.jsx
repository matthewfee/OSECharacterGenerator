import React from "react";
import ArmourBackpack from "./ArmourBackpack";
import WeaponsBackpack from "./WeaponsBackpack";
import GearBackpack from "./gearBackpack";

export default function Inventory(props) {
  const { weapons, adventuringGear, armour, storeHandler } = props;
  return (
    <div className="inventory">
      <h3 className="header-default"> Inventory </h3>
      <div className="backpack-container">
        <ArmourBackpack
          armour={armour}
          storeHandler={storeHandler}
        ></ArmourBackpack>

        <WeaponsBackpack
          weapons={weapons}
          storeHandler={storeHandler}
        ></WeaponsBackpack>

        <GearBackpack
          adventuringGear={adventuringGear}
          storeHandler={storeHandler}
        ></GearBackpack>
      </div>
    </div>
  );
}
