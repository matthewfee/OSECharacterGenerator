import React, { useEffect, useRef } from "react";
import classOptionsData from "../data/classOptionsData";
import CharacterSheet from "./CharacterSheet";
import {
  exportComponentAsJPEG,
  exportComponentAsPDF,
  exportComponentAsPNG
} from "react-component-export-image";
import { PDFDocument, StandardFonts, PDFTextField } from "pdf-lib";
import download from "downloadjs";

export default function CharacterSheetScreen(props) {
  const componentRef = useRef();

  useEffect(() => {
    updateLocalStorage();
  }, []);

  const updateLocalStorage = () => {
    const myCharacters = JSON.parse(window.localStorage.getItem("characters"));
    // Remove console logs from your code, you may reveal sensitive data one day because of it

    const id = props.parentState.id;

    if (myCharacters) {
      const alreadyExists = myCharacters.find(obj => {
        return obj.id === id;
      });
      if (alreadyExists) {
        return;
      }
    }

    if (localStorage.getItem("characters") === null) {
      let arr = [];
      arr.push(props.parentState);
      window.localStorage.setItem("characters", JSON.stringify(arr));
    } else {
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

  const alignmentCapitalized = char.alignment
    ? char.alignment.charAt(0).toUpperCase() + char.alignment.slice(1)
    : "Alignment";

  const languageText = char.hasLanguages
    ? `${alignmentCapitalized}, Common, ${char.languages.join(", ")}`
    : `${alignmentCapitalized}, Common`;

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

    return consolidated;
  };

  async function fillForm() {
    const formUrl =
      // move all urls to consts folder/file
      "https://matthewfee.github.io/OSECharacterServer/public/CharacterSheetTemplate7.pdf";
    const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer());

    const char = props.parentState;
    const characterClass = classOptionsData.find(
      obj => obj.name === props.parentState.characterClass
    );

    const abilitiesInfo = `
    Weapons: ${joinDuplicates(char.weapons).join(", ") || ""}
    Abilities: ${characterClass.abilities.join(", ")}`;

    const weaponsInfo = `
    Weapons: ${joinDuplicates(char.weapons).join(", ") || ""}
    Armour: ${char.armour.join(", ") || ""}
    `;

    const equipmentInfo = `
    ${joinDuplicates(char.equipment).join(", ") || ""}
    `;

    const descriptionInfo = `
    Appearance: ${char.appearance}
    Background Skill: ${char.background}
    Personality: ${char.personality}
    Misfortune: ${char.misfortune}
    `;

    const nameInfo = char.characterName || char.name;

    const pdfDoc = await PDFDocument.load(formPdfBytes);

    // pdfDoc.save({ updateFieldAppearances: false });
    // Hmm Im not sure about those 122-210 lines, is there a better way to set and get thsoe values?
    // maybe in a object format
    const form = pdfDoc.getForm();

    const nameField = form.getTextField("Name 2");

    // nameField.defaultUpdateAppearances(courier);

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

    characterClassField.setText(char.characterClass);
    alignmentField.setText(alignmentCapitalized);
    nameField.setText(nameInfo);
    levelField.setText("1");

    // const timesRoman = await pdfDoc.embedFont(StandardFonts.TimesRoman);

    // nameField.defaultUpdateAppearances(timesRoman);

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

    languagesField.setText(languageText);

    if (char.intelligence > 8) {
      literacyField.check();
    }

    const fields = form.getFields();

    // pdfDoc.save({ updateFieldAppearances: false });

    // const textField = fields.find(f => f instanceof PDFTextField);

    // if (textField != null) {
    //   textField.defaultUpdateAppearances(timesRoman);
    //   textField.setText("TimesRoman");
    // }

    // form.updateFieldAppearances(timesRoman);

    const pdfBytes = await pdfDoc.save();

    let fileName = `${nameInfo} the ${char.characterClass}.pdf`;

    download(pdfBytes, fileName, "application/pdf");
  }

  async function fillFormUnderground() {
    const formUrl =
      "https://matthewfee.github.io/OSECharacterServer/public/Underground10.pdf";
    const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer());

    const char = props.parentState;
    const characterClass = classOptionsData.find(
      obj => obj.name === props.parentState.characterClass
    );

    const spellText = char.hasSpells ? `Spells: ${char.spells}` : "";

    const alignmentCapitalized = char.alignment
      ? char.alignment.charAt(0).toUpperCase() + char.alignment.slice(1)
      : "Alignment";

    const languageText = char.hasLanguages
      ? `${alignmentCapitalized}, Common, ${char.languages.join(", ")}`
      : `${alignmentCapitalized}, Common`;

    const abilitiesInfo = `
    Abilities: ${characterClass.abilities.join(", ")}
    Languages: ${languageText}
    ${spellText}`;

    const weaponsInfo = `
    Weapons: ${joinDuplicates(char.weapons).join(", ") || ""}
    Armour: ${char.armour.join(", ") || ""}
    `;

    const equipmentInfo = `${joinDuplicates(char.equipment).join(", ") || ""}`;

    const descriptionInfo = `${char.background}, ${char.personality}, ${char.misfortune}`;

    const portraitInfo = char.appearance;

    const nameInfo = char.characterName || char.name;

    const pdfDoc = await PDFDocument.load(formPdfBytes);

    const form = pdfDoc.getForm();

    const nameField = form.getTextField("Name");

    const alignmentField = form.getTextField("Alignment");
    const characterClassField = form.getTextField("Character Class");
    const levelField = form.getTextField("Level");

    const STRField = form.getTextField("STR");
    const INTField = form.getTextField("INT");
    const DEXField = form.getTextField("DEX");
    const WISField = form.getTextField("WIS");
    const CONField = form.getTextField("CON");
    const CHAField = form.getTextField("CHA");

    const deathField = form.getTextField("Death Save");
    const wandsField = form.getTextField("Wands Save");
    const paralysisField = form.getTextField("Paralysis Save");
    const breathField = form.getTextField("Breath Save");
    const spellsField = form.getTextField("Spells Save");
    const magicField = form.getTextField("Magic Save Mod");
    const HPField = form.getTextField("Current HP");
    const maxHPField = form.getTextField("Max HP");
    const ACField = form.getTextField("AC");
    const CONModField = form.getTextField("CON HP Mod");

    const STRMeleeField = form.getTextField("STR Melee Mod");
    const STRMeleeField2 = form.getTextField("STR Melee Mod 2");
    const DEXMissileField = form.getTextField("DEX Missile Mod");
    const DEXMissileField2 = form.getTextField("Dex Missile Mod 2");
    const abilitiesField = form.getTextField("Abilities");
    const reactionsField = form.getTextField("Reactions CHA Mod");
    const equipmentField = form.getTextField("Equipment");
    const weaponsField = form.getTextField("Weapons and Armour");
    const goldField = form.getTextField("GP");
    const descriptionField = form.getTextField("Description");
    const attackBonusField = form.getTextField("Attack Bonus");

    const portraitField = form.getTextField("Portrait");

    const baseAC = char.unarmouredAC || `10 + ${char.dexterityModAC}`;

    characterClassField.setText(char.characterClass);
    alignmentField.setText(alignmentCapitalized);
    nameField.setText(nameInfo);
    levelField.setText("1");

    // const timesRoman = await pdfDoc.embedFont(StandardFonts.TimesRoman);

    // nameField.defaultUpdateAppearances(timesRoman);

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
    STRMeleeField.setText(char.strengthModMelee.toString());
    STRMeleeField2.setText(char.strengthModMelee.toString());
    DEXMissileField.setText(char.dexterityModMissiles.toString());
    DEXMissileField2.setText(char.dexterityModMissiles.toString());
    abilitiesField.setText(abilitiesInfo);
    reactionsField.setText(char.charismaModNPCReactions.toString());
    equipmentField.setText(equipmentInfo);
    weaponsField.setText(weaponsInfo);
    goldField.setText(char.gold.toString());
    descriptionField.setText(descriptionInfo);
    attackBonusField.setText("0");

    portraitField.setText(portraitInfo);

    const fields = form.getFields();
    // Please remove commented unused code
    // pdfDoc.save({ updateFieldAppearances: false });

    // const textField = fields.find(f => f instanceof PDFTextField);

    // if (textField != null) {
    //   textField.defaultUpdateAppearances(timesRoman);
    //   textField.setText("TimesRoman");
    // }

    // form.updateFieldAppearances(timesRoman);

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
        <h3 className="header-default header-pdf">Export to PDF</h3>

        <div className="pdf-export-container">
          <button onClick={() => fillForm()}>Purist Sheet</button>

          <button onClick={() => fillFormUnderground()}>
            Underground Sheet
          </button>
        </div>

        <h3 className="header-default header-pdf">Navigation</h3>

        <div className="navigation">
          <button onClick={props.showStorageSheetScreen}>Tavern</button>
          <button onClick={resetPage}>Main</button>
        </div>

        {/* <button
          onClick={() =>
            exportComponentAsPNG(componentRef, {
              fileName: char.characterName + " the " + char.characterClass
            })
          }
        >
          Save PNG
        </button> */}
      </div>
    </div>
  );
}
