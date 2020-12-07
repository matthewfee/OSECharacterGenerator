/* eslint-disable react/prop-types */
import React from "react";
import jsPDF from "jspdf";
import domtoimage from "dom-to-image";
import classOptionsData from "./data/classOptionsData";

class CharacterSheetScreen extends React.Component {
  constructor(props) {
    super();
    this.state = {};
  }

  componentDidMount() {
    const myCharacters = JSON.parse(window.localStorage.getItem("characters"));
    console.log("PARENT STATE ID", this.props.parentState.id);
    const id = this.props.parentState.id;

    if (myCharacters) {
      const alreadyExists = myCharacters.find(obj => {
        return obj.id === id;
      });
      if (alreadyExists) {
        console.log("Duplicate ID Found");
        return;
      }
    }

    if (localStorage.getItem("characters") === null) {
      let arr = [];
      arr.push(this.props.parentState);
      window.localStorage.setItem("characters", JSON.stringify(arr));
    } else {
      console.log(myCharacters);
      myCharacters.push(this.props.parentState);
      window.localStorage.setItem("characters", JSON.stringify(myCharacters));
    }
  }

  savePDF = () => {
    const input = document.getElementById("print-wrapper");
    const pdf = new jsPDF("1", "mm", [158.75, 158.75]);
    if (pdf) {
      domtoimage.toPng(input).then(imgData => {
        pdf.addImage(imgData, "PNG", 0, 0);
        pdf.save("download.pdf");
      });
    }
  };

  render() {
    let char = this.props.parentState;
    let characterClass = classOptionsData.find(
      obj => obj.name === this.props.parentState.characterClass
    );

    return (
      <div className="character-sheet-container container">
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
              <span className="charsheet-value-name">Death</span>
              <span className="charsheet-value">
                {" "}
                {characterClass.savingThrows[0]}
              </span>
            </div>

            <div className="character-container">
              <span className="charsheet-value-name">Wands</span>
              <span className="charsheet-value">
                {" "}
                {characterClass.savingThrows[1]}
              </span>
            </div>

            <div className="character-container">
              <span className="charsheet-value-name">Paralysis</span>
              <span className="charsheet-value">
                {" "}
                {characterClass.savingThrows[2]}
              </span>
            </div>

            <div className="character-container">
              <span className="charsheet-value-name">Breath</span>
              <span className="charsheet-value">
                {" "}
                {characterClass.savingThrows[3]}
              </span>
            </div>

            <div className="character-container">
              <span className="charsheet-value-name">Spells</span>
              <span className="charsheet-value">
                {" "}
                {characterClass.savingThrows[4]}
              </span>
            </div>

            <div className="character-container">
              <span className="charsheet-value-name">Abilities</span>
              <span className="charsheet-value character-sheet--class-ability">
                {characterClass.abilities.map((item, index) => {
                  return (
                    <span
                      key={index}
                      className="character-sheet--class-ability"
                    >
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

          {this.state.displayShort && (
            <div className="character-short">
              <div>Name: {char.name}</div>
              <div>Class: Level 1 {char.characterClass}</div>
              <div>Alignment: {char.alignment}</div>
              <div>Armour Class: AC ({char.armour.join(", ")})</div>
              <div>
                Hit Points: {char.hitPoints}/{char.hitPoints}
              </div>
              <div>Hit Die: d{characterClass.hd}</div>
              <div>Weapons: {char.weapons.join(", ")}</div>
              <div>
                Saves: D{characterClass.savingThrows[0]} W
                {characterClass.savingThrows[1]} P
                {characterClass.savingThrows[2]} B
                {characterClass.savingThrows[3]} S
                {characterClass.savingThrows[4]}
              </div>
              <div>
                STR {char.strength} INT {char.intelligence} WIS {char.wisdom}{" "}
                DEX {char.dexterity} CON {char.constitution} CHA {char.charisma}
              </div>
              <div>Equipment: {char.equipment.join(", ")}</div>
            </div>
          )}
        </div>

        <button onClick={() => window.location.reload()}>Go Back</button>
      </div>
    );
  }
}

export default CharacterSheetScreen;
