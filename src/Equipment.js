import React from 'react'
import equipmentData from './data/equipmentData.js'
import EquipmentOptions from './EquipmentOptions.js';
import EquipmentBackpack from './EquipmentBackpack.js';


class Equipment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gold: this.props.gold,
            equipment: [],
            equipmentSelected: "Backpack",
        }
    }

    getRndInteger = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    d = (how_many, sides) => {
        var total = 0;
        var i;
        for (i = 0; i < how_many; i++) {
            total += this.getRndInteger(1, sides);
        }
        return total;
    }

    equipmentList = () => equipmentData.map(
        item =>
            (<EquipmentOptions
                price={item.price}
                name={item.name}
                key={item.name}
            >
            </EquipmentOptions>)
    )


    equipmentBackpack = () => this.state.equipment.map((item, index) =>
        (<EquipmentBackpack name={item}
            sellSelectedEquipment={this.sellSelectedEquipment}
            key={index}
        >
        </EquipmentBackpack>)
    )


    updateSelectedEquipment = (event) => {

        this.setState({ equipmentSelected: event.target.value })

    }

    buySelectedEquipment = () => {

        var equipmentSelected = this.state.equipmentSelected;

        function findItem(object) {
            return object.name === equipmentSelected
        }

        var itemObject = equipmentData.find(findItem)

        if (itemObject.price > this.state.gold) {
            return console.log("Insufficient funds")
        }

        var newObject = {
            gold: this.state.gold - itemObject.price,
            equipment: this.state.equipment.concat(itemObject.name)
        }

        this.setState(newObject)

    }


    sellSelectedEquipment = (itemName) => {


        function findItem(object) {
            return object.name === itemName
        }

        var itemObject = equipmentData.find(findItem)

        console.log("item Object:", itemObject)

        var counter = 0

        const removeTheItem = (item) => {

            if (counter > 0) {
                return true
            }

            if (itemObject.name === item) {
                counter++
                return false
            }

            return true;
        }

        var newArray = this.state.equipment.filter(removeTheItem)

        var newObject = {
            gold: this.state.gold + itemObject.price,
            // equipment is same except for item is removed from array
            equipment: newArray
        }
        this.setState(newObject)

    }


    render() {

        return (

            <div className="equipment-screen container">
                <h2>Equipment</h2>

                <select value={this.state.equipmentSelected} onChange={this.updateSelectedEquipment} price={null}>

                    {this.equipmentList()}

                </select>

                <input type="submit" value="Buy" onClick={this.buySelectedEquipment} />


                <br></br>

                <div>Gold: {this.state.gold}</div>

                <div>Current Equipment: <br></br>
                    {this.equipmentBackpack()}
                </div>
                <button onClick={this.props.showAbilityScreen}>Go Back</button>
            </div>

        )
    }
}

export default Equipment