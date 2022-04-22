import React from "react";

export default function GearOptionsContainer(props) {
  const {
    characterClass,
    adventuringGearSelected,
    updateSelectedAdventuringGear,
    adventuringGearList,
    storeHandler,
    selectRandomGear
  } = props;

  return (
    <React.Fragment>
      <div className="equipment-container--header">Adventuring Gear</div>

      <div className="gear-container">
        <select
          className="gear-select"
          value={adventuringGearSelected}
          onChange={updateSelectedAdventuringGear}
          price={null}
        >
          {adventuringGearList()}
        </select>

        <button className="button--random-weapon" onClick={selectRandomGear}>
          Random
        </button>

        <input
          className="button--buy-gear"
          type="submit"
          value="Buy"
          onClick={() => {
            storeHandler(adventuringGearSelected, "buy", "gear");
          }}
        />
      </div>
    </React.Fragment>
  );
}
