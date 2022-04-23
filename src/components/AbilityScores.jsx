import React from "react"
import AbilityScoreBox from "./AbilityScoreBox"
import { redFail, Thief } from "../constants/constants"
import { abilityScoreNames } from "../constants/constants"
import { Trans } from "react-i18next"

export default function AbilityScores(props) {
  const {
    abilityScores,
    characterClass,
    setAbilityScores,
    pointBuy,
    setPointBuy,
    characterModifiers,
  } = props

  const {
    primeReq,
    strengthModMelee,
    strengthModDoors,
    intelligenceModLanguages,
    intelligenceModLiteracy,
    wisdomMod,
    dexterityModAC,
    dexterityModMissiles,
    dexterityModInitiative,
    constitutionMod,
    charismaModNPCReactions,
    charismaModRetainersMax,
    charismaModLoyalty,
  } = characterModifiers

  const scoreIncrease = (key) => {
    const keyOriginal = key + "Original"
    const value = abilityScores[key]

    //check if score has already been decreased

    const increment = value < abilityScores[keyOriginal] ? 2 : 1

    if (pointBuy < 1) {
      return
    }

    const maximumAbilityScore = 18

    if (value === maximumAbilityScore) {
      return
    }

    let newValue = value + increment

    setAbilityScores({ ...abilityScores, [key]: newValue })
    setPointBuy(pointBuy - 1)
  }

  const scoreDecrease = (key) => {
    const keyOriginal = key + "Original"
    const value = abilityScores[key]
    let decrement = value > abilityScores[keyOriginal] ? -1 : -2

    if (abilityScores[key] <= 10) {
      return
    }

    let newValue = value + decrement

    setPointBuy(pointBuy + 1)
    setAbilityScores({ ...abilityScores, [key]: newValue })
  }

  const primeReqs = characterClass.primeReqs?.join(" ")

  return (
    <div className="container ability-score-container">
      {pointBuy > 0 && <div className="point-buy">Point Buy: {pointBuy}</div>}

      <div className="ability-score-name">
        <h2>
          <Trans i18nKey="abilityScoreNames.strength"></Trans>
        </h2>

        {primeReqs.includes("strength") && (
          <div className="prime-req">Prime Req: {primeReq}</div>
        )}
      </div>

      <AbilityScoreBox
        abilityScoreValue={abilityScores.strength}
        abilityScoreValueOriginal={abilityScores.strengthOriginal}
        abilityScoreName={"strength"}
        scoreIncrease={scoreIncrease}
        scoreDecrease={scoreDecrease}
        canDecrease={characterClass.className === Thief ? false : true}
        characterClass={characterClass}
        pointBuy={pointBuy}
      ></AbilityScoreBox>

      <div className="ability-mod">
        <span>Melee Attacks: {strengthModMelee} </span>
        <span>Open Doors: {strengthModDoors}</span>
      </div>

      <div className="ability-score-name">
        <h2>
          {" "}
          <Trans i18nKey="abilityScoreNames.intelligence"></Trans>
        </h2>

        {primeReqs.includes(abilityScoreNames.intelligence) && (
          <div className="prime-req">Prime Req: {primeReq}</div>
        )}
      </div>

      <AbilityScoreBox
        abilityScoreValue={abilityScores.intelligence}
        abilityScoreValueOriginal={abilityScores.intelligenceOriginal}
        abilityScoreName={"intelligence"}
        scoreIncrease={scoreIncrease}
        scoreDecrease={scoreDecrease}
        canDecrease={true}
        characterClass={characterClass}
        pointBuy={pointBuy}
      ></AbilityScoreBox>

      <div className="ability-mod ability-mod2">
        <span>Languages: {intelligenceModLanguages}</span>
        <span>Literacy: {intelligenceModLiteracy}</span>
      </div>

      <div className="ability-score-name">
        <h2>
          <Trans i18nKey="abilityScoreNames.wisdom"></Trans>
        </h2>

        {primeReqs.includes(abilityScoreNames.wisdom) && (
          <div className="prime-req">Prime Req: {primeReq}</div>
        )}
      </div>

      <AbilityScoreBox
        abilityScoreValue={abilityScores.wisdom}
        abilityScoreValueOriginal={abilityScores.wisdomOriginal}
        abilityScoreName={"wisdom"}
        scoreIncrease={scoreIncrease}
        scoreDecrease={scoreDecrease}
        canDecrease={true}
        characterClass={characterClass}
        pointBuy={pointBuy}
      ></AbilityScoreBox>

      <div className="ability-mod">
        <span>Magic Saves: {wisdomMod}</span>
      </div>

      <div className="ability-score-name">
        <h2>
          <Trans i18nKey="abilityScoreNames.dexterity"></Trans>
        </h2>

        {primeReqs.includes(abilityScoreNames.dexterity) && (
          <div className="prime-req">Prime Req: {primeReq}</div>
        )}
      </div>

      <AbilityScoreBox
        abilityScoreValue={abilityScores.dexterity}
        abilityScoreValueOriginal={abilityScores.dexterityOriginal}
        abilityScoreName={"dexterity"}
        scoreIncrease={scoreIncrease}
        scoreDecrease={scoreDecrease}
        canDecrease={false}
        characterClass={characterClass}
        pointBuy={pointBuy}
      ></AbilityScoreBox>

      <div className="ability-mod">
        <span> AC: {dexterityModAC}</span>
        <span> Missile: {dexterityModMissiles}</span>
        <span>Initiative: {dexterityModInitiative}</span>
      </div>

      <div className="ability-score-name">
        <h2>
          <Trans i18nKey="abilityScoreNames.constitution"></Trans>
        </h2>

        {primeReqs.includes(abilityScoreNames.constitution) && (
          <div className="prime-req">Prime Req: {primeReq}</div>
        )}
      </div>

      <AbilityScoreBox
        abilityScoreValue={abilityScores.constitution}
        abilityScoreValueOriginal={abilityScores.constitutionOriginal}
        abilityScoreName={"constitution"}
        scoreIncrease={scoreIncrease}
        scoreDecrease={scoreDecrease}
        canDecrease={false}
        characterClass={characterClass}
        pointBuy={pointBuy}
      ></AbilityScoreBox>

      <div className="ability-mod">
        <span>Hit Points: {constitutionMod}</span>
      </div>

      <div className="ability-score-name">
        <h2>
          <Trans i18nKey="abilityScoreNames.charisma"></Trans>
        </h2>

        {primeReqs.includes(abilityScoreNames.charisma) && (
          <div className="prime-req">Prime Req: {primeReq}</div>
        )}
      </div>

      <AbilityScoreBox
        abilityScoreValue={abilityScores.charisma}
        abilityScoreValueOriginal={abilityScores.charismaOriginal}
        abilityScoreName={"charisma"}
        scoreIncrease={scoreIncrease}
        scoreDecrease={scoreDecrease}
        canDecrease={false}
        characterClass={characterClass}
        pointBuy={pointBuy}
      ></AbilityScoreBox>

      <div className="ability-mod">
        <span>NPC Reactions: {charismaModNPCReactions}</span>
        <span>Retainers Max #: {charismaModRetainersMax}</span>
        <span>Loyalty: {charismaModLoyalty}</span>
      </div>
    </div>
  )
}
