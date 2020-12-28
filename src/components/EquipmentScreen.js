/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import equipmentData from "../data/equipmentData";
import weaponsData from "../data/weaponsData";
import armourData from "../data/armourData";
import classOptionsData from "../data/classOptionsData";
import EquipmentOptions from "./EquipmentOptions";
import EquipmentBackpack from "./EquipmentBackpack";

export default function EquipmentScreen(props) {
  const [gold, setGold] = useState(null);
  const [goldRolled, setGoldRolled] = useState(false);
  const [equipment, setEquipment] = useState([]);
  const [equipmentSelected, setEquipmentSelected] = useState("Backpack");
  const [armour, setArmour] = useState([]);
  const [armourSelected, setArmourSelected] = useState(null);
  const [shieldSelected, setShieldSelected] = useState(false);
  const [weapons, setWeapons] = useState([]);
  const [weaponSelected, setWeaponSelected] = useState("Dagger");
  const [armourClass, setArmourClass] = useState();
  const [unarmouredAC, setUnarmouredAC] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);

    //calculate base armour class

    calculateAC();

    // update default selectedWeapon to one appropriate for class

    if (props.characterClass === "Cleric") {
      setWeaponSelected("Mace");
    }

    if (props.characterClass === "Fighter") {
      setWeaponSelected("Sword");
    }

    if (props.characterClass === "Elf") {
      setWeaponSelected("Long bow");
    }

    if (props.characterClass === "Dwarf") {
      setWeaponSelected("Battle axe");
    }

    if (props.characterClass === "Halfling") {
      setWeaponSelected("Sling");
    }
  }, []);

  useEffect(() => {
    calculateAC();
  }, [armour]);

  const getRndInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const getGold = () => {
    setGold(props.gold);
    setGoldRolled(true);
  };

  const d = (how_many, sides) => {
    let total = 0;
    let i;
    for (i = 0; i < how_many; i++) {
      total += getRndInteger(1, sides);
    }
    return total;
  };

  const equipmentList = () => {
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
    if (!equipment) {
      return;
    }

    if (equipment.length > 0) {
      return joinDuplicates(equipment).map((item, index) => (
        <EquipmentBackpack
          name={item}
          sellSelectedEquipment={sellSelectedEquipment}
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

  const updateSelectedEquipment = event => {
    setEquipmentSelected(event.target.value);
  };

  const findEquipment = object => {
    return object.name === equipmentSelected;
  };

  const buySelectedEquipment = () => {
    const equipmentObject = equipmentData.find(findEquipment);

    if (equipmentObject.price > gold) {
      return console.log("Insufficient funds");
    }

    console.log(equipmentObject);
    if (!equipmentObject) {
      console.error(equipmentObject);
    }

    setEquipment(oldEquipment => [...oldEquipment, equipmentObject.name]);
    setGold(gold - equipmentObject.price);
  };

  const sellSelectedEquipment = itemName => {
    let equipmentObject = equipmentData.find(object => {
      return itemName.includes(object.name);
    });

    // const findEquipment = object => {
    //   return object.name === equipmentSelected;
    // };

    console.log("Current Equipment Object", equipmentObject);

    let itemsRemoved = 0;

    const removeOneItem = item => {
      console.log("removeOneItem parameter item", item);

      if (itemsRemoved > 0) {
        console.log(item, "DUPLICATE FOUND");
        return true;
      }

      if (equipmentObject.name === item) {
        console.log("ITEM REMOVED", item);
        itemsRemoved++;
        return false;
      }

      return true;
    };

    const newEquipmentArray = equipment.filter(removeOneItem);

    console.log(
      "New Equipment Array",
      newEquipmentArray,
      "ItemsRemoved:",
      itemsRemoved
    );

    setEquipment(newEquipmentArray);

    setGold(gold + equipmentObject.price);
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
      return console.log("Insufficient funds");
    }

    //updates state with new equipment item\

    setGold(gold - weaponObject.price);

    setWeapons(oldWeapons => [...oldWeapons, weaponObject.name]);
  };

  const sellSelectedWeapon = itemName => {
    const weaponObject = weaponsData.find(object => {
      return itemName.includes(object.name);
    });

    let itemsRemoved = 0;

    const removeTheItem = item => {
      if (itemsRemoved > 0) {
        console.log("DUPLICATE FOUND");
        return true;
      }

      if (weaponObject.name === item) {
        console.log(item, "ITEM REMOVED");
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
      return console.log("Insufficient funds");
    }

    if (shieldSelected && armourObject.price + 10 > gold) {
      return console.log("Insufficient funds");
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
    let armourClass = 10;

    let dexMod = props.dexterityModAC;
    if (dexMod.includes("+")) {
      dexMod = dexMod.substring(1);
    }
    dexMod = parseInt(dexMod);
    armourClass += dexMod;

    if (!armour) {
      setArmourClass(armourClass);
      return;
    }

    setUnarmouredAC(armourClass);

    if (armour.includes("Leather")) {
      armourClass += 2;
    }
    if (armour.includes("Chainmail")) {
      armourClass += 4;
    }
    if (armour.includes("Plate mail")) {
      armourClass += 6;
    }
    if (armour.includes("Shield")) {
      armourClass += 1;
    }

    setArmourClass(armourClass);
  };

  const characterClass = classOptionsData.find(
    obj => obj.name === props.characterClass
  );

  const choose = array => {
    return array[Math.floor(Math.random() * array.length)];
  };

  const selectRandomWeapon = () => {
    let randomWeapon = choose(weaponsData);
    setWeaponSelected(randomWeapon.name);
  };

  const selectRandomGear = () => {
    let randomGear = choose(equipmentData);
    setEquipmentSelected(randomGear.name);
  };

  const joinDuplicates = array => {
    let stuff = {};
    for (let i = 0; i < array.length; i++) {
      if (stuff.hasOwnProperty(array[i])) {
        stuff[array[i]] += 1;
      } else {
        stuff[array[i]] = 1;
      }
    }
    let consolidated = [];
    const keys = Object.keys(stuff);
    for (const key of keys) {
      if (stuff[key] > 1) {
        consolidated.push(`${key} (x${stuff[key]})`);
      } else {
        consolidated.push(key);
      }
    }

    console.log("CONSOLIDATED ARRAY", consolidated);
    return consolidated;
  };

  return (
    <div className="equipment-screen">
      <h3 className="header-default"> Equipment </h3>

      <div className="gold-container">
        <h5 className="gold">
          {" "}
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
                {props.characterClass} Armour
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
                        value="Leather"
                        className="form-check-input"
                        checked={armourSelected === "Leather"}
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
                        value="Chainmail"
                        className="form-check-input"
                        checked={armourSelected === "Chainmail"}
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
                        value="Plate mail"
                        className="form-check-input"
                        checked={armourSelected === "Plate mail"}
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
                        value="Shield"
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
                  onClick={buySelectedArmour}
                  price={null}
                  disabled={armourSelected ? false : true}
                />
              </div>
            </div>
          )}

          <div className="equipment-container--header">
            {props.characterClass} Weapons
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
              value={equipmentSelected}
              onChange={updateSelectedEquipment}
              price={null}
            >
              {equipmentList()}
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
              onClick={buySelectedEquipment}
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

              {equipment && (
                <div className="gear-backpack">{equipmentBackpack()}</div>
              )}
            </div>
          </div>

          {goldRolled && (
            <button
              className="button button--character-details"
              onClick={() => {
                let stateObject = {
                  gold: gold,
                  equipment: equipment,
                  armour: armour,
                  weapons: weapons,
                  AC: armourClass,
                  unarmouredAC: unarmouredAC
                };
                props.updateParentState(stateObject);
                props.showDetailsScreen();
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
