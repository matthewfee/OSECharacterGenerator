import React from "react";
import AbilityScoreBox from "./AbilityScoreBox";

export default function AbilityScores(props) {
  const scoreIncrease = key => {
    const keyOriginal = key + "Original";
// use const instead of let
    let value = props.parentState[key];

    let newPointBuy = props.parentState.pointBuy - 1;

    let increment = 1;

    //check if score has already been decreased
// you dont need it here, add it to the variable declaration
// const increment = value < props.parentState[keyOriginal] ? 2 : 1
    if (value < props.parentState[keyOriginal]) {
      increment = 2;
    }

    //checks if there's points to buy

    if (props.parentState.pointBuy < 1) {
      return;
    }

    //maximum 18
// Add all those "magic numbers" to variable. oyu dont need to comment "maximum 18"
// if you put it to the variable called maxValue = 18
// https://en.wikipedia.org/wiki/Magic_number_(programming)
    if (value === 18) {
      return;
    }

    let newValue = value + increment;

    let newObject = {
      [key]: newValue,
      pointBuy: newPointBuy
    };

    props.setParentState(newObject);
    props.getModValue(key, newValue);

    // props.setParentState(newObject, () => {
    //   props.getMod();
    // });
  };

  const scoreDecrease = key => {
    const keyOriginal = key + "Original";
    const value = props.parentState[key];
    let decrement = -2;

    if (value > props.parentState[keyOriginal]) {
      decrement = -1;
    }

    let newPointBuy = props.parentState.pointBuy + 1;

    if (props.parentState[key] <= 10) {
      return;
    }

    let newValue = value + decrement;

    let newObject = {
      [key]: newValue,
      pointBuy: newPointBuy
    };

    props.setParentState(newObject);
    props.getModValue(key, newValue);
  };

  const redFail = "#730505";
  const primeReqs = props.parentState.primeReq2
    ? (
        props.parentState.primeReq +
        " " +
        props.parentState.primeReq2
      ).toLowerCase()
    : props.parentState.primeReq.toLowerCase();

  return (
    <div className="container ability-score-container">
      {props.parentState.pointBuy > 0 && (
        <div className="point-buy">Point Buy: {props.parentState.pointBuy}</div>
      )}

      <div className="ability-score-name">
        {/* Add i18n https://react.i18next.com/ */}
        <h2>STRENGTH</h2>

        {primeReqs.includes("strength") && (
          <div className="prime-req">
            Prime Req: {props.parentState.primeReqMod}
          </div>
        )}
      </div>

      <AbilityScoreBox
        abilityScoreValue={props.parentState.strength}
        abilityScoreValueOriginal={props.parentState.strengthOriginal}
        abilityScoreName={`strength`}
        scoreIncrease={scoreIncrease}
        scoreDecrease={scoreDecrease}
        canDecrease={
          // Put all Strings that you are reusing into consts folder/file and access it via variable
          props.parentState.characterClass === "Thief" ? false : true
        }
        characterClass={props.parentState.characterClass}
        pointBuy={props.parentState.pointBuy}
        primeReqs={primeReqs}
      ></AbilityScoreBox>

      <div className="ability-mod">
        <span>Melee Attacks: {props.parentState.strengthModMelee} </span>
        <span>Open Doors: {props.parentState.strengthModDoors}</span>
      </div>

      <div className="ability-score-name">
        <h2>INTELLIGENCE</h2>

        {primeReqs.includes("intelligence") && (
          <div className="prime-req">
            Prime Req: {props.parentState.primeReqMod}
          </div>
        )}
      </div>

      <AbilityScoreBox
        abilityScoreValue={props.parentState.intelligence}
        abilityScoreValueOriginal={props.parentState.intelligenceOriginal}
        abilityScoreName={`intelligence`}
        scoreIncrease={scoreIncrease}
        scoreDecrease={scoreDecrease}
        canDecrease={true}
        characterClass={props.parentState.characterClass}
        pointBuy={props.parentState.pointBuy}
        primeReqs={primeReqs}
      ></AbilityScoreBox>

      <div className="ability-mod ability-mod2">
        <span>Languages: {props.parentState.intelligenceModLanguages}</span>
        <span>Literacy: {props.parentState.intelligenceModLiteracy}</span>
      </div>

      <div className="ability-score-name">
        <h2>WISDOM</h2>

        {primeReqs.includes("wisdom") && (
          <div className="prime-req">
            Prime Req: {props.parentState.primeReqMod}
          </div>
        )}
      </div>

      <AbilityScoreBox
        abilityScoreValue={props.parentState.wisdom}
        abilityScoreValueOriginal={props.parentState.wisdomOriginal}
        abilityScoreName={`wisdom`}
        scoreIncrease={scoreIncrease}
        scoreDecrease={scoreDecrease}
        canDecrease={true}
        characterClass={props.parentState.characterClass}
        pointBuy={props.parentState.pointBuy}
        primeReqs={primeReqs}
      ></AbilityScoreBox>

      <div className="ability-mod">
        <span>Magic Saves: {props.parentState.wisdomMod}</span>
      </div>

      <div className="ability-score-name">
        <h2>DEXTERITY</h2>

        {primeReqs.includes("dexterity") && (
          <div className="prime-req">
            Prime Req: {props.parentState.primeReqMod}
          </div>
        )}
      </div>

      <AbilityScoreBox
        abilityScoreValue={props.parentState.dexterity}
        abilityScoreValueOriginal={props.parentState.dexterityOriginal}
        abilityScoreName={`dexterity`}
        scoreIncrease={scoreIncrease}
        scoreDecrease={scoreDecrease}
        canDecrease={false}
        characterClass={props.parentState.characterClass}
        pointBuy={props.parentState.pointBuy}
        primeReqs={primeReqs}
      ></AbilityScoreBox>

      <div className="ability-mod">
        <span> AC: {props.parentState.dexterityModAC}</span>
        <span> Missile: {props.parentState.dexterityModMissiles}</span>
        <span>Initiative: {props.parentState.dexterityModInitiative}</span>
      </div>

      <div className="ability-score-name">
        <h2>CONSTITUTION</h2>

        {primeReqs.includes("constitution") && (
          <div className="prime-req">
            Prime Req: {props.parentState.primeReqMod}
          </div>
        )}
      </div>

      <AbilityScoreBox
        abilityScoreValue={props.parentState.constitution}
        abilityScoreValueOriginal={props.parentState.constitutionOriginal}
        abilityScoreName={`constitution`}
        scoreIncrease={scoreIncrease}
        scoreDecrease={scoreDecrease}
        canDecrease={false}
        characterClass={props.parentState.characterClass}
        pointBuy={props.parentState.pointBuy}
        primeReqs={primeReqs}
      ></AbilityScoreBox>

      <div className="ability-mod">
        <span>Hit Points: {props.parentState.constitutionMod}</span>
      </div>

      <div className="ability-score-name">
        <h2>CHARISMA</h2>

        {primeReqs.includes("charisma") && (
          <div className="prime-req">
            Prime Req: {props.parentState.primeReqMod}
          </div>
        )}
      </div>

      <AbilityScoreBox
        abilityScoreValue={props.parentState.charisma}
        abilityScoreValueOriginal={props.parentState.charismaOriginal}
        abilityScoreName={`charisma`}
        scoreIncrease={scoreIncrease}
        scoreDecrease={scoreDecrease}
        canDecrease={false}
        characterClass={props.parentState.characterClass}
        pointBuy={props.parentState.pointBuy}
        primeReqs={primeReqs}
      ></AbilityScoreBox>

      <div className="ability-mod">
        <span> NPC Reactions: {props.parentState.charismaModNPCReactions}</span>
        <span>
          Retainers Max #: {props.parentState.charismaModRetainersMax}
        </span>
        <span>Loyalty: {props.parentState.charismaModLoyalty}</span>
      </div>
    </div>
  );
}
