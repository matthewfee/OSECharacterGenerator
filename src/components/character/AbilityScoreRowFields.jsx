import React from 'react'
import { abilityScoreNames } from '../../constants/constants'
import { Trans } from 'react-i18next'
import NumberInput from '../../components/character/NumberInput'
import PropTypes from 'prop-types'

const AbilityScoreRowFields = ({ editMode, abilityScores }) => {
  return abilityScoreNames.map((abilityScoreName, index) => {
    return (
      <div className={`character-container`} key={index}>
        <span className='charsheet-value-name'>
          <Trans
            i18nKey={`abilityScoreNames.${abilityScoreName.toLowerCase()}`}
          >
            {abilityScoreName}
          </Trans>
        </span>
        <span className='charsheet-value'>
          <NumberInput
            defaultValue={abilityScores[abilityScoreName.toLowerCase()]}
            editMode={editMode}
          />
        </span>
      </div>
    )
  })
}

export default AbilityScoreRowFields

AbilityScoreRowFields.propTypes = {
  editMode: PropTypes.bool,
  abilityScores: PropTypes.shape({
    strength: PropTypes.number,
    strengthOriginal: PropTypes.number,
    intelligence: PropTypes.number,
    intelligenceOriginal: PropTypes.number,
    wisdom: PropTypes.number,
    wisdomOriginal: PropTypes.number,
    dexterity: PropTypes.number,
    dexterityOriginal: PropTypes.number,
    constitution: PropTypes.number,
    constitutionOriginal: PropTypes.number,
    charisma: PropTypes.number,
    charismaOriginal: PropTypes.number
  })
}
