import React, { useEffect, useRef } from "react";
import classOptionsData from "../data/classOptionsData";
import CharacterSheet from "./CharacterSheet";
import { PDFDocument, StandardFonts, PDFTextField, values } from "pdf-lib";
import { joinDuplicates } from "../utilities/utilities";
import download from "downloadjs";
import {
  CHARACTER_SHEET_PURIST_URL,
  CHARACTER_SHEET_UNDERGROUND_URL
} from "../constants/constants";

export default function CharacterSheetScreen(props) {
  const {
    pages,
    setPages,
    character,
    characterStatistics,
    characterClass,
    characterEquipment,
    characterModifiers,
    abilityScores,
    setCharacterRolled
  } = props;
  const componentRef = useRef();

  const characterDataObject = {
    character,
    characterStatistics,
    characterClass,
    characterEquipment,
    characterModifiers,
    abilityScores
  };

  useEffect(() => {
    updateLocalStorage();
  }, []);

  const updateLocalStorage = () => {
    const myCharacters = JSON.parse(
      window.localStorage.getItem("characterStorage")
    );

    const id = character.id || 0;

    if (myCharacters) {
      const alreadyExists = myCharacters.find(obj => {
        return obj.character.id === id;
      });
      if (alreadyExists) {
        return;
      }
    }
    let arr = [];

    if (localStorage.getItem("characterStorage") === null) {
      let arr = [];
      arr.push(characterDataObject);
      window.localStorage.setItem("characterStorage", JSON.stringify(arr));
    } else {
      myCharacters.push(characterDataObject);
      window.localStorage.setItem(
        "characterStorage",
        JSON.stringify(myCharacters)
      );
    }
  };

  // const resetPage = () => {
  //   props.showAbilityScreen();
  // };

  // let char = props.parentState;
  // let characterClass = classOptionsData.find(
  //   obj => obj.name === props.parentState.characterClass
  // );

  const alignmentCapitalized = character.alignment
    ? character.alignment.charAt(0).toUpperCase() + character.alignment.slice(1)
    : "Alignment";

  const languageText = character.hasLanguages
    ? `${alignmentCapitalized}, Common, ${character.languages.join(", ")}`
    : `${alignmentCapitalized}, Common`;

  const abilitiesInfo = `
    Weapons: ${joinDuplicates(characterEquipment.weapons).join(", ") || ""}
    Abilities: ${characterClass.abilities.join(", ")}`;

  const weaponsInfo = `
    Weapons: ${joinDuplicates(characterEquipment.weapons).join(", ") || ""}
    Armour: ${characterEquipment.armour.join(", ") || ""}
    `;

  const equipmentInfo = `
    ${joinDuplicates(characterEquipment.adventuringGear).join(", ") || ""}
    `;

  const spellText = character.hasSpells ? `Spells: ${char.spells}` : "";

  const descriptionInfo = `
    Appearance: ${character.appearance}
    Background Skill: ${character.background}
    Personality: ${character.personality}
    Misfortune: ${character.misfortune}
    `;

  async function fillForm() {
    const formUrl = CHARACTER_SHEET_PURIST_URL;
    const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer());

    const pdfDoc = await PDFDocument.load(formPdfBytes);

    // pdfDoc.save({ updateFieldAppearances: false });
    // Hmm Im not sure about those 122-210 lines, is there a better way to set and get thsoe values?
    // maybe in a object format

    const form = pdfDoc.getForm();

    const formFieldKeysOfficialSheet = {
      //matches the PDF Form labels with correct data
      "Name 2": character.name,
      "Alignment 2": alignmentCapitalized,
      "Character Class 2": characterClass.name,
      "Level 2": "1",
      "STR 2": abilityScores.strength,
      "INT 2": abilityScores.intelligence,
      "DEX 2": abilityScores.dexterity,
      "WIS 2": abilityScores.wisdom,
      "CON 2": abilityScores.constitution,
      "CHA 2": abilityScores.charisma,

      "Death Save 2": characterClass.savingThrows[0],
      "Wands Save 2": characterClass.savingThrows[1],
      "Paralysis Save 2": characterClass.savingThrows[2],
      "Breath Save 2": characterClass.savingThrows[3],
      "Spells Save 2": characterClass.savingThrows[4],

      "Magic Save Mod 2": characterModifiers.wisdomMod,
      "HP 2": characterStatistics.hitPoints,
      "Max HP 2": characterStatistics.hitPoints,
      "AC 2": characterStatistics.armourClass,
      "CON HP Mod 2": characterModifiers.constitutionMod,
      "Unarmoured AC 2": characterStatistics.unarmouredAC,
      "DEX AC Mod 2": characterModifiers.dexterityModAC,
      "STR Melee Mod": characterModifiers.strengthModMelee,
      "DEX Missile Mod": characterModifiers.dexterityModMissiles,
      "Abilities, Skills, Weapons 2": abilitiesInfo,
      "Reactions CHA Mod 2": characterModifiers.charismaModNPCReactions,
      Equipment: equipmentInfo,
      "Weapons and Armour": weaponsInfo,
      GP: characterEquipment.gold,
      Description: descriptionInfo,
      "XP for Next Level": characterClass.nextLevel,
      "PR XP Bonus": characterModifiers.primeReqMod,
      "Attack Bonus": "0",
      Notes: spellText,
      "Languages 2": languageText
    };

    for (const key in formFieldKeysOfficialSheet) {
      let value = formFieldKeysOfficialSheet[key];
      if (value) {
        value = value.toString();
      }
      form.getTextField(key).setText(value);
    }

    const literacyField = form.getCheckBox("Literacy 2");
    if (abilityScores.intelligence > 8) {
      literacyField.check();
    }

    const pdfBytes = await pdfDoc.save();

    const fileName = `${character.name} the ${characterClass.name}.pdf`;

    download(pdfBytes, fileName, "application/pdf");
  }

  async function fillFormUnderground() {
    const formUrl = CHARACTER_SHEET_UNDERGROUND_URL;

    const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer());

    const pdfDoc = await PDFDocument.load(formPdfBytes);

    const form = pdfDoc.getForm();

    const formFieldKeysUndergroundSheet = {
      //matches the PDF Form labels with correct data
      Name: character.name,
      Alignment: alignmentCapitalized,
      "Character Class": characterClass.name,
      Level: "1",
      STR: abilityScores.strength,
      INT: abilityScores.intelligence,
      DEX: abilityScores.dexterity,
      WIS: abilityScores.wisdom,
      CON: abilityScores.constitution,
      CHA: abilityScores.charisma,

      "Death Save": characterClass.savingThrows[0],
      "Wands Save": characterClass.savingThrows[1],
      "Paralysis Save": characterClass.savingThrows[2],
      "Breath Save": characterClass.savingThrows[3],
      "Spells Save": characterClass.savingThrows[4],

      "Magic Save Mod": characterModifiers.wisdomMod,
      "Current HP": characterStatistics.hitPoints,
      "Max HP": characterStatistics.hitPoints,
      AC: characterStatistics.armourClass,
      "CON HP Mod": characterModifiers.constitutionMod,

      "STR Melee Mod": characterModifiers.strengthModMelee,
      "STR Melee Mod 2": characterModifiers.strengthModMelee,
      "DEX Missile Mod": characterModifiers.dexterityModMissiles,
      "Dex Missile Mod 2": characterModifiers.dexterityModMissiles,
      Abilities: abilitiesInfo,
      "Reactions CHA Mod": characterModifiers.charismaModNPCReactions,
      Equipment: equipmentInfo,
      "Weapons and Armour": weaponsInfo,
      GP: characterEquipment.gold,
      Description: descriptionInfo,
      "Attack Bonus": "0",
      Portrait: character.appearance
    };

    for (const key in formFieldKeysUndergroundSheet) {
      let value = formFieldKeysUndergroundSheet[key];
      if (value) {
        value = value.toString();
      }
      form.getTextField(key).setText(value);
    }

    const pdfBytes = await pdfDoc.save();

    let fileName = `${character.name} the ${characterClass.name}.pdf`;

    download(pdfBytes, fileName, "application/pdf");
  }

  return (
    <div className="character-sheet-container container">
      <CharacterSheet
        character={character}
        characterStatistics={characterStatistics}
        characterClass={characterClass}
        characterEquipment={characterEquipment}
        characterModifiers={characterModifiers}
        abilityScores={abilityScores}
        ref={componentRef}
      ></CharacterSheet>

      <div className="button-container">
        <h3 className="header-default header-pdf">Export to PDF</h3>

        <div className="pdf-export-container">
          <button onClick={() => fillForm()}>Purist Sheet</button>

          <button onClick={() => fillFormUnderground()}>
            Underground Sheet
          </button>
        </div>

        <h3 className="header-default header-pdf">Navigation</h3>

        <div className="navigation">
          <button
            onClick={() => {
              setPages({
                ...pages,
                characterStorageScreen: true,
                characterSheetScreen: false
              });
            }}
          >
            Tavern
          </button>

          <button
            onClick={() => {
              setPages({
                ...pages,
                abilityScreen: true,
                characterSheetScreen: false
              });
              setCharacterRolled(false);
            }}
          >
            Main
          </button>
        </div>
      </div>
    </div>
  );
}
