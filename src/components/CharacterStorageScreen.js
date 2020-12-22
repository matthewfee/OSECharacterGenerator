/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";

export default function CharacterStorageScreen(props) {
  const [myCharacters, setMyCharacters] = useState(undefined);

  useEffect(() => {
    const characters = JSON.parse(window.localStorage.getItem("characters"));
    setMyCharacters(characters);
  }, []);

  const handleCharacter = e => {
    let obj = myCharacters[e.currentTarget.value];
    props.updateParentState(obj);
    props.showCharacterSheetScreen();
  };

  const characterButton = (char, index) => {
    let characterStorageName = char.characterName || char.name;

    if (characterStorageName === "") {
      return (
        <button
          className="character-button"
          key={index}
          value={index}
          onClick={handleCharacter}
        >
          Unnamed
        </button>
      );
    }
    return (
      <button
        className="character-button"
        key={index}
        onClick={handleCharacter}
        value={index}
      >
        <div className="character-button--name" value={index}>
          {characterStorageName}
        </div>
        <div className="character-button--level" value={index}>
          {char.characterClass}
        </div>
        {/* <div className="character-button--ability-scores">
          <div>STR {char.strength}</div>
          <div>INT {char.intelligence}</div>
          <div>WIS {char.wisdom}</div>
          <div>DEX {char.dexterity}</div>
          <div>CON {char.constitution}</div>
          <div>CHA {char.charisma}</div>
        </div> */}
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
        onClick={props.showAbilityScreen}
      >
        Back to Main
      </button>
    </div>
  );
}

// /* eslint-disable react/prop-types */
