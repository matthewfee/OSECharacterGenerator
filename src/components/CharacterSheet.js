/* eslint-disable react/prop-types */
import React from "react";
import classOptionsData from "../data/classOptionsData";

export default function CharacterSheet(props) {
  let char = props.parentState;
  let characterClass = classOptionsData.find(
    obj => obj.name === props.parentState.characterClass
  );

  return (
    <div className="character-sheet-component">
      <h3 className="character--name">{char.name}</h3>
      <h4 className="character--subheader"> Level 1 {char.characterClass}</h4>
      <div className="character-sheet">
        <div className="character-top-container">
          <div className="hit-points character-container">
            <span className="charsheet-value-name">Hit Points</span>{" "}
            <span className="charsheet-value">{char.hitPoints}</span>
          </div>
          <div className="armor-class character-container">
            <span className="charsheet-value-name">Armour Class</span>{" "}
            <span className="charsheet-value">{char.AC}</span>
          </div>
          <div className="character--alignment character-container">
            <span className="charsheet-value-name">Alignment</span>{" "}
            <span className="charsheet-value">{char.alignment}</span>{" "}
          </div>

          <div className="background character-container">
            <span className="charsheet-value-name">Background</span>{" "}
            <span className="charsheet-value">{char.background}</span>
          </div>
          <div className="appearance character-container">
            <span className="charsheet-value-name">Appearance</span>{" "}
            <span className="charsheet-value">{char.appearance}</span>
          </div>
          <div className="personality character-container">
            <span className="charsheet-value-name">Personality</span>{" "}
            <span className="charsheet-value">{char.personality}</span>
          </div>

          <div className="misfortune character-container">
            <span className="charsheet-value-name">Misfortune</span>{" "}
            <span className="charsheet-value">{char.misfortune}</span>
          </div>
        </div>

        <div className="ability-scores-container">
          <div className="strength character-container">
            <span className="charsheet-value-name"> Strength </span>
            <span className="charsheet-value">
              {" "}
              {char.strength}
              {char.strengthModMelee !== "0" && (
                <span> ({char.strengthModMelee})</span>
              )}
            </span>
          </div>

          <div className="intelligence character-container">
            <span className="charsheet-value-name"> Intelligence </span>
            <span className="charsheet-value"> {char.intelligence} </span>
          </div>

          <div className="wisdom character-container">
            <span className="charsheet-value-name"> Wisdom </span>
            <span className="charsheet-value">
              {" "}
              {char.wisdom}
              {char.wisdomMod !== "0" && <span> ({char.wisdomMod})</span>}
            </span>
          </div>

          <div className="dexterity character-container">
            <span className="charsheet-value-name"> Dexterity </span>
            <span className="charsheet-value">
              {" "}
              {char.dexterity}
              {char.dexterityModMissiles !== "0" && (
                <span> ({char.dexterityModMissiles})</span>
              )}
            </span>
          </div>

          <div className="constitution character-container">
            <span className="charsheet-value-name"> Constitution </span>
            <span className="charsheet-value">
              {" "}
              {char.constitution}
              {char.constitutionMod !== "0" && (
                <span> ({char.constitutionMod})</span>
              )}
            </span>
          </div>

          <div className="charisma character-container">
            <span className="charsheet-value-name"> Charisma </span>
            <span className="charsheet-value">
              {" "}
              {char.charisma}
              {char.charismaModNPCReactions !== "0" && (
                <span> ({char.charismaModNPCReactions})</span>
              )}
            </span>
          </div>
        </div>

        <div className="charsheet-saving-throws-container">
          <div className="character-container">
            <span className="charsheet-value-name">Saving Throws</span>
            <span className="charsheet-value charsheet-value--saving-throws">
              <div>
                <span>Death</span> <span>{characterClass.savingThrows[0]}</span>
              </div>
              <div>
                <span>Wands</span> <span>{characterClass.savingThrows[1]}</span>
              </div>
              <div>
                <span>Paralysis</span>{" "}
                <span>{characterClass.savingThrows[2]}</span>
              </div>
              <div>
                <span>Breath</span>{" "}
                <span>{characterClass.savingThrows[3]}</span>
              </div>
              <div>
                <span>Spells</span>{" "}
                <span>{characterClass.savingThrows[4]}</span>
              </div>
            </span>
          </div>

          <div className="character-container">
            <span className="charsheet-value-name">Abilities</span>
            <span className="charsheet-value character-sheet--class-ability">
              {characterClass.abilities.map((item, index) => {
                return (
                  <span key={index} className="character-sheet--class-ability">
                    {" "}
                    {item}{" "}
                  </span>
                );
              })}
            </span>
          </div>
        </div>

        <div className="character-sheet-ability-list">
          <div className="character-container">
            <span className="charsheet-value-name">Weapons</span>

            <span className="charsheet-value charsheet--weapons">
              {char.weapons.map((item, index) => {
                return (
                  <span key={index} className="charsheet--weapon-item">
                    {" "}
                    {item}{" "}
                  </span>
                );
              })}
            </span>
          </div>

          <div className="character-container">
            <span className="charsheet-value-name">Armour</span>

            <span className="charsheet-value charsheet--armour">
              {char.armour.map((item, index) => {
                return (
                  <span key={index} className="charsheet--armour-item">
                    {" "}
                    {item}{" "}
                  </span>
                );
              })}
            </span>
          </div>

          <div className="character-container">
            <span className="charsheet-value-name">Gear</span>

            <span className="charsheet-value charsheet--gear">
              {char.equipment.map((item, index) => {
                return (
                  <span key={index} className="charsheet--gear-item">
                    {" "}
                    {item}{" "}
                  </span>
                );
              })}
            </span>
          </div>

          <div className="character-container">
            <span className="charsheet-value-name">Gold</span>

            <span className="charsheet-value charsheet--gold">
              {char.gold}gp
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
