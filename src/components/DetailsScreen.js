import React, { useState, useEffect } from "react";
import classOptionsData from "../data/classOptionsData";
import {
  firstNames,
  lastNames,
  appearances,
  traits,
  misfortunes,
  languageOptions
} from "../constants/constants";
import { chooseRandomItem } from "../utilities/utilities";

export default function DetailsScreen(props) {
  const {
    pages,
    setPages,
    character,
    setCharacter,
    characterClass,
    characterModifiers
  } = props;

  const [characterName, setCharacterName] = useState("");
  const [alignment, setAlignment] = useState("");
  const [appearance, setAppearance] = useState("");
  const [personality, setPersonality] = useState("");
  const [background, setBackground] = useState("");
  const [misfortune, setMisfortune] = useState("");
  const [languages, setLanguages] = useState([]);
  const [languageSelected, setLanguageSelected] = useState("");
  const [languageCount, setLanguageCount] = useState();
  const [classLanguageCount, setClassLanguageCount] = useState(0);
  const [hasLanguages, setHasLanguages] = useState(true);

  useEffect(() => {
    const languagesArr = characterClass.languages.split(",");

    if (languagesArr.length <= 2) {
      if (characterModifiers.intelligenceModExtraLanguageCount < 1) {
        setHasLanguages(false);
      }
      return;
    } else {
      //first two langauges are not class-specific languages
      const classLanguageNumber = languagesArr.length - 2;
      setClassLanguageCount(classLanguageNumber);
      setLanguages(languagesArr);
    }
  }, []);

  useEffect(() => {
    setLanguageCount(
      characterModifiers.extraLanguageCount +
        classLanguageCount -
        characterClass.languages.length
    );
  }, [languages]);

  const handleName = event => {
    setCharacterName(event.currentTarget.value);
  };

  const handleAlignment = event => {
    setAlignment(event.currentTarget.value);
  };

  const getName = () => {
    let fullName = `${chooseRandomItem(firstNames)} ${chooseRandomItem(
      lastNames
    )}`;

    setCharacterName(fullName);
  };

  const getAppearance = () => {
    let appearanceArray = [...appearances];
    let num = 2;
    let selectedAppearances = [];
    for (let i = 0; i < num; i++) {
      let randomAppearance = chooseRandomItem(appearanceArray);
      selectedAppearances.push(randomAppearance);
      appearanceArray = appearanceArray.filter(k => k !== randomAppearance);
    }

    setAppearance(selectedAppearances.join(", "));
  };

  const getBackground = () => {
    let bgs = [];

    // This code looks suspicious.
    // use map() or figure out some other way
    bgs = bgs.concat(Array(3).fill("Animal trainer"));
    bgs = bgs.concat(Array(2).fill("Armorer"));
    bgs = bgs.concat(Array(4).fill("Baker"));
    bgs = bgs.concat(Array(3).fill("Blacksmith"));
    bgs = bgs.concat(Array(1).fill("Bookbinder"));
    bgs = bgs.concat(Array(4).fill("Bowyer/fletcher"));
    bgs = bgs.concat(Array(4).fill("Brewer"));
    bgs = bgs.concat(Array(3).fill("Butcher"));
    bgs = bgs.concat(Array(3).fill("Carpenter"));
    bgs = bgs.concat(Array(3).fill("Chandler"));
    bgs = bgs.concat(Array(3).fill("Cooper"));
    bgs = bgs.concat(Array(2).fill("Coppersmith"));
    bgs = bgs.concat(Array(10).fill("Farmer"));
    bgs = bgs.concat(Array(4).fill("Fisher"));
    bgs = bgs.concat(Array(4).fill("Furrier"));
    bgs = bgs.concat(Array(1).fill("Glassblower"));
    bgs = bgs.concat(Array(4).fill("Hunter"));
    bgs = bgs.concat(Array(3).fill("Jeweller"));
    bgs = bgs.concat(Array(3).fill("Lorimer"));
    bgs = bgs.concat(Array(1).fill("Cartographer"));
    bgs = bgs.concat(Array(3).fill("Mason"));
    bgs = bgs.concat(Array(3).fill("Miner"));
    bgs = bgs.concat(Array(3).fill("Potter"));
    bgs = bgs.concat(Array(2).fill("Roper"));
    bgs = bgs.concat(Array(3).fill("Sailor"));
    bgs = bgs.concat(Array(3).fill("Shipwright"));
    bgs = bgs.concat(Array(3).fill("Tailor"));
    bgs = bgs.concat(Array(3).fill("Tanner"));
    bgs = bgs.concat(Array(3).fill("Thatcher"));
    bgs = bgs.concat(Array(3).fill("Lumberjack"));
    bgs = bgs.concat(Array(2).fill("Vinter"));
    bgs = bgs.concat(Array(1).fill("Noble bastard"));

    setBackground(chooseRandomItem(bgs));
  };

  const getPersonality = () => {
    let num = 2;
    let traitsArray = [...traits];
    let selectedPersonalities = [];
    for (let i = 0; i < num; i++) {
      let randomTrait = chooseRandomItem(traits);
      selectedPersonalities.push(randomTrait);
      traitsArray = traits.filter(k => k !== randomTrait);
    }

    setPersonality(selectedPersonalities.join(", "));
  };

  const getMisfortune = () => {
    let randomMisfortune = chooseRandomItem(misfortunes);
    setMisfortune(randomMisfortune);
  };

  const languageOption = item => {
    return (
      <option key={item} value={item}>
        {item}
      </option>
    );
  };

  const languagesList = () => {
    return languageOptions.map(item => {
      return languageOption(item);
    });
  };

  const chooseLanguage = () => {
    setLanguageSelected(chooseRandomItem(languageOption));
  };

  const handleLanguageChange = event => {
    setLanguageSelected(event.target.value);
  };

  const addLanguage = () => {
    if (languages.includes(languageSelected) || languageSelected === "") {
      return;
    }
    setLanguages(oldArray => [...oldArray, languageSelected]);
  };

  return (
    <div className="details-screen-container">
      <div id="print-wrapper">
        <h3 className="header-default">Character Details</h3>

        <div className="character-details-form">
          <label className="form-label form-label--name">
            <div className="form-text">Choose Name:</div>
            <input
              className="form-input"
              type="text"
              value={characterName}
              onChange={handleName}
            />
            <button
              className="button button--random-name"
              onClick={getName}
              type="button"
            >
              Random Name
            </button>
          </label>

          <div className="form-label form-label--alignment">
            <div className="form-text">Select Alignment:</div>

            <div className="alignment-button-container">
              <button
                type="button"
                value="lawful"
                className={
                  alignment === "lawful"
                    ? "button button--alignment button--alignment--selected"
                    : "button button--alignment"
                }
                onClick={e => handleAlignment(e, "value")}
              >
                Lawful
              </button>
              <button
                type="button"
                value="neutral"
                className={
                  alignment === "neutral"
                    ? "button button--alignment button--alignment--selected"
                    : "button button--alignment"
                }
                onClick={e => handleAlignment(e, "value")}
              >
                Neutral
              </button>
              <button
                type="button"
                value="chaotic"
                className={
                  alignment === "chaotic"
                    ? "button button--alignment button--alignment--selected"
                    : "button button--alignment"
                }
                onClick={e => handleAlignment(e, "value")}
              >
                Chaotic
              </button>
            </div>
          </div>

          <div className="form-label form-label--languages">
            <div className="form-text">
              {languageCount > 0
                ? `Additional Languages (${languageCount}):`
                : "Languages:"}{" "}
            </div>

            <div className="language-container">
              {`${alignment ? alignment : "Alignment"}, Common${
                languages.length > 0 ? ", " + languages.join(", ") : ""
              }`}
            </div>

            {languageCount > 0 && (
              <div className="language-select-container">
                <select
                  className="spells-select"
                  value={languageSelected}
                  onChange={handleLanguageChange}
                >
                  <option value="" disabled>
                    Select Language
                  </option>
                  {languagesList()}
                </select>
                <button
                  className="button--random-language"
                  onClick={() => chooseLanguage()}
                >
                  Random
                </button>
                <button
                  className="button--add-language"
                  onClick={() => addLanguage()}
                >
                  Add
                </button>
              </div>
            )}
          </div>

          <div className="form-label form-label--optional-details">
            <div type="button" className="form-text">
              Optional Details
            </div>

            {!appearance && (
              <button
                type="button"
                className="button button--optional-details"
                onClick={getAppearance}
              >
                Appearance
              </button>
            )}

            {appearance && (
              <div className="details-result">
                <span className="details-result--name"> Appearance: </span>
                <span className="details-result--data"> {appearance}</span>
                <button
                  type="button"
                  className="button button--details-reroll"
                  onClick={getAppearance}
                >
                  Reroll
                </button>
              </div>
            )}

            {!personality && (
              <button
                type="button"
                className="button button--optional-details"
                onClick={getPersonality}
              >
                Personality
              </button>
            )}

            {personality && (
              <div className="details-result">
                <span className="details-result--name">Personality:</span>
                <span className="details-result--data">{personality}</span>
                <button
                  type="button"
                  className="button button--details-reroll"
                  onClick={getPersonality}
                >
                  Reroll
                </button>
              </div>
            )}

            {!background && (
              <button
                type="button"
                className="button button--optional-details"
                onClick={getBackground}
              >
                Background
              </button>
            )}

            {background && (
              <div className="details-result">
                <span className="details-result--name">Background Skill:</span>
                <span className="details-result--data">{background}</span>
                <button
                  type="button"
                  className="button button--details-reroll"
                  onClick={getBackground}
                >
                  Reroll
                </button>
              </div>
            )}

            {!misfortune && (
              <button
                type="button"
                className="button button--optional-details"
                onClick={getMisfortune}
              >
                Misfortune
              </button>
            )}

            {misfortune && (
              <div className="details-result">
                <span className="details-result--name">Misfortune:</span>
                <span className="details-result--data">{misfortune}</span>

                <button
                  type="button"
                  className="button button--details-reroll"
                  onClick={getMisfortune}
                >
                  Reroll
                </button>
              </div>
            )}
          </div>
        </div>

        <button
          className="button button--character-sheet"
          onClick={() => {
            setCharacter({
              ...character,
              name: characterName,
              alignment: alignment,
              appearance: appearance,
              background: background,
              personality: personality,
              misfortune: misfortune,
              languages: languages,
              hasLanguages: hasLanguages
            });

            setPages({
              ...pages,
              detailsScreen: false,
              characterSheetScreen: true
            });
          }}
        >
          Go to Character Sheet
        </button>
      </div>
    </div>
  );
}
