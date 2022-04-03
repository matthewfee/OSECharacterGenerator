import React from "react";

export default function AbilityScores(props) {
  const scoreIncrease = key => {
    const keyOriginal = key + "Original";

    let value = props.parentState[key];

    let newPointBuy = props.parentState.pointBuy - 1;

    let increment = 1;

    //check if score has already been decreased

    if (value < props.parentState[keyOriginal]) {
      increment = 2;
    }

    //checks if there's points to buy

    if (props.parentState.pointBuy < 1) {
      return;
    }

    //maximum 18

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
        <h2>STRENGTH</h2>

        {primeReqs.includes("strength") && (
          <div className="prime-req">
            Prime Req: {props.parentState.primeReqMod}
          </div>
        )}
      </div>

      <div
        className={
          props.parentState.strength > 15
            ? "ability-score ability-score--high"
            : "ability-score"
        }
        style={{ color: props.parentState.strength < 6 ? redFail : "" }}
      >
        {props.parentState.strength}

        {props.parentState.strength > 10 &&
          props.parentState.characterClass !== "Thief" && (
            <button
              className="button button--ability button--ability--decrease"
              onClick={() => {
                scoreDecrease("strength");
              }}
            >
              <div className="arrow-down"></div>
            </button>
          )}

        {props.parentState.pointBuy > 0 &&
          (primeReqs.includes("strength") ||
            props.parentState.strength < props.parentState.strengthOriginal) &&
          props.parentState.strength < 18 && (
            <button
              className="button button--ability button--ability--increase"
              onClick={() => {
                scoreIncrease("strength");
              }}
            >
              <div className="arrow-up"></div>
            </button>
          )}
      </div>
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

      <div
        className={
          props.parentState.intelligence > 15
            ? "ability-score ability-score--high"
            : "ability-score"
        }
        style={{ color: props.parentState.intelligence < 6 ? redFail : "" }}
      >
        {props.parentState.intelligence}

        {props.parentState.intelligence > 10 && (
          <button
            className="button button--ability button--ability--decrease"
            onClick={() => {
              scoreDecrease("intelligence");
            }}
          >
            <div className="arrow-down"></div>
          </button>
        )}
        {props.parentState.pointBuy > 0 &&
          (primeReqs.includes("intelligence") ||
            props.parentState.intelligence <
              props.parentState.intelligenceOriginal) &&
          props.parentState.intelligence < 18 && (
            <button
              className="button button--ability button--ability--increase"
              onClick={() => {
                scoreIncrease("intelligence");
              }}
            >
              <div className="arrow-up"></div>
            </button>
          )}
      </div>
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
      <div
        style={{ color: props.parentState.wisdom < 6 ? redFail : "" }}
        className={
          props.parentState.wisdom > 15
            ? "ability-score ability-score--high"
            : "ability-score"
        }
      >
        {props.parentState.wisdom}

        {props.parentState.wisdom > 10 && (
          <button
            className="button button--ability button--ability--decrease"
            onClick={() => {
              scoreDecrease("wisdom");
            }}
          >
            <div className="arrow-down"></div>
          </button>
        )}
        {props.parentState.pointBuy > 0 &&
          (primeReqs.includes("wisdom") ||
            props.parentState.wisdom < props.parentState.wisdomOriginal) &&
          props.parentState.wisdom < 18 && (
            <button
              className="button button--ability button--ability--increase"
              onClick={() => {
                scoreIncrease("wisdom");
              }}
            >
              <div className="arrow-up"></div>
            </button>
          )}
      </div>
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

      <div
        className={
          props.parentState.dexterity > 15
            ? "ability-score ability-score--high"
            : "ability-score"
        }
        style={{ color: props.parentState.dexterity < 6 ? redFail : "" }}
      >
        {props.parentState.dexterity}

        {props.parentState.pointBuy > 0 &&
          primeReqs.includes("dexterity") &&
          props.parentState.dexterity < 18 && (
            <button
              className="button button--ability button--ability--increase"
              onClick={() => {
                scoreIncrease("dexterity");
              }}
            >
              <div className="arrow-up"></div>
            </button>
          )}

        {props.parentState.dexterity > props.parentState.dexterityOriginal && (
          <button
            className="button button--ability button--ability--decrease"
            onClick={() => {
              scoreDecrease("dexterity");
            }}
          >
            <div className="arrow-down"></div>
          </button>
        )}
      </div>

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

      <div
        className={
          props.parentState.constitution > 15
            ? "ability-score ability-score--high"
            : "ability-score"
        }
        style={{ color: props.parentState.constitution < 6 ? redFail : "" }}
      >
        {props.parentState.constitution}

        {props.parentState.pointBuy > 0 &&
          primeReqs.includes("constitution") &&
          props.parentState.constitution < 18 && (
            <button
              className="button button--ability button--ability--increase"
              onClick={() => {
                scoreIncrease("constitution");
              }}
            >
              <div className="arrow-up"></div>
            </button>
          )}
      </div>
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

      <div
        className={
          props.parentState.charisma > 15
            ? "ability-score ability-score--high"
            : "ability-score"
        }
        style={{ color: props.parentState.charisma < 6 ? redFail : "" }}
      >
        {props.parentState.charisma}

        {props.parentState.pointBuy > 0 &&
          primeReqs.includes("charisma") &&
          props.parentState.charisma < 18 && (
            <button
              className="button button--ability button--ability--increase"
              onClick={() => {
                scoreIncrease("charisma");
              }}
            >
              <div className="arrow-up"></div>
            </button>
          )}
      </div>

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
