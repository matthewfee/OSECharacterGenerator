/* eslint-disable react/prop-types */
import React from "react";

class EquipmentBackpack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log("Main State", this.state);
    return (
      <li
        className="backpack-item backpack-item--gear"
        value={this.props.name}
        key={this.props.keyName}
      >
        {this.props.name}
        <button
          className="button button--equipment"
          value={this.props.name}
          onClick={() => this.props.sellSelectedEquipment(this.props.name)}
        >
          Sell
        </button>
      </li>
    );
  }
}

export default EquipmentBackpack;
