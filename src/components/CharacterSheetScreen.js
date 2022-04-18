import React, { useEffect, useRef } from "react";
import classOptionsData from "../data/classOptionsData";
import CharacterSheet from "./CharacterSheet";
import { PDFDocument, StandardFonts, PDFTextField, values } from "pdf-lib";
import { joinDuplicates } from "../utilities/utilities";
import download from "downloadjs";

export default function CharacterSheetScreen(props) {
  const {
    pages,
    setPages,
    character,
    characterStatistics,
    characterClass,
    characterEquipment,
    characterModifiers,
    abilityScores
  } = props;
  const componentRef = useRef();

  const characterDataObject = {
    character,
    characterStatistics,
    characterClass,
    characterEquipment,
    abilityScores
  };

  useEffect(() => {
    updateLocalStorage();
  }, []);

  const updateLocalStorage = () => {
    const myCharacters = JSON.parse(window.localStorage.getItem("characters"));

    const id = character.id || 0;

    if (myCharacters) {
      const alreadyExists = myCharacters.find(obj => {
        return obj.id === id;
      });
      if (alreadyExists) {
        return;
      }
    }
    let arr = [];

    if (localStorage.getItem("characters") === null) {
      let arr = [];
      arr.push(characterDataObject);
      window.localStorage.setItem("characters", JSON.stringify(arr));
    } else {
      myCharacters.push(characterDataObject);
      window.localStorage.setItem("characters", JSON.stringify(myCharacters));
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
    const formUrl =
      // move all urls to consts folder/file
      "https://matthewfee.github.io/OSECharacterServer/public/CharacterSheetTemplate7.pdf";
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
    const formUrl =
      "https://matthewfee.github.io/OSECharacterServer/public/Underground10.pdf";
    const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer());

    // const spellText = char.hasSpells ? `Spells: ${char.spells}` : "";

    // const alignmentCapitalized = char.alignment
    //   ? char.alignment.charAt(0).toUpperCase() + char.alignment.slice(1)
    //   : "Alignment";

    // const languageText = char.hasLanguages
    //   ? `${alignmentCapitalized}, Common, ${char.languages.join(", ")}`
    //   : `${alignmentCapitalized}, Common`;

    // const abilitiesInfo = `
    // Abilities: ${characterClass.abilities.join(", ")}
    // Languages: ${languageText}
    // ${spellText}`;

    // const weaponsInfo = `
    // Weapons: ${joinDuplicates(char.weapons).join(", ") || ""}
    // Armour: ${char.armour.join(", ") || ""}
    // `;

    //   const equipmentInfo = `${joinDuplicates(char.equipment).join(", ") || ""}`;

    //   const descriptionInfo = `${char.background}, ${char.personality}, ${char.misfortune}`;

    //   const portraitInfo = char.appearance;

    //   const nameInfo = char.characterName || char.name;

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

    //   const nameField = form.getTextField("Name");

    //   const alignmentField = form.getTextField("Alignment");
    //   const characterClassField = form.getTextField("Character Class");
    //   const levelField = form.getTextField("Level");

    //   const STRField = form.getTextField("STR");
    //   const INTField = form.getTextField("INT");
    //   const DEXField = form.getTextField("DEX");
    //   const WISField = form.getTextField("WIS");
    //   const CONField = form.getTextField("CON");
    //   const CHAField = form.getTextField("CHA");

    //   const deathField = form.getTextField("Death Save");
    //   const wandsField = form.getTextField("Wands Save");
    //   const paralysisField = form.getTextField("Paralysis Save");
    //   const breathField = form.getTextField("Breath Save");
    //   const spellsField = form.getTextField("Spells Save");
    //   const magicField = form.getTextField("Magic Save Mod");
    //   const HPField = form.getTextField("Current HP");
    //   const maxHPField = form.getTextField("Max HP");
    //   const ACField = form.getTextField("AC");
    //   const CONModField = form.getTextField("CON HP Mod");

    //   const STRMeleeField = form.getTextField("STR Melee Mod");
    //   const STRMeleeField2 = form.getTextField("STR Melee Mod 2");
    //   const DEXMissileField = form.getTextField("DEX Missile Mod");
    //   const DEXMissileField2 = form.getTextField("Dex Missile Mod 2");
    //   const abilitiesField = form.getTextField("Abilities");
    //   const reactionsField = form.getTextField("Reactions CHA Mod");
    //   const equipmentField = form.getTextField("Equipment");
    //   const weaponsField = form.getTextField("Weapons and Armour");
    //   const goldField = form.getTextField("GP");
    //   const descriptionField = form.getTextField("Description");
    //   const attackBonusField = form.getTextField("Attack Bonus");

    //   const portraitField = form.getTextField("Portrait");

    //   const baseAC = char.unarmouredAC || `10 + ${char.dexterityModAC}`;

    //   characterClassField.setText(char.characterClass);
    //   alignmentField.setText(alignmentCapitalized);
    //   nameField.setText(nameInfo);
    //   levelField.setText("1");

    //   STRField.setText(char.strength.toString());
    //   INTField.setText(char.intelligence.toString());
    //   DEXField.setText(char.dexterity.toString());
    //   WISField.setText(char.wisdom.toString());
    //   CONField.setText(char.constitution.toString());
    //   CHAField.setText(char.charisma.toString());

    //   deathField.setText(characterClass.savingThrows[0].toString());
    //   wandsField.setText(characterClass.savingThrows[1].toString());
    //   paralysisField.setText(characterClass.savingThrows[2].toString());
    //   breathField.setText(characterClass.savingThrows[3].toString());
    //   spellsField.setText(characterClass.savingThrows[4].toString());

    //   magicField.setText(char.wisdomMod.toString());
    //   HPField.setText(char.hitPoints.toString());
    //   maxHPField.setText(char.hitPoints.toString());
    //   ACField.setText(char.AC.toString());
    //   CONModField.setText(char.constitutionMod.toString());
    //   STRMeleeField.setText(char.strengthModMelee.toString());
    //   STRMeleeField2.setText(char.strengthModMelee.toString());
    //   DEXMissileField.setText(char.dexterityModMissiles.toString());
    //   DEXMissileField2.setText(char.dexterityModMissiles.toString());
    //   abilitiesField.setText(abilitiesInfo);
    //   reactionsField.setText(char.charismaModNPCReactions.toString());
    //   equipmentField.setText(equipmentInfo);
    //   weaponsField.setText(weaponsInfo);
    //   goldField.setText(char.gold.toString());
    //   descriptionField.setText(descriptionInfo);
    //   attackBonusField.setText("0");

    //   portraitField.setText(portraitInfo);

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
          {/* <button onClick={props.showStorageSheetScreen}>Tavern</button> */}
          {/* <button onClick={resetPage}>Main</button> */}
        </div>
      </div>
    </div>
  );
}
