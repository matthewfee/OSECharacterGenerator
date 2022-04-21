import React, { useState, useEffect } from "react";
import equipmentData from "../data/equipmentData";
import weaponsData from "../data/weaponsData";
import armourData from "../data/armourData";
import classOptionsData from "../data/classOptionsData";
import EquipmentOptions from "./EquipmentOptions";
import EquipmentBackpack from "./EquipmentBackpack";
import {
  Cleric,
  Elf,
  Fighter,
  Thief,
  MagicUser,
  Dwarf,
  Halfling,
  armourTypes
} from "../constants/constants";
import { joinDuplicates, chooseRandomItem, d6 } from "../utilities/utilities";

export default function EquipmentScreen(props) {
  const {
    characterClass,
    pages,
    setPages,
    characterModifiers,
    characterStatistics,
    setCharacterStatistics,
    characterEquipment,
    setCharacterEquipment,
    randomNumbers
  } = props;

  const [gold, setGold] = useState(null);
  const [goldRolled, setGoldRolled] = useState(false);
  const [adventuringGear, setAdventuringGear] = useState([]);
  const [adventuringGearSelected, setAdventuringGearSelected] = useState(
    "Backpack"
  );
  const [armour, setArmour] = useState([]);
  const [armourSelected, setArmourSelected] = useState(null);
  const [shieldSelected, setShieldSelected] = useState(false);
  const [weapons, setWeapons] = useState([]);
  const [weaponSelected, setWeaponSelected] = useState("Dagger");
  const [armourClass, setArmourClass] = useState();
  const [unarmouredAC, setUnarmouredAC] = useState();

  useEffect(() => {
    //calculate base armour class

    calculateAC();

    // update default selectedWeapon to one appropriate for class

    if (characterClass.name === Cleric) {
      setWeaponSelected("Mace");
    }

    if (characterClass.name === Fighter) {
      setWeaponSelected("Sword");
    }

    if (characterClass.name === Elf) {
      setWeaponSelected("Long bow");
    }

    if (characterClass.name === Dwarf) {
      setWeaponSelected("Battle axe");
    }

    if (characterClass.name === Halfling) {
      setWeaponSelected("Sling");
    }
  }, []);

  useEffect(() => {
    calculateAC();
  }, [armour]);

  const getGold = () => {
    const goldRolled = d6(3, randomNumbers) * 10;

    setGold(goldRolled);
    setGoldRolled(true);
  };

  const adventuringGearList = () => {
    return equipmentData.map(item => (
      <EquipmentOptions
        price={item.price}
        name={item.name}
        key={item.name}
      ></EquipmentOptions>
    ));
  };

  const weaponsOptions = item => {
    return (
      <option
        value={item.name}
        price={item.price}
        damage={item.damage}
        key={item.name}
      >
        {item.name} ({item.damage}) - {item.price} gp
      </option>
    );
  };

  const weaponsList = () => {
    return weaponsData.map(item => weaponsOptions(item));
  };

  const equipmentBackpack = () => {
    if (!adventuringGear) {
      return;
    }

    if (adventuringGear.length > 0) {
      return joinDuplicates(adventuringGear).map((item, index) => (
        <EquipmentBackpack
          name={item}
          sellSelectedEquipment={() => {
            storeHandler(item, "sell", "gear");
          }}
          key={index}
        ></EquipmentBackpack>
      ));
    }
  };

  const weaponsBackpack = () => {
    return joinDuplicates(weapons).map((item, index) => {
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
    });
  };

  const armourBackpack = () => {
    return armour.map((item, index) => {
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
    });
  };

  const updateSelectedAdventuringGear = event => {
    setAdventuringGearSelected(event.target.value);
  };

  const updateSelectedWeapon = event => {
    setWeaponSelected(event.target.value);
  };

  const handleOptionChange = event => {
    setArmourSelected(event.target.value);
  };

  const handleShieldChange = () => {
    if (!shieldSelected === true) {
      setShieldSelected(true);
    } else {
      setShieldSelected(false);
    }
  };

  const storeHandler = (selectedItem, action, type) => {
    if (selectedItem.includes(" (x")) {
      let itemNameNonConsolidated = selectedItem.split(" (x");
      selectedItem = itemNameNonConsolidated[0];
    }

    let storeCollection;

    switch (type) {
      case "armour":
        storeCollection = armourData;
        break;
      case "weapon":
        storeCollection = weaponsData;
        break;
      case "gear":
        storeCollection = equipmentData;
        break;
    }

    const findItem = object => {
      return object.name === selectedItem;
    };

    const item = storeCollection.find(findItem);

    if (type === "weapon") {
      switch (action) {
        case "buy":
          if (item.price > gold) {
            return;
          }
          setGold(gold - item.price);
          setWeapons(oldItems => [...oldItems, item.name]);
          break;
        case "sell":
          const index = weapons.findIndex(x => {
            return x === item.name;
          });
          let newWeaponsArray = [...weapons];
          newWeaponsArray.splice(index, 1);
          setWeapons(newWeaponsArray);
          setGold(gold + item.price);
      }
    }

    if (type === "armour") {
      let shieldCost = shieldSelected ? 10 : 0;
      switch (action) {
        case "buy":
          if (item.price + shieldCost > gold) {
            return;
          }
          if (shieldSelected) {
            setGold(gold - item.price - shieldCost);
            setArmour(oldArmour => [...oldArmour, item.name, "Shield"]);
          } else {
            setGold(gold - item.price);
            setArmour(oldArmour => [...oldArmour, item.name]);
          }
          break;
        case "sell":
          const index = armour.findIndex(x => {
            return x === item.name;
          });
          let newArmourArray = [...armour];
          newArmourArray.splice(index, 1);
          setArmour(newArmourArray);
          setGold(gold + item.price);
      }
    }

    if (type === "gear") {
      switch (action) {
        case "buy":
          if (item.price > gold) {
            return;
          }
          setGold(gold - item.price);
          setAdventuringGear(oldGear => [...oldGear, item.name]);
          break;
        case "sell":
          const index = adventuringGear.findIndex(x => {
            return x === item.name;
          });

          let newGearArray = [...adventuringGear];
          newGearArray.splice(index, 1);
          setAdventuringGear(newGearArray);
          setGold(gold + item.price);
      }
    }
  };

  const calculateAC = () => {
    let baseArmour = 10;

    let dexMod = characterModifiers.dexterityModAC;
    if (dexMod.includes("+")) {
      dexMod = dexMod.substring(1);
    }
    dexMod = parseInt(dexMod);
    baseArmour += dexMod;

    if (!armour) {
      setArmourClass(baseArmour);
      return;
    }

    setUnarmouredAC(baseArmour);

    let armourClass = baseArmour;

    if (armour.includes(armourTypes.leather)) {
      armourClass = baseArmour + 2;
    }
    if (armour.includes(armourTypes.chainMail)) {
      armourClass = baseArmour + 4;
    }
    if (armour.includes(armourTypes.plateMail)) {
      armourClass = baseArmour + 6;
    }
    if (armour.includes(armourTypes.shield)) {
      armourClass += 1;
    }

    setArmourClass(armourClass);
  };

  const selectRandomWeapon = () => {
    const randomWeapon = chooseRandomItem(weaponsData);
    setWeaponSelected(randomWeapon.name);
  };

  const selectRandomGear = () => {
    const randomGear = chooseRandomItem(equipmentData);
    setAdventuringGearSelected(randomGear.name);
  };

  return (
    <div className="equipment-screen">
      <h3 className="header-default"> Equipment </h3>

      <div className="gold-container">
        <h5 className="gold">
          {gold} gp
          {gold === null && (
            <button
              className="button button-primary button--gold"
              onClick={() => setTimeout(getGold(), 200)}
            >
              Roll Gold
            </button>
          )}
        </h5>
      </div>

      {goldRolled && (
        <div className="equipment-purchase-container">
          {!characterClass.armour.includes("none") && (
            <div className="armour-container-parent">
              <div className="equipment-container--header">
                {characterClass.name} Armour
              </div>

              <div className="equipment-restrictions">
                Allowed Armour: {characterClass.armour}
              </div>

              <div className="armour-container">
                <div className="radio-container">
                  {characterClass.armour.includes("leather") && (
                    <label className="armour-radio">
                      <input
                        type="radio"
                        value={armourTypes.leather}
                        className="form-check-input"
                        checked={armourSelected === armourTypes.leather}
                        onChange={handleOptionChange}
                        disabled={
                          characterClass.armour.includes("leather")
                            ? false
                            : true
                        }
                      />

                      <span className="radio--label">
                        Leather - AC 7 [12] - 20 gp
                      </span>
                    </label>
                  )}

                  {characterClass.armour.includes("chainmail") && (
                    <label className="armour-radio">
                      <input
                        type="radio"
                        value={armourTypes.chainMail}
                        className="form-check-input"
                        checked={armourSelected === armourTypes.chainMail}
                        onChange={handleOptionChange}
                        disabled={
                          characterClass.armour.includes("chainmail")
                            ? false
                            : true
                        }
                      />
                      <span className="radio--label">
                        Chainmail - AC 5 [14] - 40 gp
                      </span>
                    </label>
                  )}

                  {characterClass.armour.includes("plate") && (
                    <label className="armour-radio">
                      <input
                        type="radio"
                        value={armourTypes.plateMail}
                        className="form-check-input"
                        checked={armourSelected === armourTypes.plateMail}
                        onChange={handleOptionChange}
                        disabled={
                          characterClass.armour.includes("plate") ? false : true
                        }
                      />
                      <span className="radio--label">
                        Plate mail - AC 3 [16] - 60 gp
                      </span>
                    </label>
                  )}

                  {characterClass.armour.includes("shield") && (
                    <label className="armour-radio">
                      <input
                        type="checkbox"
                        value={armourTypes.shield}
                        className="form-check-input"
                        checked={shieldSelected === true}
                        onChange={handleShieldChange}
                        disabled={
                          characterClass.armour.includes("shields")
                            ? false
                            : true
                        }
                      />
                      Shield (AC +1 bonus) - 10gp
                    </label>
                  )}
                </div>

                <input
                  className="button--buy-armour"
                  type="submit"
                  value="Buy"
                  onClick={() => {
                    storeHandler(armourSelected, "buy", "armour");
                  }}
                  price={null}
                  disabled={armourSelected ? false : true}
                />
              </div>
            </div>
          )}

          <div className="equipment-container--header">
            {characterClass.name} Weapons
          </div>

          <div className="equipment-restrictions">
            Allowed Weapons: {characterClass.weapons}
          </div>

          <div className="weapons-container">
            <select
              className="weapons-select"
              value={weaponSelected}
              onChange={updateSelectedWeapon}
            >
              {weaponsList()}
            </select>

            <button
              className="button--random-weapon"
              onClick={selectRandomWeapon}
            >
              Random
            </button>

            <input
              className="button--buy-weapon"
              type="submit"
              value="Buy"
              onClick={() => storeHandler(weaponSelected, "buy", "weapon")}
              price={null}
            />
          </div>

          <div className="equipment-container--header">Adventuring Gear</div>

          <div className="gear-container">
            <select
              className="gear-select"
              value={adventuringGearSelected}
              onChange={updateSelectedAdventuringGear}
              price={null}
            >
              {adventuringGearList()}
            </select>

            <button
              className="button--random-weapon"
              onClick={selectRandomGear}
            >
              Random
            </button>

            <input
              className="button--buy-gear"
              type="submit"
              value="Buy"
              onClick={() => {
                storeHandler(adventuringGearSelected, "buy", "gear");
              }}
            />
          </div>

          <div className="inventory">
            <h3 className="header-default"> Inventory </h3>

            <div className="backpack-container">
              {armour && (
                <div className="armour-backpack">{armourBackpack()}</div>
              )}

              {weapons && (
                <div className="weapons-backpack">{weaponsBackpack()}</div>
              )}

              {adventuringGear && (
                <div className="gear-backpack">{equipmentBackpack()}</div>
              )}
            </div>
          </div>

          {goldRolled && (
            <button
              className="button button--character-details"
              onClick={() => {
                const newCharacterEquipment = {
                  armour: armour,
                  weapons: weapons,
                  adventuringGear: adventuringGear,
                  gold: gold,

                  AC: armourClass,
                  unarmouredAC: unarmouredAC
                };
                setCharacterEquipment(newCharacterEquipment);
                setCharacterStatistics({
                  ...characterStatistics,
                  armourClass: armourClass,
                  unarmouredAC: unarmouredAC
                });
                setPages({
                  ...pages,
                  equipmentScreen: false,
                  detailsScreen: true
                });
              }}
            >
              Go to Character Details
            </button>
          )}
        </div>
      )}
    </div>
  );
}
