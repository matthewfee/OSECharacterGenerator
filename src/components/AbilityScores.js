import React from "react";
import AbilityScoreBox from "./AbilityScoreBox";

export default function AbilityScores(props) {
  const {
    abilityScores,
    characterClass,
    setAbilityScores,
    pointBuy,
    setPointBuy
  } = props;

  const scoreIncrease = key => {
    const keyOriginal = key + "Original";
    // use const instead of let
    const value = abilityScores[key];

    //checks if score has already been decreased

    const increment = value < abilityScores[keyOriginal] ? 2 : 1;

    //checks if there's points to buy

    if (pointBuy < 1) {
      return;
    }

    const maximumAbilityScore = 18;

    if (value === maximumAbilityScore) {
      return;
    }

    let newValue = value + increment;

    setAbilityScores({ ...abilityScores, [key]: newValue });
    setPointBuy(pointBuy - 1);
  };

  const scoreDecrease = key => {
    const keyOriginal = key + "Original";
    const value = abilityScores[key];
    let decrement = value > abilityScores[keyOriginal] ? -1 : -2;

    if (abilityScores[key] <= 10) {
      return;
    }

    let newValue = value + decrement;

    setPointBuy(pointBuy + 1);
    setAbilityScores({ ...abilityScores, [key]: newValue });
  };

  const redFail = "#730505";
  const primeReqs = characterClass.primeRequisites
    ? characterClass.primeRequisites.join(" ").toLowerCase()
    : "";

  return (
    <div className="container ability-score-container">
      {pointBuy > 0 && <div className="point-buy">Point Buy: {pointBuy}</div>}

      <div className="ability-score-name">
        {/* Add i18n https://react.i18next.com/ */}
        <h2>STRENGTH</h2>

        {primeReqs.includes("strength") && (
          <div className="prime-req">Prime Req: {primeReqMod}</div>
        )}
      </div>

      <AbilityScoreBox
        abilityScoreValue={abilityScores.strength}
        abilityScoreValueOriginal={abilityScores.strengthOriginal}
        abilityScoreName={`strength`}
        scoreIncrease={scoreIncrease}
        scoreDecrease={scoreDecrease}
        canDecrease={
          // Put all Strings that you are reusing into consts folder/file and access it via variable
          characterClass.className === "Thief" ? false : true
        }
        characterClass={characterClass}
        pointBuy={pointBuy}
      ></AbilityScoreBox>

      <div className="ability-mod">
        {/* <span>Melee Attacks: {strengthModMelee} </span> */}
        {/* <span>Open Doors: {strengthModDoors}</span> */}
      </div>

      <div className="ability-score-name">
        <h2>INTELLIGENCE</h2>

        {primeReqs.includes("intelligence") && (
          <div className="prime-req">
            Prime Req: {characterClass.primeReqMod}
          </div>
        )}
      </div>

      <AbilityScoreBox
        abilityScoreValue={abilityScores.intelligence}
        abilityScoreValueOriginal={abilityScores.intelligenceOriginal}
        abilityScoreName={`intelligence`}
        scoreIncrease={scoreIncrease}
        scoreDecrease={scoreDecrease}
        canDecrease={true}
        characterClass={characterClass}
        pointBuy={pointBuy}
        // primeReqs={primeReqs}
      ></AbilityScoreBox>

      <div className="ability-mod ability-mod2">
        {/* <span>Languages: {props.parentState.intelligenceModLanguages}</span> */}
        {/* <span>Literacy: {props.parentState.intelligenceModLiteracy}</span> */}
      </div>

      <div className="ability-score-name">
        <h2>WISDOM</h2>

        {primeReqs.includes("wisdom") && (
          <div className="prime-req">Prime Req: {primeReqMod}</div>
        )}
      </div>

      <AbilityScoreBox
        abilityScoreValue={abilityScores.wisdom}
        abilityScoreValueOriginal={abilityScores.wisdomOriginal}
        abilityScoreName={`wisdom`}
        scoreIncrease={scoreIncrease}
        scoreDecrease={scoreDecrease}
        canDecrease={true}
        characterClass={characterClass}
        pointBuy={pointBuy}
        primeReqs={primeReqs}
      ></AbilityScoreBox>

      <div className="ability-mod">
        {/* <span>Magic Saves: {props.parentState.wisdomMod}</span> */}
      </div>

      <div className="ability-score-name">
        <h2>DEXTERITY</h2>

        {primeReqs.includes("dexterity") && (
          <div className="prime-req">
            Prime Req: {characterClass.primeReqMod}
          </div>
        )}
      </div>

      <AbilityScoreBox
        abilityScoreValue={abilityScores.dexterity}
        abilityScoreValueOriginal={abilityScores.dexterityOriginal}
        abilityScoreName={`dexterity`}
        scoreIncrease={scoreIncrease}
        scoreDecrease={scoreDecrease}
        canDecrease={false}
        characterClass={characterClass}
        pointBuy={pointBuy}
        primeReqs={primeReqs}
      ></AbilityScoreBox>

      <div className="ability-mod">
        {/* <span> AC: {dexterityModAC}</span> */}
        {/* <span> Missile: {dexterityModMissiles}</span> */}
        {/* <span>Initiative: {dexterityModInitiative}</span> */}
      </div>

      <div className="ability-score-name">
        <h2>CONSTITUTION</h2>

        {primeReqs.includes("constitution") && (
          <div className="prime-req">Prime Req: {primeReqMod}</div>
        )}
      </div>

      <AbilityScoreBox
        abilityScoreValue={abilityScores.constitution}
        abilityScoreValueOriginal={abilityScores.constitutionOriginal}
        abilityScoreName={`constitution`}
        scoreIncrease={scoreIncrease}
        scoreDecrease={scoreDecrease}
        canDecrease={false}
        characterClass={characterClass}
        pointBuy={pointBuy}
        primeReqs={primeReqs}
      ></AbilityScoreBox>

      <div className="ability-mod">
        {/* <span>Hit Points: {constitutionMod}</span> */}
      </div>

      <div className="ability-score-name">
        <h2>CHARISMA</h2>

        {primeReqs.includes("charisma") && (
          <div className="prime-req">
            Prime Req: {characterClass.primeReqMod}
          </div>
        )}
      </div>

      <AbilityScoreBox
        abilityScoreValue={abilityScores.charisma}
        abilityScoreValueOriginal={abilityScores.charismaOriginal}
        abilityScoreName={`charisma`}
        scoreIncrease={scoreIncrease}
        scoreDecrease={scoreDecrease}
        canDecrease={false}
        characterClass={characterClass}
        pointBuy={pointBuy}
        primeReqs={primeReqs}
      ></AbilityScoreBox>

      <div className="ability-mod">
        {/* <span> NPC Reactions: {charismaModNPCReactions}</span>*/}
        {/* <span>Retainers Max #: {charismaModRetainersMax}</span> */}
        {/* <span>Loyalty: {charismaModLoyalty}</span> */}
      </div>
    </div>
  );
}
