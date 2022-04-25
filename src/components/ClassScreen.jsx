import React, { useState, useEffect } from "react"
import classOptionsData from "../data/classOptionsData"
import { d, chooseRandomItem } from "../utilities/utilities"
import { magicUserSpells, druidSpells, illusionistSpells } from "../data/spells"
import { Trans } from "react-i18next"
import PropTypes from "prop-types"
import { Dice } from "./DiceBox"

export default function ClassScreen(props) {
  const {
    screen,
    setScreen,
    characterClass,
    character,
    setCharacter,
    characterStatistics,
    setCharacterStatistics,
    characterModifiers,
  } = props

  const [hitPoints, setHitPoints] = useState(null)
  const [HPResult, setHPResult] = useState(null)
  const [canReroll, setCanReroll] = useState(true)
  const [HPRolls, setHPRolls] = useState(0)
  const [hitDie, setHitDie] = useState(null)
  const [spellSelected, setSpellSelected] = useState("")

  useEffect(() => {
    getHitDie()
  }, [])

  const getHitDie = () => {
    return setHitDie(characterClass.hd)
  }

  const getHitPoints = () => {
    let die = characterClass.hd
    Dice.show().roll(`1d${die}`)
  }

  Dice.onRollComplete = (results) => {
    const HPResult = results[0].value
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
  }

  const chooseSpells = () => {
    if (characterClass.arcaneSpells) {
      return chooseRandomItem(magicUserSpells)
    }

    if (characterClass.druidSpells) {
      return chooseRandomItem(druidSpells)
    }

    if (characterClass.illusionistSpells) {
      return chooseRandomItem(illusionistSpells)
    }

    return "No Spells Found"
  }

  const spellOption = (spell) => {
    return (
      <option key={spell} value={spell}>
        {spell}
      </option>
    )
  }

  const spellsList = () => {
    let spellList = ""

    if (characterClass.arcaneSpells) {
      spellList = magicUserSpells.map((spell) => {
        return spellOption(spell)
      })
    }

    if (characterClass.druidSpells) {
      spellList = druidSpells.map((spell) => {
        return spellOption(spell)
      })
    }

    if (characterClass.illusionistSpells) {
      spellList = illusionistSpells.map((spell) => {
        return spellOption(spell)
      })
    }

    return spellList
  }

  const handleSpellChange = (event) => {
    setSpellSelected(event.target.value)
  }

  const hasSpells =
    characterClass.arcaneSpells ||
    characterClass.divineSpells ||
    characterClass.illusionistSpells ||
    characterClass.druidSpells
      ? true
      : false

  return (
    <div className="class-options-screen">
      <h3 className="header-default">
        <Trans i18nKey="classOptions">Class Options</Trans>
      </h3>

      {
        <button
          className="button button-primary button--hp"
          onClick={() => setTimeout(getHitPoints(), 200)}
          disabled={!canReroll}
          style={{
            fontSize: canReroll ? "" : "4rem",
          }}
        >
          {canReroll && `${HPRolls === 0 ? "Roll HP" : "Reroll?"}`}
          {!canReroll && hitPoints}
        </button>
      }

      <div className="hp-container container">
        <div className="hp-container--hit-die">
          {hitPoints && <span>{HPResult}</span>}
          {!hitPoints && <span>d{hitDie}</span>}

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

      {hitPoints && (
        <div className="saving-throws-menu">
          <h5 className="saving-throws-menu--header">
            {characterClass.name} Saving Throws
          </h5>

          <div className="saving-throws container">
            <div className="saving-throw--death saving-throw-name">Death </div>
            <div className="saving-throw--death--value saving--value">
              {characterClass.savingThrows[0]}
            </div>
            <div className="saving-throw--wands saving-throw-name">Wands </div>
            <div className="saving-throw--wands--value saving--value">
              {characterClass.savingThrows[1]}
            </div>
            <div className="saving-throw--paralysis saving-throw-name">
              Paralysis{" "}
            </div>
            <div className="saving-throw--paralysis--value saving--value">
              {characterClass.savingThrows[2]}
            </div>
            <div className="saving-throw--breath saving-throw-name">Breath</div>
            <div className="saving-throw--breath--value saving--value">
              {characterClass.savingThrows[3]}
            </div>
            <div className="saving-throw--spells saving-throw-name">
              Spells{" "}
            </div>
            <div className="saving-throw--spells--value saving--value">
              {characterClass.savingThrows[4]}
            </div>
          </div>
        </div>
      )}

      {hitPoints && (
        <div className="class-ability-menu">
          <h5 className="class-ability-menu--header">
            {" "}
            {characterClass.name} Abilities
          </h5>

          <div className="class-ability-menu--abilities">
            <ul className="class-ability-list">
              {characterClass.abilities.map((item) => {
                return (
                  <li key={item} className="class-ability">
                    {" "}
                    {item}{" "}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      )}

      {hitPoints && hasSpells && (
        <div className="spell-selection-menu">
          <h5 className="class-ability-menu--header">
            {characterClass.name} Spells
          </h5>
          <select
            className="spells-select"
            value={spellSelected}
            onChange={handleSpellChange}
          >
            <option value="" disabled>
              Select Spell
            </option>
            {spellsList()}
          </select>
          <button
            className="button--random-spell"
            onClick={() => setSpellSelected(chooseSpells())}
          >
            Random Spell
          </button>
        </div>
      )}

      {hitPoints > 0 && (
        <button
          className="button button--equipment-options"
          onClick={() => {
            setCharacterStatistics({
              ...characterStatistics,
              hitPoints: hitPoints,
              hasSpells: hasSpells,
              spell: spellSelected,
            })

            setScreen({ ...screen, equipmentScreen: true, classScreen: false })
          }}
        >
          Go to Equipment
        </button>
      )}
    </div>
  )
}

ClassScreen.propTypes = {
  screen: PropTypes.objectOf(PropTypes.bool),
  setScreen: PropTypes.func,
  characterClass: PropTypes.object,
  character: PropTypes.object,
  setCharacter: PropTypes.func,
  characterStatistics: PropTypes.shape({
    hitPoints: PropTypes.number,
    armourClass: PropTypes.number,
    spell: PropTypes.array,
    hasSpells: PropTypes.bool,
    unarmouredAC: PropTypes.number,
  }),
  setCharacterStatistics: PropTypes.func,
}
