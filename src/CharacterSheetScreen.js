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

            <div className="character-sheet-container container">
            <h3 className="character--name">{char.name}</h3>
            <h4 className="character--subheader"> Level 1 {char.characterClass}</h4>

            <div className="character-sheet">

            <div className="character-top-container">
            <div className="hit-points character-container"><span className="charsheet-value-name">Hit Points</span> <span className="charsheet-value">{char.hitPoints}</span></div>
            <div className="armor-class character-container"><span className="charsheet-value-name">AC</span> <span className="charsheet-value">12</span></div>
            <div className="character--alignment character-container"><span className="charsheet-value-name">Alignment</span> <span className="charsheet-value">{char.alignment}</span> </div>
        
            <div className="background character-container"><span className="charsheet-value-name">Background</span> <span className="charsheet-value">{char.background}</span></div>
            <div className="appearance character-container"><span className="charsheet-value-name">Appearance</span> <span className="charsheet-value">{char.appearance}</span></div>
            <div className="personality character-container"><span className="charsheet-value-name">Personality</span> <span className="charsheet-value">{char.personality}</span></div>
            </div>

            

            <div className="ability-scores-container">
                <div className="strength character-container">
                    <span className="charsheet-value-name"> Strength </span> 
                    <span className="charsheet-value">  {char.strength} 
                        {char.strengthModMelee !== "0" && <span> ({char.strengthModMelee})</span>} 
                        </span> 
                    </div>

                <div className="intelligence character-container">
                    <span className="charsheet-value-name">  Intelligence </span> 
                    <span className="charsheet-value"> {char.intelligence} </span> 
                
                </div>
                

                <div className="wisdom character-container">
                    <span className="charsheet-value-name">  Wisdom </span> 
                        <span className="charsheet-value"> {char.wisdom} 
                        {char.wisdomMod !== "0" && <span> ({char.wisdomMod})</span>} 
                    </span>
                </div>
                     
                <div className="dexterity character-container"> 
                    <span className="charsheet-value-name">  Dexterity </span> 
                        <span className="charsheet-value"> {char.dexterity}
                        {char.dexterityModMissiles !== "0" && <span> {char.dexterityModMissiles})</span>} 
                    </span>
                </div>

                <div className="constitution character-container"> 
                    <span className="charsheet-value-name">  Constitution </span> 
                        <span className="charsheet-value"> {char.constitution}
                        {char.constitutionMod !== "0" && <span> ({char.constitutionMod})</span>} 
                    </span>
                </div>

                <div className="charisma character-container"> 
                    <span className="charsheet-value-name">  Charisma </span> 
                        <span className="charsheet-value"> {char.charisma}
                {char.charismaModNPCReactions !== "0" && <span> {" "}({char.charismaModNPCReactions})</span>} 
                    </span>
                </div>
        
            <div className="saving-throws-container"> 
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

        


            <div className="character-short">
                    <div>Name: {char.name}</div>
                    <div>Class: Level 1 {char.characterClass}</div>
                    <div>Alignment: {char.alignment}</div>
                    <div>Armour Class: AC ({char.armour.join(", ")})</div>
                    <div>Hit Points: {char.hitPoints}/{char.hitPoints}</div>
                    <div>Hit Die: d{characterClass.hd}</div>
                    <div>Weapons: {char.weapons.join(", ")}</div>
                    <div> 
                    Saves: D{characterClass.savingThrows[0]} W{characterClass.savingThrows[1]} P{characterClass.savingThrows[2]} B{characterClass.savingThrows[3]} S{characterClass.savingThrows[4]}
                    </div>
                    <div>STR {char.strength} INT {char.intelligence} WIS {char.wisdom} DEX {char.dexterity} CON {char.constitution} CHA {char.charisma}
                    </div>
                    <div>Equipment: {char.equipment.join(", ")}</div>
            </div>



            </div>

            </div>

            

        )
    }

}

export default CharacterSheetScreen
