import React from "react";

// First of all please deconstruct props either by doing AbilityScoreBox({ abilityScoreValue, etc... })
// or by adding const { abilityScoreValue, etc... } = props
// it adds visibibility to the code + you dont need to put props. every time you want to use them

export default function AbilityScoreBox(props) {
  const redFail = "#730505";
  return (
    <div
      //
      className={`ability-score ${
        props.abilityScoreValue > 15 ? "abilityscore--high" : ``
      }`}
      // Use https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
      // becasue ability-score stays in both conditions and only ability-score--high is the one that you want to change
      //   props.abilityScoreValue > 15
      //     ? "ability-score ability-score--high"
      //     : "ability-score"
      // }
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
