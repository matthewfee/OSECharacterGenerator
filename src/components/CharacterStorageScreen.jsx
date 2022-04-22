import React, { useState, useEffect } from "react";
import { CHARACTER_STORAGE } from "../constants/constants";

export default function CharacterStorageScreen(props) {
  const {
    pages,
    setPages,
    character,
    setCharacter,
    characterStatistics,
    setCharacterStatistics,
    characterClass,
    setCharacterClass,
    characterEquipment,
    setCharacterEquipment,
    characterModifiers,
    setCharacterModifiers,
    abilityScores,
    setAbilityScores,
    setCharacterRolled
  } = props;

  const [myCharacters, setMyCharacters] = useState([]);

  useEffect(() => {
    const characters = JSON.parse(
      window.localStorage.getItem(CHARACTER_STORAGE)
    );
    setMyCharacters(characters);
  }, []);

  const handleCharacter = (e, index, action) => {
    e.stopPropagation();
    switch (action) {
      case "setActiveCharacter":
        let characterObject = myCharacters[index];
        setCharacter(characterObject.character);
        setCharacterStatistics(characterObject.characterStatistics);
        setCharacterClass(characterObject.characterClass);
        setCharacterEquipment(characterObject.characterEquipment);
        setCharacterModifiers(characterObject.characterModifiers);
        setAbilityScores(characterObject.abilityScores);
        setCharacterRolled(true);

        setPages({
          ...pages,
          characterSheetScreen: true,
          characterStorageScreen: false
        });

      case "deleteCharacter":
        let newStorage = [...myCharacters];
        newStorage.splice(index, 1);
        localStorage.setItem(CHARACTER_STORAGE, JSON.stringify(newStorage));
        setMyCharacters(newStorage);

      default:
        return;
    }
  };

  const characterButton = (char, index) => {
    let characterStorageName = char.character.name;

    return (
      <button
        className="character-button"
        key={index}
        onClick={e => handleCharacter(e, index, "setActiveCharacter")}
        value={index}
        name="setActiveCharacter"
      >
        <div className="character-button--name" value={index}>
          {characterStorageName}
        </div>
        <div className="character-button--level" value={index}>
          {char.characterClass.name}
        </div>

        <div
          onClick={e => handleCharacter(e, index, "deleteCharacter")}
          className="character-button--delete"
          key={index}
          value={index}
          name="deleteCharacter"
        >
          x
        </div>
      </button>
    );
  };

  return (
    <div className="character-storage-screen">
      <h3 className="header-default"> Tavern </h3>

      <div className="character-storage">
        {myCharacters
          ? myCharacters.map((item, index) => characterButton(item, index))
          : ""}
      </div>

      <button
        className="button--new-character"
        onClick={() => {
          setPages({
            ...pages,
            abilityScreen: true,
            characterStorageScreen: false
          });
          setCharacterRolled(false);
        }}
      >
        Back to Main
      </button>
    </div>
  );
}
