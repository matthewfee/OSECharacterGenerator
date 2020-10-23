import React from 'react'

class EquipmentBackpack extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }



    render() {

        console.log("Main State", this.state)
        return ( 
            <li value = {this.props.name}
            key = {this.props.keyName}> 
            {this.props.name} 
            <button
            className="button button--equipment" 
            value = {this.props.name}
            onClick = {() => this.props.sellSelectedEquipment(this.props.name)}> 
            X 
            </button> 
            </li>
        )
    }
}


export default EquipmentBackpack