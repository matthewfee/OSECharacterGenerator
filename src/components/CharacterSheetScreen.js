/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from "react";
import classOptionsData from "../data/classOptionsData";
import CharacterSheet from "./CharacterSheet";
import {
  exportComponentAsJPEG,
  exportComponentAsPDF,
  exportComponentAsPNG
} from "react-component-export-image";
import { PDFDocument } from "pdf-lib";
import download from "downloadjs";

export default function CharacterSheetScreen(props) {
  const componentRef = useRef();

  useEffect(() => {
    updateLocalStorage();
  }, []);

  const updateLocalStorage = () => {
    const myCharacters = JSON.parse(window.localStorage.getItem("characters"));
    console.log("PARENT STATE ID", props.parentState.id);
    const id = props.parentState.id;

    if (myCharacters) {
      const alreadyExists = myCharacters.find(obj => {
        return obj.id === id;
      });
      if (alreadyExists) {
        console.log("Duplicate Character ID Found");
        return;
      }
    }

    if (localStorage.getItem("characters") === null) {
      let arr = [];
      arr.push(props.parentState);
      window.localStorage.setItem("characters", JSON.stringify(arr));
    } else {
      console.log("MY CHARACTERS", myCharacters);
      myCharacters.push(props.parentState);
      window.localStorage.setItem("characters", JSON.stringify(myCharacters));
    }
  };

  const resetPage = () => {
    props.showAbilityScreen();
  };

  let char = props.parentState;
  let characterClass = classOptionsData.find(
    obj => obj.name === props.parentState.characterClass
  );

  async function fillForm() {
    const formUrl =
      "https://eviltables.github.io/OSECharacterServer/public/CharacterSheetTemplate7.pdf";
    const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer());

    const char = props.parentState;
    const characterClass = classOptionsData.find(
      obj => obj.name === props.parentState.characterClass
    );

    const abilitiesInfo = `
    Weapons: ${char.weapons.join(", ") || ""}
    Abilities: ${characterClass.abilities.join(", ")}`;

    const weaponsInfo = `
    Weapons: ${char.weapons.join(", ") || ""}
    Armour: ${char.armour.join(", ") || ""}
    `;

    const equipmentInfo = `
    ${char.equipment.join(", ") || ""}
    `;

    const descriptionInfo = `
    Appearance: ${char.appearance}
    Background: ${char.background}
    Personality: ${char.personality}
    Misfortune: ${char.misfortune}
    `;

    const nameInfo = char.characterName || char.name;

    const pdfDoc = await PDFDocument.load(formPdfBytes);

    const form = pdfDoc.getForm();

    const nameField = form.getTextField("Name 2");
    const alignmentField = form.getTextField("Alignment 2");
    const characterClassField = form.getTextField("Character Class 2");
    const levelField = form.getTextField("Level 2");

    const STRField = form.getTextField("STR 2");
    const INTField = form.getTextField("INT 2");
    const DEXField = form.getTextField("DEX 2");
    const WISField = form.getTextField("WIS 2");
    const CONField = form.getTextField("CON 2");
    const CHAField = form.getTextField("CHA 2");

    const deathField = form.getTextField("Death Save 2");
    const wandsField = form.getTextField("Wands Save 2");
    const paralysisField = form.getTextField("Paralysis Save 2");
    const breathField = form.getTextField("Breath Save 2");
    const spellsField = form.getTextField("Spells Save 2");
    const magicField = form.getTextField("Magic Save Mod 2");
    const HPField = form.getTextField("HP 2");
    const maxHPField = form.getTextField("Max HP 2");
    const ACField = form.getTextField("AC 2");
    const CONModField = form.getTextField("CON HP Mod 2");
    const unarmouredACField = form.getTextField("Unarmoured AC 2");

    const DEXACField = form.getTextField("DEX AC Mod 2");
    const STRMeleeField = form.getTextField("STR Melee Mod");
    const DEXMissileField = form.getTextField("DEX Missile Mod");
    const abilitiesField = form.getTextField("Abilities, Skills, Weapons 2");
    const reactionsField = form.getTextField("Reactions CHA Mod 2");
    const equipmentField = form.getTextField("Equipment");
    const weaponsField = form.getTextField("Weapons and Armour");
    const goldField = form.getTextField("GP");
    const descriptionField = form.getTextField("Description");
    const XPLevelField = form.getTextField("XP for Next Level");
    const primeReqField = form.getTextField("PR XP Bonus");
    const attackBonusField = form.getTextField("Attack Bonus");
    const notesField = form.getTextField("Notes");

    const languagesField = form.getTextField("Languages 2");
    const literacyField = form.getCheckBox("Literacy 2");

    const baseAC = char.unarmouredAC || `10 + ${char.dexterityModAC}`;
    const alignmentCapitalized = char.alignment
      ? char.alignment.charAt(0).toUpperCase() + char.alignment.slice(1)
      : "Alignment";

    characterClassField.setText(char.characterClass);
    alignmentField.setText(alignmentCapitalized);
    nameField.setText(nameInfo);
    levelField.setText("1");

    STRField.setText(char.strength.toString());
    INTField.setText(char.intelligence.toString());
    DEXField.setText(char.dexterity.toString());
    WISField.setText(char.wisdom.toString());
    CONField.setText(char.constitution.toString());
    CHAField.setText(char.charisma.toString());

    deathField.setText(characterClass.savingThrows[0].toString());
    wandsField.setText(characterClass.savingThrows[1].toString());
    paralysisField.setText(characterClass.savingThrows[2].toString());
    breathField.setText(characterClass.savingThrows[3].toString());
    spellsField.setText(characterClass.savingThrows[4].toString());

    magicField.setText(char.wisdomMod.toString());
    HPField.setText(char.hitPoints.toString());
    maxHPField.setText(char.hitPoints.toString());
    ACField.setText(char.AC.toString());
    CONModField.setText(char.constitutionMod.toString());
    unarmouredACField.setText(baseAC.toString());
    DEXACField.setText(char.dexterityModAC.toString());
    STRMeleeField.setText(char.strengthModMelee.toString());
    DEXMissileField.setText(char.dexterityModMissiles.toString());
    abilitiesField.setText(abilitiesInfo);
    reactionsField.setText(char.charismaModNPCReactions.toString());
    equipmentField.setText(equipmentInfo);
    weaponsField.setText(weaponsInfo);
    goldField.setText(char.gold.toString());
    descriptionField.setText(descriptionInfo);
    XPLevelField.setText(characterClass.nextLevel.toString());
    primeReqField.setText(char.primeReqMod.toString());
    attackBonusField.setText("0");

    const spellText = char.hasSpells ? `Spells: ${char.spells}` : "";
    notesField.setText(spellText);

    const languageText = char.languages
      ? `${alignmentCapitalized}, Common, ${char.languages.join(", ")}`
      : `${alignmentCapitalized}, Common`;

    languagesField.setText(languageText);

    if (char.intelligence > 8) {
      literacyField.check();
    }

    const pdfBytes = await pdfDoc.save();

    let fileName = `${nameInfo} the ${char.characterClass}.pdf`;

    download(pdfBytes, fileName, "application/pdf");
  }

  return (
    <div className="character-sheet-container container">
      <CharacterSheet
        parentState={props.parentState}
        ref={componentRef}
      ></CharacterSheet>

      {/* {state.displayShort && (
        <div className="character-short">
          <div>Name: {char.characterName}</div>
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
            {characterClass.savingThrows[1]} P{characterClass.savingThrows[2]} B
            {characterClass.savingThrows[3]} S{characterClass.savingThrows[4]}
          </div>
          <div>
            STR {char.strength} INT {char.intelligence} WIS {char.wisdom} DEX{" "}
            {char.dexterity} CON {char.constitution} CHA {char.charisma}
          </div>
          <div>Equipment: {char.equipment.join(", ")}</div>
        </div>
      )} */}

      <div className="button-container">
        <button onClick={props.showStorageSheetScreen}>Tavern</button>
        <button onClick={resetPage}>Main</button>

        <button onClick={() => fillForm()}>Save PDF</button>

        <button
          onClick={() =>
            exportComponentAsPNG(componentRef, {
              fileName: char.characterName + " the " + char.characterClass
            })
          }
        >
          Save PNG
        </button>
      </div>
    </div>
  );
}
