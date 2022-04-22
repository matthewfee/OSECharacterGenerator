import React from "react"
import ArmourBackpack from "./ArmourBackpack"
import WeaponsBackpack from "./WeaponsBackpack"
import GearBackpack from "./gearBackpack"
import { Trans } from "react-i18next"

export default function Inventory(props) {
  const { weapons, adventuringGear, armour, storeHandler } = props
  return (
    <div className="inventory">
      <h3 className="header-default">
        <Trans i18nKey="inventory">Inventory</Trans>
      </h3>
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
  )
}
