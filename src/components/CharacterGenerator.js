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

export default function CharacterGenerator() {
  const [character, setCharacter] = useState({
    id: null,
    name: null
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
    wisdomMod: 0,
    dexterityModAC: 0,
    dexterityModMissiles: 0,
    dexterityModInitiative: 0,
    constitutionMod: 0,
    charismaModNPCReactions: 0,
    charismaModRetainersMax: 0,
    charismaModLoyalty: 0
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

  const getRandomNumbers = () => {
    const requestBody = {
      jsonrpc: "2.0",
      method: "generateIntegers",
      params: {
        apiKey: process.env.REACT_APP_API_KEY,
        n: "70",
        min: "1",
        max: "6"
      },
      id: "42"
    };
    // use axios
    // https://github.com/axios/axios
    fetch("https://api.random.org/json-rpc/4/invoke", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    })
      .then(res => res.json())
      .then(data => {
        setRandomNumbers(data.result.random.data);
        setLoadingRandomNumbers(false);
      })
      .catch(error => {
        console.error(error);
        setLoadingRandomNumbers(false);
      });
  };

  useEffect(() => {
    getRandomNumbers();
  }, []);

  useEffect(() => {
    if (characterRolled) {
      let newCharacterModifiers = updateAbilityModifiers(abilityScores);
      const primeReqValue = getPrimeReqMod(abilityScores, characterClass);
      newCharacterModifiers.primeReq = primeReqValue;
      setCharacterModifiers(newCharacterModifiers);
    }
  }, [abilityScores, characterClass]);

  //   useEffect(() => {
  //     if (characterRolled) {
  //       const primeReqValue = getPrimeReqMod(abilityScores, characterClass);
  //       setCharacterModifiers({ ...characterModifiers, primeReq: primeReqValue });
  //     }
  //   }, [abilityScores, characterClass]);

  const rollCharacter = () => {
    let newCharacterAbilityScores = {};

    abilityScoreNames.forEach(score => {
      const dieResult = d6(3, randomNumbers);
      newCharacterAbilityScores[score] = dieResult;
      newCharacterAbilityScores[`${score}Original`] = dieResult;
    });

    setAbilityScores(newCharacterAbilityScores);
    setRollButtonHover(false);
    setCharacterClass({ name: null, primeReqs: [] });
    setCharacterRolled(true);
    setPointBuy(0);
  };

  const listBasicClassOptions = () => {
    let basicCharacters = [];
    for (let i = 0; i < 7; i++) {
      let item = classOptionsData[i];
      basicCharacters.push(
        <ClassOptionsButton
          key={item.name}
          characterClass={item}
          abilityScores={abilityScores}
          changeCharacterClass={changeCharacterClass}
        ></ClassOptionsButton>
      );
    }

    return basicCharacters;
  };

  const listAdvancedClassOptions = () => {
    let advancedCharacters = [];
    for (let i = 7; i < classOptionsData.length; i++) {
      let item = classOptionsData[i];
      advancedCharacters.push(
        <ClassOptionsButton
          key={item.name}
          characterClass={item}
          abilityScores={abilityScores}
          changeCharacterClass={changeCharacterClass}
        ></ClassOptionsButton>
      );
    }
    return advancedCharacters;
  };

  const changeCharacterClass = event => {
    //resetCharacter

    let characterClass = classOptionsData.find(
      obj => obj.name === event.target.value
    );

    setCharacterClass(characterClass);
  };

  //   const getPrimeReqMod = (abilityScoreValues, characterClass) => {
  //     //generates the correct prime req by matching a class to a prime requisite

  //     const firstPrimeRequisiteAbility = characterClass.primeReqs[0];

  //     const primeReqAbilityScore = abilityScoreValues[firstPrimeRequisiteAbility];

  //     const primeReqValue = primeRequisiteModifiers[primeReqAbilityScore];

  //     return primeReqValue;

  //     // setCharacterModifiers({ ...characterModifiers, primeReq: primeReqValue });
  //   };

  //   const updateAbilityModifiers = abilityScoreValues => {
  //     let abilityModifiers = {};

  //     abilityScoreNames.forEach(abilityScoreName => {
  //       const value = abilityScoreValues[abilityScoreName];
  //       const newModifiers = getModValue(abilityScoreName, value);

  //       for (const key in newModifiers) {
  //         abilityModifiers[key] = newModifiers[key];
  //       }
  //     });

  //     return abilityModifiers;
  //   };

  return (
    <div className={`wrapper ${rollButtonHover ? "wrapper-alt" : ""}`}>
      <Header
        rollButtonHover={rollButtonHover}
        setRollButtonHover={setRollButtonHover}
        loadingRandomNumbers={loadingRandomNumbers}
        setLoadingRandomNumbers={setLoadingRandomNumbers}
        characterRolled={characterRolled}
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

            <div className="class-options-container container">
              <div className="basic-class-container">
                {listBasicClassOptions()}
              </div>
              <h3 className="advanced-classes-header">
                Advanced Classes{" "}
                <input
                  type="checkbox"
                  value="Advanced Classes"
                  className="checkbox"
                  checked={advancedClassesDisplay}
                  onChange={() =>
                    setAdvancedClassesDisplay(!advancedClassesDisplay)
                  }
                ></input>
              </h3>
              <div className="advanced-class-container">
                {advancedClassesDisplay ? listAdvancedClassOptions() : ""}
              </div>

              <ClassDescription
                characterClass={characterClass}
              ></ClassDescription>
            </div>

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

            {characterRolled && (
              <div>
                <button
                  className="button button--reroll"
                  onClick={rollCharacter}
                >
                  Reroll
                </button>
                <button
                  className="button button--class-option"
                  onClick={pages => {
                    setPages({
                      ...pages,
                      equipmentScreen: false,
                      abilityScreen: false,
                      classScreen: true
                    });
                  }}
                  disabled={characterClass.name === null ? true : false}
                  style={characterClass.name === null ? { opacity: 0.4 } : {}}
                >
                  Class Options
                </button>{" "}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
