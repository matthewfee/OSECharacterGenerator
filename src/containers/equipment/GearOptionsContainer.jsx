import React from 'react'
import PropTypes from 'prop-types'

export default function GearOptionsContainer(props) {
  const {
    adventuringGearSelected,
    updateSelectedAdventuringGear,
    adventuringGearList,
    storeHandler,
    selectRandomGear
  } = props

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
            storeHandler(adventuringGearSelected, 'buy', 'gear')
          }}
        />
      </div>
    </React.Fragment>
  )
}

GearOptionsContainer.propTypes = {
  characterClass: PropTypes.object,
  adventuringGearSelected: PropTypes.string,
  updateSelectedAdventuringGear: PropTypes.func,
  adventuringGearList: PropTypes.func,
  selectRandomGear: PropTypes.func,
  storeHandler: PropTypes.func
}
