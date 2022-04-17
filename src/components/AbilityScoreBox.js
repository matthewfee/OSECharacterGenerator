import React from "react";

// First of all please deconstruct props either by doing AbilityScoreBox({ abilityScoreValue, etc... })
// or by adding const { abilityScoreValue, etc... } = props
// it adds visibibility to the code + you dont need to put props. every time you want to use them

export default function AbilityScoreBox(props) {
  const {
    abilityScoreValue,
    abilityScoreValueOriginal,
    abilityScoreName,
    scoreIncrease,
    scoreDecrease,
    canDecrease,
    characterClass,
    pointBuy,
    primeReqs
  } = props;
  const redFail = "#730505";
  return (
    <div
      //
      className={`ability-score ${
        abilityScoreValue > 15 ? "abilityscore--high" : ""
      }`}
      style={{ color: abilityScoreValue < 6 ? redFail : "" }}
    >
      {abilityScoreValue}

      {abilityScoreValue > 10 && canDecrease && (
        <button
          className="button button--ability button--ability--decrease"
          onClick={() => {
            scoreDecrease(abilityScoreName);
          }}
        >
          <div className="arrow-down"></div>
        </button>
      )}

      {pointBuy > 0 &&
        (primeReqs.includes(abilityScoreName) ||
          abilityScoreValue < abilityScoreValueOriginal) &&
        abilityScoreValue < 18 && (
          <button
            className="button button--ability button--ability--increase"
            onClick={() => {
              scoreIncrease(abilityScoreName);
            }}
          >
            <div className="arrow-up"></div>
          </button>
        )}
    </div>
  );
}
