import React, { useState, useEffect } from "react";
import classOptionsData from "../data/classOptionsData";

export default function ClassScreen(props) {
  const [hitPoints, setHitPoints] = useState(null);
  const [HPResult, setHPResult] = useState(null);
  const [canReroll, setCanReroll] = useState(true);
  const [HPRolls, setHPRolls] = useState(0);
  const [hitDie, setHitDie] = useState(null);
  const [spellSelected, setSpellSelected] = useState("");

  useEffect(() => {
    getHitDie();
  }, []);

  const characterClass = classOptionsData.find(
    obj => obj.name === props.characterClass
  );

  const getHitDie = () => {
    return setHitDie(characterClass.hd);
  };

  const getHitPoints = () => {
    let HPResult = props.d(1, hitDie);
    let totalHP = HPResult + props.conMod;
    let HPRollsNew = HPRolls + 1;

    if (totalHP < 1) {
      totalHP = 1;
    }
    if (HPResult > 2 || HPRollsNew === 2) {
      setCanReroll(false);
    }

    setHitPoints(totalHP);
    setHPResult(HPResult);
    setHPRolls(HPRollsNew);
  };

  const choose = array => {
    return array[Math.floor(Math.random() * array.length)];
  };

  const chooseSpells = () => {
    let characterClass = classOptionsData.find(
      obj => obj.name === props.characterClass
    );

    if (characterClass.arcaneSpells) {
      return choose(magicUserSpells);
    }

    if (characterClass.druidSpells) {
      return choose(druidSpells);
    }

    if (characterClass.illusionistSpells) {
      return choose(illusionistSpells);
    }

    return "No Spells Found";
  };

  const magicUserSpells = [
    "Charm Person",
    "Detect Magic",
    "Floating Disc",
    "Hold Portal",
    "Light",
    "Magic Missile",
    "Protection from Evil",
    "Read Languages",
    "Read Magic",
    "Shield",
    "Sleep",
    "Ventriloquism"
  ];

  const druidSpells = [
    "Animal Friendship",
    "Detect Danger",
    "Entangle",
    "Faerie Fire",
    "Invisibility to Animals",
    "Locate Plant or Animal",
    "Predict Weather",
    "Speak with Aniamls"
  ];

  const illusionistSpells = [
    "Auditory Illusions",
    "Chromatic Orb",
    "Colour Spray",
    "Dancing Lights",
    "Detect Illusion",
    "Glamour",
    "Hypnotism",
    "Light",
    "Phantasmal Force",
    "Read Magic",
    "Spook",
    "Wall of Fog"
  ];

  const spellOption = spell => {
    return <option value={spell}>{spell}</option>;
  };

  const spellsList = () => {
    let spellList = "";

    let characterClass = classOptionsData.find(
      obj => obj.name === props.characterClass
    );

    if (characterClass.arcaneSpells) {
      spellList = magicUserSpells.map(spell => {
        return spellOption(spell);
      });
    }

    if (characterClass.druidSpells) {
      spellList = druidSpells.map(spell => {
        return spellOption(spell);
      });
    }

    if (characterClass.illusionistSpells) {
      spellList = illusionistSpells.map(spell => {
        return spellOption(spell);
      });
    }

    return spellList;
  };

  const handleSpellChange = event => {
    setSpellSelected(event.target.value);
  };

  let stateObject = {
    hitPoints: hitPoints,
    spells: spellSelected,
    hasSpells: false
  };

  if (spellSelected.length > 1) {
    stateObject = {
      hitPoints: hitPoints,
      spells: spellSelected,
      hasSpells: true
    };
  }

  let charClass = classOptionsData.find(
    obj => obj.name === props.characterClass
  );

  return (
    <div className="class-options-screen">
      <h3 className="header-default">Class Options</h3>

      {canReroll && (
        <button
          className="button button-primary button--hp"
          onClick={() => setTimeout(getHitPoints(), 200)}
        >
          {HPRolls === 0 ? "Roll HP" : "Reroll?"}
        </button>
      )}

      <div className="hp-container container">
        <div className="hp-container--hit-die">
          {hitPoints && <span>{HPResult}</span>}
          {!hitPoints && <span>d{hitDie}</span>}

          {!hitPoints && (
            <div className="hp-container--hit-die-name">Hit Die</div>
          )}
          {hitPoints && (
            <div className="hp-container--hit-die-name">Rolled</div>
          )}
        </div>

        <div className="hp-container--math">+</div>

        <div className="hp-container--con-mod">
          {" "}
          {props.conMod}
          <div className="hp-container--con-mod-name">Con Mod</div>
        </div>

        <div className="hp-container--math">=</div>

        <div className="hp-container--hit-points">
          {hitPoints}
          <div className="hp-container--hit-points-name">Hit Points</div>
        </div>
      </div>

      {hitPoints && (
        <div className="saving-throws-menu">
          <h5 className="saving-throws-menu--header">
            {" "}
            {props.characterClass} Saving Throws
          </h5>

          <div className="saving-throws container">
            <div className="saving-throw--death saving-throw-name">Death </div>
            <div className="saving-throw--death--value saving--value">
              {characterClass.savingThrows[0]}
            </div>
            <div className="saving-throw--wands saving-throw-name">Wands </div>
            <div className="saving-throw--wands--value saving--value">
              {characterClass.savingThrows[1]}
            </div>
            <div className="saving-throw--paralysis saving-throw-name">
              Paralysis{" "}
            </div>
            <div className="saving-throw--paralysis--value saving--value">
              {characterClass.savingThrows[2]}
            </div>
            <div className="saving-throw--breath saving-throw-name">Breath</div>
            <div className="saving-throw--breath--value saving--value">
              {characterClass.savingThrows[3]}
            </div>
            <div className="saving-throw--spells saving-throw-name">
              Spells{" "}
            </div>
            <div className="saving-throw--spells--value saving--value">
              {characterClass.savingThrows[4]}
            </div>
          </div>
        </div>
      )}

      {hitPoints && (
        <div className="class-ability-menu">
          <h5 className="class-ability-menu--header">
            {" "}
            {props.characterClass} Abilities
          </h5>

          <div className="class-ability-menu--abilities">
            <ul className="class-ability-list">
              {characterClass.abilities.map(item => {
                return (
                  <li key={item} className="class-ability">
                    {" "}
                    {item}{" "}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}

      {hitPoints &&
        (charClass.arcaneSpells ||
          charClass.druidSpells ||
          charClass.illusionistSpells) && (
          <div className="spell-selection-menu">
            <h5 className="class-ability-menu--header">
              {props.characterClass} Spells
            </h5>
            <select
              className="spells-select"
              value={spellSelected}
              onChange={handleSpellChange}
            >
              <option value="" disabled>
                Select Spell
              </option>
              {spellsList()}
            </select>
            <button
              className="button--random-spell"
              onClick={() => setSpellSelected(chooseSpells())}
            >
              Random Spell
            </button>
          </div>
        )}

      {hitPoints > 0 && (
        <button
          className="button button--equipment-options"
          onClick={() => {
            props.updateParentState(stateObject);
            props.showEquipmentScreen();
          }}
        >
          Go to Equipment
        </button>
      )}
    </div>
  );
}
