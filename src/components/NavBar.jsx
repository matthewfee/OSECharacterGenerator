import React from "react";

export default function NavigationOptions(props) {
  const { rollCharacter, pages, setPages, characterClass } = props;
  return (
    <div>
      <button className="button button--reroll" onClick={rollCharacter}>
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
  );
}
