import React from 'react'
import classOptionsData from './data/classOptionsData'
import ClassDescription from './ClassDescription.js'


class ClassScreen extends React.Component {
    constructor(props) {
        super() 
        this.state = {
            hitPoints: null,
            canReroll: true, 
        }

    }

    getHitDie = () => {
        let obj = classOptionsData.find(obj => obj.name === this.props.characterClass);
        return this.setState({hitDie: obj.hd})
    }

    getHitPoints = () => {

        var HPResult = this.props.d(1, this.state.hitDie)
        var totalHP = HPResult + this.props.conMod
        if (totalHP < 1) 
            {return totalHP = 1}
        this.setState(
            {hitPoints: totalHP,
            conModifier: this.props.conMod,
            HPResult: HPResult,
        
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

        <div className="class-options-screen"> 

            <h3>Level 1 {this.props.characterClass}</h3>

            {!this.state.HPResult &&
            <button className="button button-primary button--hp" onClick={() => setTimeout(this.getHitPoints(), 200)}> Roll HP</button>}

            {this.state.HPResult && 

            <button className="button button-primary button--hp" 
            onClick={() => setTimeout(this.reRoll(), 4000)}
            
            style={{opacity: (this.state.HPResult < 3) && this.state.canReroll ? 1 : 0}}
            disabled={!this.state.canReroll}
    
            > ReRoll ? </button>}




            <div className="hp-container container">
                <div className="hp-container--hit-die">
                    {this.state.hitPoints && <span>{this.state.HPResult}</span>}
                    {!this.state.hitPoints && <span>d{this.state.hitDie}</span>}

                    {!this.state.hitPoints && <div className="hp-container--hit-die-name">Hit Die</div>}
                    {this.state.hitPoints && <div className="hp-container--hit-die-name">Rolled</div>}
                        
                </div>

                <div className="hp-container--math">+</div>

                <div className="hp-container--con-mod"> {this.props.conMod}
                    <div className="hp-container--con-mod-name">Con Mod</div></div>

                <div className="hp-container--math">=</div>

                <div className="hp-container--hit-points">{this.state.hitPoints}
                <div className="hp-container--hit-points-name">Hit Points</div>
                
                </div>    
              
            </div>

                
            
            <div className="saving-throws container"> 
                <div className="saving-throw">Death/Poison {obj.savingThrows[0]}</div>
                <div className="saving-throw">Wands {obj.savingThrows[1]}</div>
                <div className="saving-throw">Paralysis/Petrify {obj.savingThrows[2]}</div>
                <div className="saving-throw">Breath Attacks {obj.savingThrows[3]}</div>
                <div className="saving-throw">Spells/Rods/Staves {obj.savingThrows[4]}</div>
            </div> 

            <button onClick={this.props.showAbilityScreen()}>Go Back</button>
            
        </div>


        )
     }
}

export default ClassScreen