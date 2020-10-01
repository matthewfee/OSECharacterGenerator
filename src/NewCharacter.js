import React, { useLayoutEffect } from 'react'
import classOptionsData from './data/classOptionsData'
import ClassOptionsButton from './ClassOptionsButton.js';
import Equipment from './Equipment.js';


class NewCharacter extends React.Component {

    constructor() {
        super();
        this.state = {

            strength: null,
            intelligence: null,
            wisdom: null,
            dexterity: null,
            constitution: null,
            charisma: null,

            strengthOriginal: null,
            intelligenceOriginal: null,
            wisdomOriginal: null,
            dexterityOriginal: null,
            constitutionOriginal: null,
            charismaOriginal: null,

            pointBuy: 0,
            characterClass: undefined,
            level: 1,
            primeReq: undefined,
            primeReq2: null,
            equipment: [],
            equipmentSelected: undefined,
            equipmentScreen: false,
            abilityScreen: true,
            goldStarting: undefined,
            randomNumbers: [],
 

        }

    }

    componentDidMount() {

   
        var RandomOrg = require('random-org');
        var random = new RandomOrg({ apiKey: "13182fb2-ebca-46d3-94e9-13e1f93fc79d" });
        random.generateIntegers({min: 1, max:6, n: 40})
            .then((result) => {
                this.setState({randomNumbers: result.random.data})
            });

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

   choose = (array) => {
        return array[Math.floor(Math.random() * array.length)]
      }


    d6 = (how_many) => {

        //uses default random number if API doesn't load 

        if (this.state.randomNumbers.length < 2) {
            return this.d(3, 6)
        }

        var sum = 0

        for (let i = 0; i < how_many; i++) {
            sum = sum + this.choose(this.state.randomNumbers)
        }

        return sum
    }

    reRoll = () => {

        var newObject = {

            strength: this.d6(3),
            intelligence: this.d6(3),
            wisdom: this.d6(3),
            dexterity: this.d6(3),
            constitution: this.d6(3),
            charisma: this.d6(3),
            goldStarting: this.d6(3) * 10,
            pointBuy: 0,
            characterClass: "unselected",
            primeReq: undefined,
            primeReq2: undefined,

        }

        newObject.strengthOriginal = newObject.strength;
        newObject.intelligenceOriginal = newObject.intelligence;
        newObject.wisdomOriginal = newObject.wisdom;
        newObject.dexterityOriginal = newObject.dexterity;
        newObject.constitutionOriginal = newObject.constitution;
        newObject.charismaOriginal = newObject.charisma

        this.setState(newObject)
    };

    //function returns the details of an ability mod for a given ability score and ability

    getMod = (abilityScore, secondary) => {
        

        const abilityMod = ['-3', '-2', '-2', '-1', '-1',
        '-1', '0', '0', '0', '0', '+1', '+1', '+1',
        '+2', '+2', '+3'];

        const openDoors = [null, null, null, "1-in-6", "1-in-6", "1-in-6", "1-in-6", "1-in-6", "1-in-6", "2-in-6", "2-in-6", "2-in-6", "2-in-6", "3-in-6",  "3-in-6",  "3-in-6",  "4-in-6", "4-in-6", 
        ]
        const spokenLanguages = [null, null, null, "Broken speech", "Native", "Native", "Native", "Native", "Native", "Native", "Native", "Native", "Native", "Native +1", "Native +1", "Native +1 ","Native +2", "Native +2", "Native +3"]

        const literacy = [null, null, null, "Illiterate", "Illiterate", "Illiterate", "Basic", "Basic", "Basic", "Literate", "Literate", "Literate", "Literate", "Literate", "Literate", "Literate", "Literate", "Literate", "Literate" ]

        const initiative = [null, null, null, "-2", "-1", "-1", "-1", "-1", "-1", "0", "0", "0", "0", "+1", "+1", "+1", "+1", "+1", "+2"]

        const npcReactions = [null, null, null, "-2", "-1", "-1", "-1", "-1", "-1", "0", "0", "0", "0", "+1", "+1", "+1", "+1", "+1", "+2"]

        const retainersMax = [null, null, null, "1", "2", "2", "3", "3", "3", "4", "4", "4", "4", "5", "5", "5", "6", "6", "7"]

        const loyalty = [null, null, null, "4", "5", "5", "6", "6", "6", "7", "7", "7", "7", "8", "8", "8", "9", "9", "10"]


        var mod = abilityMod[abilityScore - 3]

        if (abilityScore === null) {
            return ' '
        }

        if (secondary === "openDoors") {
            return openDoors[abilityScore]
        }

        if (secondary === "spokenLanguages") {
            return spokenLanguages[abilityScore]} 
        if (secondary === "literacy") {
            return literacy[abilityScore]
        }

        if (secondary === "init") {
            return initiative[abilityScore]
        }

        if (secondary === "constitution") {
            return `Hit Points: ${mod}`
        }

        if (secondary === "reactions") {
            return npcReactions[abilityScore] 
        }

        if (secondary === "retainers") {
            return retainersMax[abilityScore]
        }

        if (secondary === "loyalty") {
            return loyalty[abilityScore]
        }

        return mod
    }

    getPrimeReqMod = () => {

        const modArr = [null, null, null, "-20%", "-20%", "-20%", "-10%", "-10%", "-10%", "0", "0", "0", "0", "+5%", "+5%", "+5%", "+10%", "+10%", "+10%"]



        var abilityScore = this.state[this.state.primeReq]
        var abilityScore2 = this.state[this.state.primeReq2]

       

        if (abilityScore2 < abilityScore) {
            console.log("second prime req detected")
            abilityScore = abilityScore2
        }

        console.log(abilityScore, this.state.primeReq, this.state.primeReq2)

        return modArr[abilityScore]


    }

    resetCharacter = () => {
        var newObject = {};
        newObject.strength = this.state.strengthOriginal;
        newObject.intelligence = this.state.intelligenceOriginal;
        newObject.wisdom = this.state.wisdomOriginal;
        newObject.dexterity = this.state.dexterityOriginal;
        newObject.constitution = this.state.constitutionOriginal;
        newObject.charisma = this.state.charismaOriginal;
        newObject.pointBuy = 0;

        this.setState(newObject)
    }

    scoreIncrease = (key) => {

        const keyOriginal = key + "Original"

        var value = this.state[key]

        var newPointBuy = this.state.pointBuy - 1

        var increment = 1; 

        //check if score has already been decreased

        if (value < this.state[keyOriginal]) {
            increment = 2;
        }

        //checks if there's points to buy

        if (this.state.pointBuy < 1) {
            return console.log("insufficient points")
        }

        //maximum 18

        if (value === 18) {
            return console.log("max score is 18")
        }




        var newObject = {
            [key]: value + increment,
            pointBuy: newPointBuy 
        }

        this.setState(newObject)

    }

    scoreDecrease = (key) => {

        const keyOriginal = key + "Original"
        var value = this.state[key]
        var decrement = -2

        if (value > this.state[keyOriginal]) {
            decrement = -1;
        }


        var newPointBuy = this.state.pointBuy + 1

        if (this.state[key] <= 10) {
            return console.log("Cannot bring ability scores below 9")
        }

        var newObject = {
            [key]: value + decrement,
            pointBuy: newPointBuy
        }

        this.setState(newObject)

    }

    changeCharacterClass = (event) => {

        this.resetCharacter()

        this.setState({ primeReq2: null, characterClass: event.target.value })

        if (event.target.value === "Magic-User") {
            return this.setState({ primeReq: "intelligence" })
        };

        if (event.target.value === "Cleric") {
            return this.setState({ primeReq: "wisdom" })
        };
        if (event.target.value === "Fighter") {
            return this.setState({ primeReq: "strength" })
        };
        if (event.target.value === "Dwarf") {
            return this.setState({ primeReq: "strength" })
        };
        if (event.target.value === "Thief") {
            return this.setState({ primeReq: "dexterity" })
        };
        if (event.target.value === "Halfling") {
            return this.setState({ primeReq: "dexterity", primeReq2: "strength" })
        };
        if (event.target.value === "Elf") {
            return this.setState({ primeReq: "intelligence", primeReq2: "strength" })
        };

        this.state.getPrimeReqMod();



    }


    classOptionsListButton = () => classOptionsData.map(
        item =>
            (<ClassOptionsButton
                classOption={item.name}
                requirements={item.requirements}
                primeReq={item.primeReq}
                strength={this.state.strengthOriginal}
                intelligence={this.state.intelligenceOriginal}
                wisdom={this.state.wisdomOriginal}
                dexterity={this.state.dexterityOriginal}
                constitution={this.state.constitutionOriginal}
                charisma={this.state.charismaOriginal}
                key={item.name}
                classFunction={this.changeCharacterClass}
            >
            </ClassOptionsButton>)
    )

    showEquipmentScreen = () => {
        this.setState({ equipmentScreen: true, abilityScreen: false })
    }

    showAbilityScreen = () => {
        this.setState({ equipmentScreen: false, abilityScreen: true })
    }


render() {

    return (

    <div className="wrapper">

        <h2>Character Generator</h2>

        <h3> 
                <button onClick={this.reRoll}>Roll</button>
        </h3>

        {this.state.abilityScreen && 

        <div className="character-menu container">  
                      
        <div className="class-options-container container" dir="rtl">

            {this.classOptionsListButton()}
            
        </div>


        {/* <div className="class-info-box">Prime Requisites: {this.state.primeReq} {<span>,</span> && this.state.primeReq2} </div>

        <div className="point-buy-box">Point Buy: {this.state.pointBuy}</div> */}
        <div className="class-info"> 
    
            <div className="class-info__prime-reqs">Prime Reqs: {this.state.primeReq} {this.state.primeReq2 && <span>& {this.state.primeReq2}</span>} </div>
            <div className="class-info__prime-reqs-mod">XP Mod: {this.getPrimeReqMod()} </div>

        </div>
                    
        <div className="container ability-score-container"> 

            <div className="button-container">{this.state.strength > 10 &&
                <button className="button button--ability"onClick={() => { this.scoreDecrease("strength") }}>-</button>}</div>
            <div className="button-container">
                {this.state.pointBuy > 0 && (this.state.primeReq === "strength" || this.state.primeReq2 === "strength" || this.state.strength < this.state.strengthOriginal) &&
                <button className="button button--ability"onClick={() => { this.scoreIncrease("strength") }}>+</button>}
            </div>
            <div className="ability-score-name">STRENGTH</div>
            <div className="ability-score">{this.state.strength}
                
            </div>
            <div className="ability-mod">
                <span>Melee Attacks: {this.getMod(this.state.strength)} </span>
                <span>Open Doors: {this.getMod(this.state.strength, "openDoors")}</span>
            </div>


            
            <div className="button-container">
                {this.state.intelligence > 10 &&
                <button className="button button--ability"onClick={() => { this.scoreDecrease("intelligence") }}>-</button>}  
            </div>
            <div className="button-container">
                {this.state.pointBuy > 0 && (this.state.primeReq === "intelligence" || this.state.primeReq2 === "intelligence" || this.state.intelligence < this.state.intelligenceOriginal) &&
                <button className="button button--ability"onClick={() => { this.scoreIncrease("intelligence") }}>+</button>}
            </div>
            <div className="ability-score-name">INTELLIGENCE</div>     
            <div className="ability-score">{this.state.intelligence}  
            </div>
            <div className="ability-mod ability-mod2"> 
                <span>Languages: {this.getMod(this.state.intelligence, "spokenLanguages")}</span>
                <span>Literacy: {this.getMod(this.state.intelligence, "literacy")}</span>
            
            </div>
            

            <div className="button-container">
                {this.state.wisdom > 10 &&
                <button className="button button--ability"onClick={() => { this.scoreDecrease("wisdom") }}>-</button>}
            </div>
            <div className="button-container">
                {this.state.pointBuy > 0 && (this.state.primeReq === "wisdom" || this.state.primeReq2 === "wisdom" || this.state.wisdom < this.state.wisdomOriginal) &&
                <button className="button button--ability"onClick={() => { this.scoreIncrease("wisdom") }}>+</button>}
            </div>
            <div className="ability-score-name">WISDOM</div> 
            <div className="ability-score">{this.state.wisdom}</div>
            <div className="ability-mod">
                <span>Magic Saves: {this.getMod(this.state.wisdom)}</span> 
                </div>

            

            <div className="button-container"></div>
            <div className="button-container">
                {this.state.pointBuy > 0 && (this.state.primeReq === "dexterity" || this.state.primeReq2 === "dexterity") &&
                <button className="button button--ability"onClick={() => { this.scoreIncrease("dexterity") }}>+</button>}
            </div>
            <div className="ability-score-name">DEXTERITY</div>
            <div className="ability-score">{this.state.dexterity} </div>
            <div className="ability-mod">
                <span> AC: {this.getMod(this.state.dexterity)}
                </span>
                <span> Missile: {this.getMod(this.state.dexterity)}
                </span>
                <span>
                    Initiative: {this.getMod(this.state.dexterity, "init")}
                </span>
            </div>

            <div className="button-container"></div>
            <div className="button-container">
                {this.state.pointBuy > 0 && (this.state.primeReq === "constitution" || this.state.primeReq2 === "constitution") &&
                <button className="button button--ability"onClick={() => { this.scoreIncrease("constitution") }}>+</button>}
            </div>
            <div className="ability-score-name">CONSTITUTION</div>
            <div className="ability-score"> {this.state.constitution}</div>
            <div className="ability-mod"> 
                <span>Hit Points: {this.getMod(this.state.constitution)}
                </span>
            </div>

            

            <div className="button-container"></div>
            <div className="button-container">
              {this.state.pointBuy > 0 && (this.state.primeReq === "charisma" || this.state.primeReq2 === "charisma") &&
                <button className="button button--ability"onClick={() => { this.scoreIncrease("charisma") }}>+</button>}
            </div>
            <div className="ability-score-name">CHARISMA</div>
            <div className="ability-score"> {this.state.charisma} </div>
            <div className="ability-mod">
                <span> NPC Reactions: {this.getMod(this.state.charisma, "reactions")}
                </span>
                <span>
                    Retainers Max #: {this.getMod(this.state.charisma, "retainers")}
                </span>
                <span>
                    Loyalty: {this.getMod(this.state.charisma, "loyalty")}
                </span>
            </div>
            


            </div>


            {this.state.strength && <button onClick={this.resetCharacter}>Reset</button>}

            {this.state.strength && <div>
                <button onClick={this.showEquipmentScreen}>Purchase Equipment</button> </div>}

            </div>}
            
        {this.state.equipmentScreen &&
        <Equipment showAbilityScreen={this.showAbilityScreen} gold={this.state.goldStarting} />}

    
        
    <br></br>
    all scores generated from random.org
    <br></br>
    </div>
    )
}

}


export default NewCharacter