import React from 'react'
import classOptionsData from './data/classOptionsData'
import ClassOptionsButton from './ClassOptionsButton.js';
import Equipment from './Equipment.js';
import ClassDescription from './ClassDescription.js';
import ClassScreen from './ClassScreen.js'


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
            characterClass: null,
            level: 1,
            primeReq: undefined,
            primeReq2: null,
            equipment: [],
            equipmentSelected: undefined,
            equipmentScreen: false,
            abilityScreen: true,
            classScreen: false,
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
            characterClass: null,
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

        //only counts lowest of the two prime reqs 

        if (abilityScore2 < abilityScore) {
            abilityScore = abilityScore2
        }


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
            return 
        }

        //maximum 18

        if (value === 18) {
            return 
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
            return 
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
        this.setState({ equipmentScreen: true, abilityScreen: false, classScreen: false })
    }

    showAbilityScreen = () => {
        this.setState({ equipmentScreen: false, abilityScreen: true, classScreen: false })
    }

    showClassScreen = () => {
        this.setState({ equipmentScreen: false, abilityScreen: false, classScreen: true})
    } 

    getClassInfo = () => {
        
        if (this.state.characterClass === null) {return "choose your class"}
        let obj = classOptionsData.find(obj => obj.name === this.state.characterClass)
        return (<ul className="class-description-list">
                    <li><b>Description:</b> {obj.description}</li>
                    <li><b>Hit Dice:</b> d{obj.hd}</li>
                    <li><b>Armour:</b> {obj.armour}</li>
                    <li><b>Weapons:</b> {obj.weapons}</li>
                    <li><b>Languages:</b> {obj.languages}</li>
                    <li><b>XP to level 2:</b> {obj.nextLevel}</li>
                    <li><b>Maximium Level:</b> {obj.maxLevel} </li>
                    <li><b>Saving Throws:</b> <span> Death {obj.savingThrows[0]}, Wands {obj.savingThrows[1]}, Paralysis {obj.savingThrows[2]}, Breath Attacks {obj.savingThrows[3]}, Spells/rods/staves {obj.savingThrows[4]}</span></li>
                </ul>

            )
    }


render() {

    return (

    <div className="wrapper">

        <header className="header">

        <h2 className="title">OSE Character Generator</h2>

        {this.state.abilityScreen &&<button className="button button--roll" onClick={this.reRoll}>Roll</button>}

        {this.state.equipmentScreen && <h4 className="header--equipment">Equipment</h4>}
        

        </header>

        

        <div className="character-menu container"> 

        {this.state.abilityScreen &&

        <div className="ability-screen container">
                      
            <div className="class-options-container container">

            {this.classOptionsListButton()}
            
            </div>

            <ClassDescription characterClass={this.state.characterClass}>


            </ClassDescription>

        
                    
            <div className="container ability-score-container"> 

            
            <div className="ability-score-name">
                
                <h2>STRENGTH</h2>
            
            </div>

            
            <div className="ability-score">{this.state.strength}

                {this.state.strength > 10 &&
                    <button className="button button--ability button--ability--decrease"onClick={() => { this.scoreDecrease("strength") }}>
                         <div className="arrow-down"></div>
                    
                    </button>}
                
                {this.state.pointBuy > 0 && (this.state.primeReq === "strength" || this.state.primeReq2 === "strength" || this.state.strength < this.state.strengthOriginal) && this.state.strength < 18 &&
                <button className="button button--ability button--ability--increase"onClick={() => { this.scoreIncrease("strength") }}>
                    
                        <div className="arrow-up"></div>    
                </button>}
                
            </div>
            <div className="ability-mod">
                <span>Melee Attacks: {this.getMod(this.state.strength)} </span>
                <span>Open Doors: {this.getMod(this.state.strength, "openDoors")}</span>
            </div>

            <div className="ability-score-name">
                
                <h2>INTELLIGENCE</h2>
                
            </div>     
            <div className="ability-score">{this.state.intelligence} 
                {this.state.intelligence > 10 &&
                <button className="button button--ability button--ability--decrease"onClick={() => { this.scoreDecrease("intelligence") }}>
                    
                    <div className="arrow-down"></div>     
                </button>}  
                {this.state.pointBuy > 0 && (this.state.primeReq === "intelligence" || this.state.primeReq2 === "intelligence" || this.state.intelligence < this.state.intelligenceOriginal) && this.state.intelligence < 18 && 
                <button className="button button--ability button--ability--increase"onClick={() => { this.scoreIncrease("intelligence") }}>
                    <div className="arrow-up"></div>        
                </button>}
                
            </div>
            <div className="ability-mod ability-mod2"> 
                <span>Languages: {this.getMod(this.state.intelligence, "spokenLanguages")}</span>
                <span>Literacy: {this.getMod(this.state.intelligence, "literacy")}</span>
            
            </div>
            

            
            <div className="ability-score-name">
                <h2>WISDOM</h2>  
            </div> 
            <div className="ability-score">{this.state.wisdom}
                {this.state.wisdom > 10 &&
                <button className="button button--ability button--ability--decrease"onClick={() => { this.scoreDecrease("wisdom") }}>
                    <div className="arrow-down"></div>        
                </button>}
                {this.state.pointBuy > 0 && (this.state.primeReq === "wisdom" || this.state.primeReq2 === "wisdom" || this.state.wisdom < this.state.wisdomOriginal) && this.state.wisdom < 18 &&
                <button className="button button--ability button--ability--increase"onClick={() => { this.scoreIncrease("wisdom") }}>
                    <div className="arrow-up"></div>    
                </button>}
            </div>
            <div className="ability-mod">
                <span>Magic Saves: {this.getMod(this.state.wisdom)}</span> 
            </div>

            
            <div className="ability-score-name">
                <h2>DEXTERITY</h2>

            </div>
            <div className="ability-score">{this.state.dexterity} 
                    
                {this.state.pointBuy > 0 && (this.state.primeReq === "dexterity" || this.state.primeReq2 === "dexterity") && this.state.dexterity < 18 &&
                <button className="button button--ability button--ability--increase"onClick={() => { this.scoreIncrease("dexterity") }}>
                    <div className="arrow-up"></div>    
                </button>}
            </div>
            <div className="ability-mod">
                <span> AC: {this.getMod(this.state.dexterity)}
                </span>
                <span> Missile: {this.getMod(this.state.dexterity)}
                </span>
                <span>
                    Initiative: {this.getMod(this.state.dexterity, "init")}
                </span>
            </div>



            <div className="ability-score-name">
                <h2>CONSTITUTION</h2>
            </div>
            <div className="ability-score"> {this.state.constitution}
                {this.state.pointBuy > 0 && (this.state.primeReq === "constitution" || this.state.primeReq2 === "constitution") && this.state.constitution < 18 &&
                <button className="button button--ability button--ability--increase"onClick={() => { this.scoreIncrease("constitution") }}>
                    <div className="arrow-up"></div>     
                </button>}    
            </div>
            <div className="ability-mod"> 
                <span>Hit Points: {this.getMod(this.state.constitution)}
                </span>
            </div>

            <div className="ability-score-name">
                <h2>CHARISMA</h2> 
            </div>
            <div className="ability-score"> {this.state.charisma} 
                {this.state.pointBuy > 0 && (this.state.primeReq === "charisma" || this.state.primeReq2 === "charisma") && this.state.charisma < 18 &&
                <button className="button button--ability button--ability--increase"onClick={() => { this.scoreIncrease("charisma") }}>
                    <div className="arrow-up"></div>     
                    
                </button>}
            </div>
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

            <div className="point-buy">Point Buy: {this.state.pointBuy}</div>

            {this.state.strength && <button onClick={this.resetCharacter}>Reset</button>}

            {this.state.strength && this.state.characterClass !== null && <div>
                <button onClick={this.showClassScreen}>Class Options</button> </div>}
            
            {this.state.strength && this.state.characterClass !== null && <div>
                <button onClick={this.showEquipmentScreen}>Purchase Equipment</button> </div>}

            </div>}

        {this.state.equipmentScreen &&
        <Equipment showAbilityScreen={this.showAbilityScreen} gold={this.state.goldStarting} />}

        {this.state.classScreen && 
        <ClassScreen showAbilityScreen={() => this.showAbilityScreen} characterClass={this.state.characterClass} conMod={parseInt(this.getMod(this.state.constitution))} d={this.d}>
        </ClassScreen>}
        
        </div>

       

    <br></br>
    
    <br></br>
    </div>
    )
}

}


export default NewCharacter