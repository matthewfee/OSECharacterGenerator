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

  characterButton = (name, index) => {
    if (name.length < 1) {
      return (
        <button className="character-button" key={index}>
          Unnamed
        </button>
      );
    }
    return (
      <button className="character-button" key={index}>
        {name}
      </button>
    );
  };

  render() {
    return (
      <div className="character-storage-screen">
        <details>
          <summary>Character storage</summary>
          <div>Characters Here</div>
          {this.state.myCharacters.map((item, index) =>
            this.characterButton(item.name, index)
          )}
        </details>
      </div>
    );
  }
}

export default CharacterStorageScreen;
