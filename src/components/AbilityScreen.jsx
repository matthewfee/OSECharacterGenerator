import React from "react"
import { Trans } from "react-i18next"
import ClassOptions from "./ClassOptions"
import AbilityScores from "./AbilityScores"
import NavigationOptions from "./NavigationOptions"

export default function AbilityScreen(props) {
  const {
    characterRolled,
    characterClass,
    abilityScores,
    changeCharacterClass,
    setAbilityScores,
    pointBuy,
    setPointBuy,
    characterModifiers,
    rollCharacter,
    pages,
    setPages,
  } = props

  return (
    <div className="ability-screen container">
      <h2 className="header-default character-class-header">
        <Trans i18nKey="characterClass">Character Class</Trans>
      </h2>
      <ClassOptions
        characterClass={characterClass}
        abilityScores={abilityScores}
        changeCharacterClass={changeCharacterClass}
      ></ClassOptions>

      <h2 className="ability-scores--header header-default">
        <Trans i18nKey="abilityScores">Ability Scores</Trans>
      </h2>

      <AbilityScores
        abilityScores={abilityScores}
        setAbilityScores={setAbilityScores}
        pointBuy={pointBuy}
        setPointBuy={setPointBuy}
        characterClass={characterClass}
        characterModifiers={characterModifiers}
      ></AbilityScores>

      <NavigationOptions
        rollCharacter={rollCharacter}
        pages={pages}
        setPages={setPages}
        characterClass={characterClass}
      ></NavigationOptions>
    </div>
  )
}
