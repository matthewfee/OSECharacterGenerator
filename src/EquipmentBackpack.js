import React from 'react'

class EquipmentBackpack extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }



    render() {

        return ( <
            li value = {
                this.props.name
            }
            key = {
                this.props.key
            } > {
                this.props.name
            } <
            button value = {
                this.props.name
            }
            onClick = {
                () => this.props.sellSelectedEquipment(this.props.name)
            } > Sell < /button> <
            /li>
        )
    }
}


export default EquipmentBackpack