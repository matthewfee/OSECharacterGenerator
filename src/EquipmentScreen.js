import React from 'react'
import equipmentData from './data/equipmentData.js'
import weaponsData from './data/weaponsData.js';
import armourData from './data/armourData.js';
import classOptionsData from './data/classOptionsData'
import EquipmentOptions from './EquipmentOptions.js';
import EquipmentBackpack from './EquipmentBackpack.js';


class EquipmentScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gold: null,
            equipment: [],
            equipmentSelected: "Backpack",
            armour: [],
            armourSelected: "none",
            weapons: [],
            weaponSelected: "Sword",
        }
    }

    getRndInteger = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    getGold = () => {
        this.setState({gold: this.props.gold})
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

    weaponsOptions = (item) =>  {
        return (
            <option value={item.name}
                price={item.price}
            >
                {item.name} - {item.price} gp
            </option>
        )
    }

    weaponsList = () => weaponsData.map(
        item => this.weaponsOptions(item)
    )


    equipmentBackpack = () => this.state.equipment.map((item, index) =>
        (<EquipmentBackpack name={item}
            sellSelectedEquipment={this.sellSelectedEquipment}
            keyName={index}
        >
        </EquipmentBackpack>)
    )

    weaponsBackpack = () =>  this.state.weapons.map((item, index) => {

        return ( 
            <li value = {item}
            key = {index}> 
            {item} 
            <button
            className="button button--weapon" 
            value = {item}
            onClick = {() => this.sellSelectedWeapon(item)}> 
            X 
            </button> 
        </li>
        )
    }) 

    armourBackpack = () =>  this.state.armour.map((item, index) => {

        return ( 
            <li value = {item}
            key = {index}> 
            {item} 
            <button
            className="button button--weapon" 
            value = {item}
            onClick = {() => this.sellSelectedArmour(item)}> 
            X 
            </button> 
        </li>
        )
    }) 



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

        //updates state with new equipment item

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

    updateSelectedWeapon = (event) => {

        this.setState({ weaponSelected: event.target.value })

    }


    buySelectedWeapon = () => {

        var equipmentSelected = this.state.weaponSelected;

        function findItem(object) {
            return object.name === equipmentSelected
        }

        var itemObject = weaponsData.find(findItem)

        if (itemObject.price > this.state.gold) {
            return console.log("Insufficient funds")
        }

        //updates state with new equipment item

        var newObject = {
            gold: this.state.gold - itemObject.price,
            weapons: this.state.weapons.concat(itemObject.name)
        }

        this.setState(newObject)

    }


    sellSelectedWeapon = (itemName) => {


        function findItem(object) {
            return object.name === itemName
        }

        var itemObject = weaponsData.find(findItem)

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

        var newArray = this.state.weapons.filter(removeTheItem)

        var newObject = {
            gold: this.state.gold + itemObject.price,
            // equipment is same except for item is removed from array
            weapons: newArray
        }
        this.setState(newObject)

    };

    handleOptionChange = event => {
        this.setState({
          armourSelected: event.target.value
        });
      };

    buySelectedArmour = () => {

        
        var equipmentSelected = this.state.armourSelected;

        if (equipmentSelected === "none") {return};
        console.log(equipmentSelected)

        function findItem(object) {
            return object.name === equipmentSelected
        }

        var itemObject = armourData.find(findItem)

        if (itemObject.price > this.state.gold) {
            return console.log("Insufficient funds")
        }

        //updates state with new equipment item

        var newObject = {
            gold: this.state.gold - itemObject.price,
            armour: this.state.armour.concat(itemObject.name)
        }

        this.setState(newObject)

    }


    sellSelectedArmour = (itemName) => {

        function findItem(object) {
            return object.name === itemName
        }

        var itemObject = armourData.find(findItem)

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

        var newArray = this.state.armour.filter(removeTheItem)

        var newObject = {
            gold: this.state.gold + itemObject.price,
            // equipment is same except for item is removed from array
            armour: newArray
        }
        this.setState(newObject)

    };



    


    render() {

    var characterClass = classOptionsData.find(obj => obj.name === this.props.characterClass) 
        
    console.log("Equipment State", this.state)

return (

    <div className="equipment-screen">

        

    {this.state.gold === null &&
    <button className="button button-primary button--gold" 
    onClick={() => setTimeout(this.getGold(), 200)}> 
    Roll Gold
    </button>}

    <h5 className="gold">{this.state.gold} gp</h5>

    <h3 className="equipment-screen--header header-default">Equipment</h3>

    <div className="armour-restrictions">Armour Restrictions: {characterClass.armour}</div>

    <div className="armour-container--header">Select Armour</div>
    
    <div className="armour-container">


        <label className="armour-radio">
        <input
            type="radio"
            value="none"
            checked={this.state.armourSelected === "none"}
            className="form-check-input"
            onChange={this.handleOptionChange}
        />
            <span class="radio--label">None</span>
            
        </label>


    
        <label className="armour-radio">
        <input
        type="radio"
        value="Leather"
        className="form-check-input"
        checked={this.state.armourSelected === "Leather"}
        onChange={this.handleOptionChange}
        />  
        
        <span class="radio--label">Leather (AC 12) - 20gp</span>
        </label>
    

    
        <label className="armour-radio">
        <input
        type="radio"
        value="Chainmail"
        className="form-check-input"
        checked={this.state.armourSelected === "Chainmail"}
        onChange={this.handleOptionChange}
        />
        <span class="radio--label">Chainmail (AC 14) - 40gp</span>
        </label>
    

    
        <label className="armour-radio">
        <input
        type="radio"
        value="Plate mail"
        className="form-check-input"
        checked={this.state.armourSelected === "Plate mail"}
        onChange={this.handleOptionChange}
        />
        <span class="radio--label">Plate mail (AC 16) - 60gp</span>
        </label>
    

    
        <label className="armour-radio">
        <input
        type="radio"
        value="Shield"
        className="form-check-input"
        checked={this.state.armourSelected === "Shield"}
        onChange={this.handleOptionChange}
        />
        Shield (AC +1 bonus) - 10gp
        </label>
            
    <input 
    type="submit" 
    value="Buy" 
    onClick={this.buySelectedArmour} 
    price = {null}
    />
        
        </div>

        <select value={this.state.equipmentSelected} onChange={this.updateSelectedEquipment} price={null}>

            {this.equipmentList()}

        </select>

        <input type="submit" value="Buy" onClick={this.buySelectedEquipment} />

        <br></br>

        <select value={this.state.weaponSelected} onChange={this.updateSelectedWeapon}>

            {this.weaponsList()}

        </select>

        <input type="submit" value="Buy" onClick={this.buySelectedWeapon} price = {null}/>

        <br></br>



        <div>Adventuring Gear: <br></br>
            {this.equipmentBackpack()}
        </div>

        <div className="weapons-backpack">Weapons: <br></br>
            {this.weaponsBackpack()}
        </div>

        <div className="armour-backpack">Armour: <br></br>
            {this.armourBackpack()}
        </div>

        <button onClick={this.props.showAbilityScreen}>Go Back</button>
    </div>

)
}
}

export default EquipmentScreen