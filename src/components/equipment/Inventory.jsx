import React from 'react'
import { Trans } from 'react-i18next'
import Backpack from './Backpack'
import PropTypes from 'prop-types'

export default function Inventory (props) {
  const { weapons, adventuringGear, armour, storeHandler } = props
  return (
    <div className="inventory">
      <h3 className="header-default">
        <Trans i18nKey="inventory">Inventory</Trans>
      </h3>
      <div className="backpack-container">
        <Backpack
          itemType={'armour'}
          items={armour}
          storeHandler={storeHandler}
        ></Backpack>

        <Backpack
          itemType={'weapon'}
          items={weapons}
          storeHandler={storeHandler}
        ></Backpack>

        <Backpack
          itemType={'gear'}
          items={adventuringGear}
          storeHandler={storeHandler}
        ></Backpack>
      </div>
    </div>
  )
}

Inventory.propTypes = {
  weapons: PropTypes.arrayOf(PropTypes.string),
  adventuringGear: PropTypes.arrayOf(PropTypes.string),
  armour: PropTypes.arrayOf(PropTypes.string),
  storeHandler: PropTypes.func
}
