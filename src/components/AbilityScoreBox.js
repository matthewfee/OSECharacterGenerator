import React from "react";

export default function AbilityScoreBox(props) {
  const redFail = "#730505";
  return (
    <div
      className={
        props.abilityScoreValue > 15
          ? "ability-score ability-score--high"
          : "ability-score"
      }
      style={{ color: props.abilityScoreValue < 6 ? redFail : "" }}
    >
      {props.abilityScoreValue}

      {props.abilityScoreValue > 10 && props.canDecrease && (
        <button
          className="button button--ability button--ability--decrease"
          onClick={() => {
            props.scoreDecrease(props.abilityScoreName);
          }}
        >
          <div className="arrow-down"></div>
        </button>
      )}

      {props.pointBuy > 0 &&
        (props.primeReqs.includes(props.abilityScoreName) ||
          props.abilityScoreValue < props.abilityScoreValueOriginal) &&
        props.abilityScoreValue < 18 && (
          <button
            className="button button--ability button--ability--increase"
            onClick={() => {
              props.scoreIncrease(props.abilityScoreName);
            }}
          >
            <div className="arrow-up"></div>
          </button>
        )}
    </div>
  );
}
