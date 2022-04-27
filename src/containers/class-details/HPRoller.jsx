import React, { useState } from 'react'
import { d } from '../../utilities/utilities'
import PropTypes from 'prop-types'
import { Dice } from '../../utilities/DiceBox'
import { isMobile } from 'react-device-detect'

export default function HPRoller (props) {
  const {
    characterClass,
    characterStatistics,
    setCharacterStatistics,
    characterModifiers
  } = props

  const [hitPoints, setHitPoints] = useState(null)
  const [HPResult, setHPResult] = useState(null)
  const [canReroll, setCanReroll] = useState(true)
  const [HPRolls, setHPRolls] = useState(0)

  const getHitPoints = () => {
    const die = characterClass.hd

    console.log('ROLLING HP', die)

    let HPResult

    if (isMobile) {
      HPResult = d(1, die)

      let totalHP = HPResult + parseInt(characterModifiers.constitutionMod)
      const HPRollsNew = HPRolls + 1

      if (totalHP < 1) {
        totalHP = 1
      }
      if (HPResult > 2 || HPRollsNew === 2) {
        setCanReroll(false)
      }

      setHitPoints(totalHP)
      setCharacterStatistics({ ...characterStatistics, totalHP })
      setHPResult(HPResult)
      setHPRolls(HPRollsNew)

      return
    }

    if (!isMobile) {
      Dice.hide().show()
        .roll(`1d${die}`)
        .then((results) => {
          const HPResult = results[0].value

          if (isNaN(HPResult)) {
            throw new Error('Dice result was not a number')
          }

          let totalHP = HPResult + parseInt(characterModifiers.constitutionMod)
          const HPRollsNew = HPRolls + 1

          if (totalHP < 1) {
            totalHP = 1
          }
          if (HPResult > 2 || HPRollsNew === 2) {
            setCanReroll(false)
          }

          setHitPoints(totalHP)
          setHPResult(HPResult)
          setHPRolls(HPRollsNew)
        })
    }
  }

  return (
    <React.Fragment>

        <button
          className="button button-primary button--hp"
          onClick={() => setTimeout(getHitPoints(), 200)}
          disabled={!canReroll}
          style={{
            fontSize: canReroll ? '' : '4rem'
          }}
        >
          {canReroll && `${HPRolls === 0 ? 'Roll HP' : 'Reroll?'}`}
          {!canReroll && hitPoints}
        </button>

      <div className="hp-container container">
        <div className="hp-container--hit-die">
          {hitPoints && <span>{HPResult}</span>}
          {!hitPoints && <span>d{characterClass.hd}</span>}

          {!hitPoints && (
            <div className="hp-container--hit-die-name">Hit Die</div>
          )}
          {hitPoints && (
            <div className="hp-container--hit-die-name">Rolled</div>
          )}
        </div>

        <div className="hp-container--math">+</div>

        <div className="hp-container--con-mod">
          {characterModifiers.constitutionMod}
          <div className="hp-container--con-mod-name">Con Mod</div>
        </div>

        <div className="hp-container--math">=</div>

        <div className="hp-container--hit-points">
          {hitPoints}
          <div className="hp-container--hit-points-name">Hit Points</div>
        </div>

        </div>
    </React.Fragment>
  )
}

HPRoller.propTypes = {
  screen: PropTypes.objectOf(PropTypes.bool),
  setScreen: PropTypes.func,
  characterClass: PropTypes.object,
  character: PropTypes.object,
  setCharacter: PropTypes.func,
  characterStatistics: PropTypes.shape({
    hitPoints: PropTypes.number,
    armourClass: PropTypes.number,
    spell: PropTypes.string,
    hasSpells: PropTypes.bool,
    unarmouredAC: PropTypes.number
  }),
  setCharacterStatistics: PropTypes.func,
  characterModifiers: PropTypes.object
}
