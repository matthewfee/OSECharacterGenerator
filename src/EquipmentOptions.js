import React from 'react'

class EquipmentOptions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {


        return (

            <option value={this.props.name}
                price={this.props.price}
            >
                {this.props.name} - {this.props.price} gp
            </option>
        )
    }
}


export default EquipmentOptions