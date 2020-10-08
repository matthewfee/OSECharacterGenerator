import React from 'react'
import classOptionsData from './data/classOptionsData'
import ClassDescription from './ClassDescription.js'


class ClassScreen extends React.Component {
    constructor(props) {
        super() 
        this.state = {
            hitPoints: 0,
            canReroll: true, 
        }

    }

    getHitDie = () => {
        let obj = classOptionsData.find(obj => obj.name === this.props.characterClass);
        return this.setState({hitDie: obj.hd})
    }

    getHitPoints = () => {

        var HP = this.props.d(1, this.state.hitDie)
        var totalHP = HP + this.props.conMod
        this.setState(
            {hitPoints: totalHP,
            conModifier: this.props.conMod,
            HPResult: HP,
        
        })
    }

    reRoll = () => {
        this.getHitPoints()
        this.setState({canReroll: false})
        
    }

    componentDidMount() {
        this.getHitDie()
    }
    
    classAbilities = () => {
        let obj = classOptionsData.find(obj => obj.name === this.props.characterClass)
        return obj.abilities
    }

    classSavingThrows = () => {
        let obj = classOptionsData.find(obj => obj.name === this.props.characterClass)
        return obj.savingThrows
    }

    

    
    render()
    
        
    
            {

        var obj = classOptionsData.find(obj => obj.name === this.props.characterClass)    

        return (

        <div> 
            
            <h1>{this.props.characterClass}</h1>

            <div className="hp-container container">
                <div className="hp-container--hit-die">
                    {this.state.hitDie}
                    <div className="hp-container--hit-die-name">Hit Die</div>    
                </div>

                <div className="hp-container--+">+</div>

                <div className="hp-container--con-mod">Con Mod</div>

                <div className="hp-container--=">=</div>

                <div className="hp-container--hit-points">{this.state.hitPoints}
                <div className="hp-container--hit-points-name">Hit Points</div>
                
                </div>    
              
            </div>

            

            {!this.state.HPResult &&
            <button onClick={() => setTimeout(this.getHitPoints(), 100)}> Roll HP</button>}

            {this.state.HPResult < 3 && this.state.canReroll &&
            <button onClick={() => setTimeout(this.reRoll(), 100)}> ReRoll ?</button>}
            {this.state.HPResult &&
            <div>
            <h2>Hit Points: {this.state.hitPoints}</h2>
            <h4>({this.state.HPResult} and {this.props.conMod} CON modifier)</h4>
            </div>}
            
                
                
            
    
            

            
            <div className="saving-throws container"> 
                <div className="saving-throw">Death/Poison {obj.savingThrows[0]}</div>
                <div className="saving-throw">Wands {obj.savingThrows[1]}</div>
                <div className="saving-throw">Paralysis/Petrify {obj.savingThrows[2]}</div>
                <div className="saving-throw">Breath Attacks {obj.savingThrows[3]}</div>
                <div className="saving-throw">Spells/Rods/Staves {obj.savingThrows[4]}</div>
            </div> 

            <button onClick={this.props.showAbilityScreen()}>Go Back</button>

            <ClassDescription characterClass={this.props.characterClass}>
            </ClassDescription>   
            
        </div>


        )
     }
}

export default ClassScreen