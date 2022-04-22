import React, { useState, useEffect } from "react";
import { css } from "@emotion/react";
import Header from "./Header";
import AbilityScores from "./AbilityScores";
import abilityScoreMods from "../data/abilityScoreMods";
import {
  abilityScoreNames,
  primeRequisiteModifiers
} from "../constants/constants";
import {
  getModValue,
  d6,
  getPrimeReqMod,
  updateAbilityModifiers
} from "../utilities/utilities";
import classOptionsData from "../data/classOptionsData";
import ClassOptionsButton from "./ClassOptionsButton";
import ClassDescription from "./ClassDescription";
import ClassOptions from "./ClassOptions";
import NavBar from "./NavBar";
import ClassScreen from "./ClassScreen";
import EquipmentScreen from "./EquipmentScreen";
import DetailsScreen from "./DetailsScreen";
import CharacterSheetScreen from "./CharacterSheetScreen";
import { getRandomNumbers } from "../API/getRandomNumbers";
import CharacterStorageScreen from "./CharacterStorageScreen";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

export default function CharacterGenerator() {
  const [character, setCharacter] = useState({
    id: null,
    name: null,
    languages: [],
    hasLanguages: null,
    personality: null,
    misfortune: null,
    appearance: null,
    backgroundSkill: null,
    alignment: null
  });

  const [abilityScores, setAbilityScores] = useState({
    strength: null,
    strengthOriginal: null,
    intelligence: null,
    intelligenceOriginal: null,
    wisdom: null,
    wisdomOriginal: null,
    dexterity: null,
    dexterityOriginal: null,
    constitution: null,
    constitutionOriginal: null,
    charisma: null,
    charismaOriginal: null
  });

  const [characterModifiers, setCharacterModifiers] = useState({
    primeReq: 0,
    strengthModMelee: 0,
    strengthModDoors: 0,
    intelligenceModLanguages: 0,
    intelligenceModLiteracy: "",
    intelligenceModExtraLanguageCount: 0,
    wisdomMod: 0,
    dexterityModAC: 0,
    dexterityModMissiles: 0,
    dexterityModInitiative: 0,
    constitutionMod: 0,
    charismaModNPCReactions: 0,
    charismaModRetainersMax: 0,
    charismaModLoyalty: 0
  });

  const [characterStatistics, setCharacterStatistics] = useState({
    hitPoints: null,
    armourClass: null,
    spell: null,
    hasSpells: false,
    unarmouredAC: null
  });

  const [pointBuy, setPointBuy] = useState(0);

  const [characterClass, setCharacterClass] = useState({
    name: null,
    primeReqs: []
  });

  const [pages, setPages] = useState({
    equipmentScreen: false,
    abilityScreen: true,
    classScreen: false,
    detailsScreen: false,
    characterSheetScreen: false,
    characterStorageScreen: false
  });

  const [characterEquipment, setCharacterEquipment] = useState({
    armour: [],
    weapons: [],
    adventuringGear: [],
    gold: null
  });

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  const [loadingRandomNumbers, setLoadingRandomNumbers] = useState(true);
  const [randomNumbers, setRandomNumbers] = useState([]);

  const [characterRolled, setCharacterRolled] = useState(false);
  const [rollButtonHover, setRollButtonHover] = useState(false);

  const [advancedClassesDisplay, setAdvancedClassesDisplay] = useState(false);

  const loadRandomNumbers = async function() {
    const randomNumbers = await getRandomNumbers();
    if (randomNumbers) {
      setRandomNumbers(randomNumbers);
    }
    setLoadingRandomNumbers(false);
  };

  useEffect(() => {
    loadRandomNumbers();
  }, []);

  useEffect(() => {
    if (characterRolled) {
      let newCharacterModifiers = updateAbilityModifiers(abilityScores);
      const primeReqValue = getPrimeReqMod(abilityScores, characterClass);
      newCharacterModifiers.primeReq = primeReqValue;
      setCharacterModifiers(newCharacterModifiers);
    }
  }, [abilityScores, characterClass]);

  const rollCharacter = () => {
    let newCharacterAbilityScores = {};

    abilityScoreNames.forEach(score => {
      const dieResult = d6(3, randomNumbers);
      newCharacterAbilityScores[score] = dieResult;
      newCharacterAbilityScores[`${score}Original`] = dieResult;
    });

    const newID = uuidv4();

    setCharacter({ ...character, id: newID });

    setAbilityScores(newCharacterAbilityScores);
    setRollButtonHover(false);
    setCharacterClass({ name: null, primeReqs: [] });
    setCharacterRolled(true);
    setPointBuy(0);
  };

  const changeCharacterClass = event => {
    let characterClass = classOptionsData.find(
      obj => obj.name === event.target.value
    );

    setCharacterClass(characterClass);
  };

  return (
    <div className={`wrapper ${rollButtonHover ? "wrapper-alt" : ""}`}>
      <Header
        rollButtonHover={rollButtonHover}
        setRollButtonHover={setRollButtonHover}
        loadingRandomNumbers={loadingRandomNumbers}
        setLoadingRandomNumbers={setLoadingRandomNumbers}
        characterRolled={characterRolled}
        setCharacterRolled={setCharacterRolled}
        rollCharacter={rollCharacter}
        pages={pages}
        setPages={setPages}
      ></Header>
      <div
        className={`character-menu container`}
        style={{ display: characterRolled ? "inline-block" : "none" }}
      >
        {pages.abilityScreen && characterRolled && (
          <div className="ability-screen container">
            <h2 className="header-default character-class-header">
              Character Class
            </h2>
            <ClassOptions
              characterClass={characterClass}
              abilityScores={abilityScores}
              changeCharacterClass={changeCharacterClass}
            ></ClassOptions>

            <h2 className="ability-scores--header header-default">
              Ability Scores
            </h2>

            <AbilityScores
              abilityScores={abilityScores}
              setAbilityScores={setAbilityScores}
              pointBuy={pointBuy}
              setPointBuy={setPointBuy}
              characterClass={characterClass}
              characterModifiers={characterModifiers}
            ></AbilityScores>

            <NavBar
              rollCharacter={rollCharacter}
              pages={pages}
              setPages={setPages}
              characterClass={characterClass}
            ></NavBar>
          </div>
        )}

        {pages.classScreen && (
          <ClassScreen
            pages={pages}
            setPages={setPages}
            characterClass={characterClass}
            character={character}
            setCharacter={setCharacter}
            characterModifiers={characterModifiers}
            characterStatistics={characterStatistics}
            setCharacterStatistics={setCharacterStatistics}
          ></ClassScreen>
        )}

        {pages.equipmentScreen && (
          <EquipmentScreen
            characterClass={characterClass}
            pages={pages}
            setPages={setPages}
            characterModifiers={characterModifiers}
            characterStatistics={characterStatistics}
            setCharacterStatistics={setCharacterStatistics}
            characterEquipment={characterEquipment}
            setCharacterEquipment={setCharacterEquipment}
            randomNumbers={randomNumbers}
          />
        )}

        {pages.detailsScreen && (
          <DetailsScreen
            pages={pages}
            setPages={setPages}
            character={character}
            setCharacter={setCharacter}
            characterClass={characterClass}
            characterModifiers={characterModifiers}
          ></DetailsScreen>
        )}

        {pages.characterSheetScreen && (
          <CharacterSheetScreen
            pages={pages}
            setPages={setPages}
            character={character}
            characterStatistics={characterStatistics}
            characterClass={characterClass}
            characterEquipment={characterEquipment}
            characterModifiers={characterModifiers}
            abilityScores={abilityScores}
            setCharacterRolled={setCharacterRolled}
          ></CharacterSheetScreen>
        )}

        {pages.characterStorageScreen && (
          <CharacterStorageScreen
            pages={pages}
            setPages={setPages}
            character={character}
            setCharacter={setCharacter}
            characterStatistics={characterStatistics}
            setCharacterStatistics={setCharacterStatistics}
            characterClass={characterClass}
            setCharacterClass={setCharacterClass}
            characterEquipment={characterEquipment}
            setCharacterEquipment={setCharacterEquipment}
            characterModifiers={characterModifiers}
            setCharacterModifiers={setCharacterModifiers}
            abilityScores={abilityScores}
            setAbilityScores={setAbilityScores}
            setCharacterRolled={setCharacterRolled}
          ></CharacterStorageScreen>
        )}
      </div>
    </div>
  );
}

CharacterGenerator.propTypes = {
  character: PropTypes.object,
  abilityScores: PropTypes.shape({
    strength: PropTypes.number,
    strengthOriginal: PropTypes.number,
    intelligence: PropTypes.number,
    intelligenceOriginal: PropTypes.number,
    wisdom: PropTypes.number,
    wisdomOriginal: PropTypes.number,
    dexterity: PropTypes.number,
    dexterityOriginal: PropTypes.number,
    constitution: PropTypes.number,
    constitutionOriginal: PropTypes.number,
    charisma: PropTypes.number,
    charismaOriginal: PropTypes.number
  }),
  characterModifiers: PropTypes.shape({
    primeReq: PropTypes.number,
    strengthModMelee: PropTypes.number,
    strengthModDoors: PropTypes.number,
    intelligenceModLanguages: PropTypes.number,
    intelligenceModLiteracy: PropTypes.string,
    intelligenceModExtraLanguageCount: PropTypes.number,
    wisdomMod: PropTypes.number,
    dexterityModAC: PropTypes.number,
    dexterityModMissiles: PropTypes.number,
    dexterityModInitiative: PropTypes.number,
    constitutionMod: PropTypes.number,
    charismaModNPCReactions: PropTypes.number,
    charismaModRetainersMax: PropTypes.number,
    charismaModLoyalty: PropTypes.number
  }),
  characterStatistics: PropTypes.shape({
    hitPoints: PropTypes.number,
    armourClass: PropTypes.number,
    spell: PropTypes.array,
    hasSpells: PropTypes.bool,
    unarmouredAC: PropTypes.number
  }),
  pointBuy: PropTypes.number,
  characterClass: PropTypes.shape({
    name: PropTypes.string,
    primeReqs: PropTypes.array
  }),
  pages: PropTypes.shape({
    equipmentScreen: PropTypes.bool,
    abilityScreen: PropTypes.bool,
    classScreen: PropTypes.bool,
    detailsScreen: PropTypes.bool,
    characterSheetScreen: PropTypes.bool,
    characterStorageScreen: PropTypes.bool
  }),
  characterEquipment: PropTypes.shape({
    armour: PropTypes.array,
    weapons: PropTypes.array,
    adventuringGear: PropTypes.array,
    gold: PropTypes.number
  }),
  loadingRandomNumbers: PropTypes.bool,
  randomNumbers: PropTypes.array,
  characterolled: PropTypes.bool,
  rollButtonHover: PropTypes.bool,
  advancedClassesDisplay: PropTypes.bool
};
