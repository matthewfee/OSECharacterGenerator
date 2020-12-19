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
  const [shieldSelected, setShieldSelected] = useState(false);
  const [weapons, setWeapons] = useState([]);
  const [weaponSelected, setWeaponSelected] = useState("Dagger");
  const [armourClass, setArmourClass] = useState(null);

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
    var total = 0;
    var i;
    for (i = 0; i < how_many; i++) {
      total += getRndInteger(1, sides);
    }
    return total;
  };

  const equipmentList = () =>
    equipmentData.map(item => (
      <EquipmentOptions
        price={item.price}
        name={item.name}
        key={item.name}
      ></EquipmentOptions>
    ));

  const weaponsOptions = item => {
    return (
      <option value={item.name} price={item.price} damage={item.damage}>
        {item.name} ({item.damage}) - {item.price} gp
      </option>
    );
  };

  const weaponsList = () => {
    return weaponsData.map(item => weaponsOptions(item));
  };

  const equipmentBackpack = () =>
    equipment.map((item, index) => (
      <EquipmentBackpack
        name={item}
        sellSelectedEquipment={sellSelectedEquipment}
        key={index}
      ></EquipmentBackpack>
    ));

  const weaponsBackpack = () =>
    weapons.map((item, index) => {
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

  armourBackpack = () =>
    armour.map((item, index) => {
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

    //updates state with new equipment item

    setGold(prevGold => {
      prevGold - equipmentObject.price;
    });
    setEquipment(prevEquipment => {
      equipment.concat(equipmentObject.name);
    });
  };

  const sellSelectedEquipment = itemName => {
    let equipmentObject = equipmentData.find(findEquipment);

    let itemsRemoved = 0;

    const removeOneItem = item => {
      if (itemsRemoved > 0) {
        return true;
      }

      if (equipmentObject.name === item) {
        itemsRemoved++;
        return false;
      }

      return true;
    };

    const newEquipmentArray = equipment.filter(removeOneItem);

    setEquipment(newEquipmentArray);

    setGold(prevGold => {
      prevGold + equipmentObject.price;
    });
  };

  updateSelectedWeapon = event => {
    setSelectedWeapon(event.target.value);
  };

  const findWeapon = object => {
    return object.name === weaponSelected;
  };

  buySelectedWeapon = () => {
    const weaponObject = weaponsData.find(findWeapon);

    if (weaponObject.price > gold) {
      return console.log("Insufficient funds");
    }

    //updates state with new equipment item\

    setGold(prevGold => {
      prevGold - weaponObject.price;
    });
    setWeapons(prevWeapons => {
      prevWeapons.concat(weaponObject.name);
    });
  };

  sellSelectedWeapon = itemName => {
    const weaponObject = weaponsData.find(findWeapon);

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

    setGold(prevGold => {
      prevGold + weaponObject.price;
    });
    setWeapons(newWeaponsArray);
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
      setGold(prevGold => {
        gold - armourObject.price - 10;
      });
      setArmour(prevArmour => {
        prevArmour.concat(armourObject.name).concat("Shield");
      });
    } else {
      setGold(prevGold => {
        prevGold - armourObject.price;
      });
      setArmour(prevArmour => {
        prevArmour.concat(armourObject.name);
      });
    }
  };

  const sellSelectedArmour = itemName => {
    const armourObject = armourData.find(findArmour);

    let counter = 0;

    const removeTheItem = item => {
      if (counter > 0) {
        return true;
      }

      if (armourObject.name === item) {
        counter++;
        return false;
      }

      return true;
    };

    const newArmourArray = armour.filter(removeTheItem);

    setGold(prevGold => {
      prevGold + armourObject.price;
    });

    setArmour(newArmourArray);
  };

  const calculateAC = () => {
    let armourClass = 10;

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

    let dexMod = props.dexterityModAC;
    if (dexMod.includes("+")) {
      dexMod = dexMod.substring(1);
    }
    dexMod = parseInt(dexMod);
    armourClass += dexMod;

    setArmourClass(armourClass);
  };

  const characterClass = classOptionsData.find(
    obj => obj.name === props.characterClass
  );

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
          {!characterClass.armour.includes("none") && armour.length < 1 && (
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
              {armour.length > 0 && (
                <div className="armour-backpack">{armourBackpack()}</div>
              )}

              {weapons.length > 0 && (
                <div className="weapons-backpack">{weaponsBackpack()}</div>
              )}

              {equipment.length > 0 && (
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
                  AC: AC
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
