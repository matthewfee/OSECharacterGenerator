import React from "react"
import { joinDuplicates } from "../utilities/utilities"
import PropTypes from "prop-types"

export default function Backpack(props) {
  const { storeHandler, items, itemType } = props
  return (
    <div className={`backpack backpack--${itemType}`}>
      {joinDuplicates(items).map((item, index) => {
        return (
          <li
            className={`backpack-item backpack-item--${itemType}`}
            value={item}
            key={index}
          >
            {item}
            <button
              className={`button button--equipment button--${itemType}`}
              value={item}
              onClick={() => storeHandler(item, "sell", itemType)}
            >
              Sell
            </button>
          </li>
        )
      })}
    </div>
  )
}

Backpack.propTypes = {
  itemType: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.string),
  storeHandler: PropTypes.func,
}
