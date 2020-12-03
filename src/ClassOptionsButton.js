/* eslint-disable react/prop-types */
import React from "react";

class ClassOptionsButton extends React.Component {
  constructor(props) {
    super();
    this.state = {};
  }

  render() {
    //disabling class option if minimum required ability score is not met

    if (
      (this.props.constitution < 9 && this.props.classOption === "Dwarf") ||
      (this.props.intelligence < 9 && this.props.classOption === "Elf") ||
      (this.props.constitution < 9 && this.props.classOption === "Halfling") ||
      (this.props.dexterity < 9 && this.props.classOption === "Halfling")
    ) {
      return (
        <button
          className="button button-class-option"
          value={this.props.classOption}
          key={this.props.classOption}
          onClick={this.props.classFunction}
          disabled
        >
          {this.props.classOption}
        </button>
      );
    }

    return (
      <button
        className="button button-class-option"
        value={this.props.classOption}
        key={this.props.classOption}
        onClick={this.props.classFunction}
      >
        {this.props.classOption}
      </button>
    );
  }
}

export default ClassOptionsButton;
