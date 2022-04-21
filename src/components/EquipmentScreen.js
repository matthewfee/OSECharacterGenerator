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
          sellSelectedEquipment={sellSelectedAdventuringGear}
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
            onClick={() => sellSelectedWeapon(item)}
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
            onClick={() => sellSelectedArmour(item)}
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

  const findGear = object => {
    return object.name === adventuringGearSelected;
  };

  const buySelectedAdventuringGear = () => {
    const adventuringGearObject = equipmentData.find(findGear);

    if (adventuringGearObject.price > gold) {
      return;
    }

    console.log(adventuringGearObject);

    if (!adventuringGearObject) {
      console.error(adventuringGearObject);
    }

    setAdventuringGear([...adventuringGear, adventuringGearObject.name]);
    setGold(gold - adventuringGearObject.price);
  };

  const sellSelectedAdventuringGear = itemName => {
    let adventuringGearObject = equipmentData.find(object => {
      return itemName.includes(object.name);
    });

    let itemsRemoved = 0;

    const removeOneItem = item => {
      if (itemsRemoved > 0) {
        return true;
      }

      if (adventuringGearObject.name === item) {
        itemsRemoved++;
        return false;
      }

      return true;
    };

    const newAdventuringGearArray = adventuringGear.filter(removeOneItem);

    setAdventuringGear(newAdventuringGearArray);
    setGold(gold + adventuringGearObject.price);
  };

  const updateSelectedWeapon = event => {
    setWeaponSelected(event.target.value);
  };

  const findWeapon = object => {
    return object.name === weaponSelected;
  };

  const buySelectedWeapon = () => {
    const weaponObject = weaponsData.find(findWeapon);

    if (weaponObject.price > gold) {
      return;
    }

    setGold(gold - weaponObject.price);

    setWeapons(oldWeapons => [...oldWeapons, weaponObject.name]);
  };

  const sellSelectedWeapon = itemName => {
    if (itemName.includes(" (x")) {
      let itemNameNonConsolidated = itemName.split(" (x");
      itemName = itemNameNonConsolidated[0];
    }

    const weaponObject = weaponsData.find(object => {
      return object.name === itemName;
    });

    let itemsRemoved = 0;

    const removeTheItem = item => {
      if (itemsRemoved > 0) {
        return true;
      }

      if (weaponObject.name === item) {
        itemsRemoved++;
        return false;
      }

      return true;
    };

    let newWeaponsArray = weapons.filter(removeTheItem);
    setWeapons(newWeaponsArray);
    setGold(gold + weaponObject.price);
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

  const findArmour = object => {
    return object.name === armourSelected;
  };

  const buySelectedArmour = () => {
    const armourObject = armourData.find(findArmour);

    if (armourObject.price > gold) {
      return;
    }

    if (shieldSelected && armourObject.price + 10 > gold) {
      return;
    }

    if (shieldSelected) {
      setGold(gold - armourObject.price - 10);
      setArmour(oldArmour => [...oldArmour, armourObject.name, "Shield"]);
    } else {
      setGold(gold - armourObject.price);
      setArmour(oldArmour => [...oldArmour, armourObject.name]);
    }
  };

  const sellSelectedArmour = itemName => {
    const findArmourToSell = object => {
      return object.name === itemName;
    };

    const armourObject = armourData.find(findArmourToSell);

    let itemsRemoved = 0;

    const removeTheItem = item => {
      if (itemsRemoved > 0) {
        return true;
      }

      if (armourObject.name === item) {
        itemsRemoved++;
        return false;
      }

      return true;
    };

    const newArmourArray = armour.filter(removeTheItem);

    setGold(gold + armourObject.price);
    setArmour(newArmourArray);
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
                  {characterClass.armour.includes(armourTypes.leather) && (
                    <label className="armour-radio">
                      <input
                        type="radio"
                        value={armourTypes.leather}
                        className="form-check-input"
                        checked={armourSelected === armourTypes.leather}
                        onChange={handleOptionChange}
                        disabled={
                          characterClass.armour.includes(armourTypes.leather)
                            ? false
                            : true
                        }
                      />

                      <span className="radio--label">
                        Leather - AC 7 [12] - 20 gp
                      </span>
                    </label>
                  )}

                  {characterClass.armour.includes(armourTypes.chainMail) && (
                    <label className="armour-radio">
                      <input
                        type="radio"
                        value={armourTypes.chainMail}
                        className="form-check-input"
                        checked={armourSelected === armourTypes.chainMail}
                        onChange={handleOptionChange}
                        disabled={
                          characterClass.armour.includes(armourTypes.chainMail)
                            ? false
                            : true
                        }
                      />
                      <span className="radio--label">
                        Chainmail - AC 5 [14] - 40 gp
                      </span>
                    </label>
                  )}

                  {characterClass.armour.includes(armourTypes.plateMail) && (
                    <label className="armour-radio">
                      <input
                        type="radio"
                        value={armourTypes.plateMail}
                        className="form-check-input"
                        checked={armourSelected === armourTypes.plateMail}
                        onChange={handleOptionChange}
                        disabled={
                          characterClass.armour.includes(armourTypes.plateMail)
                            ? false
                            : true
                        }
                      />
                      <span className="radio--label">
                        Plate mail - AC 3 [16] - 60 gp
                      </span>
                    </label>
                  )}

                  {characterClass.armour.includes(armourTypes.shield) && (
                    <label className="armour-radio">
                      <input
                        type="checkbox"
                        value={armourTypes.shield}
                        className="form-check-input"
                        checked={shieldSelected === true}
                        onChange={handleShieldChange}
                        disabled={
                          characterClass.armour.includes(armourTypes.shield)
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
                  onClick={buySelectedArmour}
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
              onClick={buySelectedWeapon}
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
              onClick={buySelectedAdventuringGear}
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
