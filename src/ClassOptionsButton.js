/* eslint-disable react/prop-types */
import React from "react";

class ClassOptionsButton extends React.Component {
  constructor(props) {
    super();
    this.state = {};
  }

  render() {
    //disabling class option if minimum required ability score is not met

    if (this.props.requirements) {
      if (
        (this.props.requirements.includes("STR") && this.props.strength < 9) ||
        (this.props.requirements.includes("INT") &&
          this.props.intelligence < 9) ||
        (this.props.requirements.includes("WIS") && this.props.wisdom < 9) ||
        (this.props.requirements.includes("DEX") && this.props.dexterity < 9) ||
        (this.props.requirements.includes("CON") &&
          this.props.constitution < 9) ||
        (this.props.requirements.includes("CHA") && this.props.charisma < 9)
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
