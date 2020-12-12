/* eslint-disable react/prop-types */
import React from "react";

class CharacterStorageScreen extends React.Component {
  constructor(props) {
    super();
    this.state = {
      myCharacters: []
    };
  }

  componentDidMount() {
    const characters = JSON.parse(window.localStorage.getItem("characters"));
    this.setState({ myCharacters: characters });
  }

  handleCharacter = e => {
    console.log(e.currentTarget.value);
    console.log(this.state.myCharacters[e.currentTarget.value]);
    let obj = this.state.myCharacters[e.currentTarget.value];
    this.props.updateParentState(obj);
    this.props.showCharacterSheetScreen();
  };

  characterButton = (char, index) => {
    if (char.name.length < 1) {
      return (
        <button
          className="character-button"
          key={index}
          value={index}
          onClick={this.handleCharacter}
        >
          Unnamed
        </button>
      );
    }
    return (
      <button
        className="character-button"
        key={index}
        onClick={this.handleCharacter}
        value={index}
      >
        <div className="character-button--name" value={index}>
          {char.name}
        </div>
        <div className="character-button--level" value={index}>
          {char.characterClass}
        </div>
        <div className="character-button--ability-scores">
          <div>STR {char.strength}</div>
          <div>INT {char.intelligence}</div>
          <div>WIS {char.wisdom}</div>
          <div>DEX {char.dexterity}</div>
          <div>CON {char.constitution}</div>
          <div>CHA {char.charisma}</div>
        </div>
      </button>
      // <button
      //   className="character-button"
      //   key={index}
      //   onClick={this.handleCharacter}
      //   value={index}
      // >
      //   {char.name} <br></br>
      //   {char.characterClass} <br></br>

      // </button>
    );
  };

  render() {
    return (
      <div className="character-storage-screen">
        <h3 className="header-default"> Tavern </h3>

        <div className="character-storage">
          {this.state.myCharacters
            ? this.state.myCharacters.map((item, index) =>
                this.characterButton(item, index)
              )
            : ""}
        </div>

        <button
          className="button--new-character"
          onClick={this.props.showAbilityScreen}
        >
          Back to Main
        </button>
      </div>
    );
  }
}

export default CharacterStorageScreen;
