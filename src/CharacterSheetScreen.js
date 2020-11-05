import React from 'react'
import jsPDF from 'jspdf'
import domtoimage from 'dom-to-image'
import classOptionsData from './data/classOptionsData'



class CharacterSheetScreen extends React.Component {
    constructor(props) {
        super() 
        this.state = {

        }
    }

    savePDF = () => {

        const input = document.getElementById('print-wrapper');
            const pdf = new jsPDF('1', 'mm', [158.75, 158.75]);
            if (pdf) {
              domtoimage.toPng(input)
                .then(imgData => {
                  pdf.addImage(imgData, 'PNG', 0, 0);
                  pdf.save('download.pdf');
                });
            }
        };

    render()    {

        
        let char = this.props.parentState
        let characterClass = classOptionsData.find(obj => obj.name === this.props.parentState.characterClass) 


        return (

            <div className="character-sheet-container">

            <h3 className="header-default">Character Sheet</h3>


            <div className="character-short">
                    <h3>Name: {char.name}</h3>
                    <h3>Level 1 {char.class}</h3>
                    <div>Armour Class: AC ({char.armour.join("+ ")})</div>
                    <div>Hit Points {char.hitPoints}</div>
                    <div>Weapons: {char.weapons.join("+ ")}</div>
                    <div>THAC0 10 [0]</div>
                    <div>Movement Rate: 60' (20')</div>
                    <div>Saves: D{characterClass.savingThrows[0]} 
                    W{characterClass.savingThrows[1]}
                    P{characterClass.savingThrows[2]}
                    B{characterClass.savingThrows[3]}
                    S{characterClass.savingThrows[4]}

                    </div>
                    <div>Alignment: {char.alignment}</div>
                    <div>STR {char.strength} 
                    INT {char.intelligence}
                    WIS {char.wisdom}
                    DEX {char.dexterity}
                    CON {char.constitution}
                    CHA {char.charisma}
                    </div>
                    <div>Equipment: {char.equipment.join(", ")}</div>


            </div>


            <div className="character-sheet">
                <div className="character--name">Name: {char.name}</div>
                <div className="character--class">Class: {char.characterClass}</div>
                <div className="character--level">Level: 1</div>
                <div className="xp">XP: 0</div>
                <div className="character--alignment">Alignment: {char.alignment} </div>

                <div className="hit-points">HP: {char.hitPoints}</div>
                <div className="hit-die">HD: d{characterClass.hd}</div>
                <div className="armor-class">AC: AC HERE</div>


                <div className="background">Background: {char.background}</div>
                <div className="appearance">Appearance: {char.appearance}</div>
                <div className="personality">Personality: {char.personality}</div>

                <div className="ability-scores">
                    <div className="strength">Strength: {char.strength}</div>
                    <div className="strength-mod">
                        <div>Melee {char.strengthModMelee}</div>
                        <div>Doors {char.strengthModDoors}</div>
                    </div>

                    <div className="intelligence">Intelligence: {char.intelligence}</div>
                    <div className="intelligence-mod">
                        <div>Languages {char.intelligenceModLanguages}</div>
                        <div>Literacy {char.intelligenceModLiteracy}</div>
                    
                    </div>

                    <div className="wisdom">Wisdom: {char.wisdom}</div>
                    <div className="wisdom-mod">Magic Saves {char.wisdomMod}</div>


                    <div className="dexterity">Dexterity: {char.dexterity}</div>
                    <div className="dexterity-mod">
                        <div>Missiles & AC {char.dexterityModMissiles}</div>
                        <div>Initiative {char.dexterityModInitiative}</div>
                    </div>

                    <div className="constitution">Constitution: {char.constitution}</div>
                    <div className="constitution-mod">Hit Points {char.constitutionMod}</div>

                    <div className="charisma">Charisma: {char.charisma}</div>
                    <div className="charisma-mod">
                        <div>Loyalty {char.charismaModLoyalty}</div>
                        <div>NPC Reaction {char.charismaModNPCReactions}</div>
                        <div>Max Retainers {char.charismaModRetainersMax}</div>
                    </div>

                <div className="character-sheet--saving-throws"> 
                    <div className="character-sheet--death">Death {characterClass.savingThrows[0]}</div>
            
                    <div className="character-sheet--wands">Wands {characterClass.savingThrows[1]}</div>
            
                    <div className="character-sheet--paralysis">Paralysis {characterClass.savingThrows[2]}</div>
                    
                    <div className="character-sheet--breath">Breath {characterClass.savingThrows[3]}</div>
                
                    <div className="character-sheet--spells">Spells {characterClass.savingThrows[4]} </div>
                
                </div> 

                
                <div className="character-sheet--class-ability-list">
                    {characterClass.abilities.map((item) => {
                            return (
                                <div className="character-sheet--class-ability"> {item} </div>
                            )
                    })}
                </div>

               <div className="character-sheet--equipment">
                    

                    <div className="armour">
                        {char.armour.map((item) => {
                            return <div> {item} </div>
                        })}

                    </div>


                    <div className="weapons">
                        {char.weapons.map((item) => {
                            return <div> {item} </div>
                        })}

                    </div>

                    <div className="gear">
                        {char.equipment.map((item) => {
                            return <div> {item} </div>
                        })}

                    </div>

                    



               </div>

            </div>






            </div>

            </div>

            

        )
    }

}

export default CharacterSheetScreen
