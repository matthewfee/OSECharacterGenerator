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
    console.log(e.target.value);
    console.log(this.state.myCharacters[e.target.value]);
    let obj = this.state.myCharacters[e.target.value];
    this.props.updateParentState(obj);
    this.props.showCharacterSheetScreen();
  };

  characterButton = (name, index) => {
    if (name.length < 1) {
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
        {name}
      </button>
    );
  };

  render() {
    return (
      <div className="character-storage-screen">
        <h3 className="header-default"> Tavern </h3>

        <div className="character-storage">
          {this.state.myCharacters
            ? this.state.myCharacters.map((item, index) =>
                this.characterButton(item.name, index)
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
