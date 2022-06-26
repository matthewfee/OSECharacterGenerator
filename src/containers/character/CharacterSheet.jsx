import React, { useState } from 'react'
import { joinDuplicates } from '../../utilities/utilities'
import PropTypes from 'prop-types'
import Button from '../../components/general/Button'
import AbilityScoreRowFields from '../../components/character/AbilityScoreRowFields'
import NumberInput from '../../components/character/NumberInput'
import { savingThrowNames } from '../../constants/constants'
import TextInput from '../../components/character/TextInput'

const CharacterSheet = React.forwardRef((props, ref) => {
  const {
    abilityScores,
    character,
    characterStatistics,
    characterClass,
    characterEquipment
    // characterModifiers
  } = props

  const [editMode, setEditMode] = useState(true)

  const alignmentCapitalized = character.alignment
    ? character.alignment.charAt(0).toUpperCase() + character.alignment.slice(1)
    : 'Alignment'

  const languageText = character.hasLanguages
    ? `${alignmentCapitalized}, Common, ${character.languages.join(', ')}`
    : `${alignmentCapitalized}, Common`

  const characterFields = [
    ['Background', character.background],
    ['Appearance', character.appearance],
    ['Personality', character.personality],
    ['Misfortune', character.misfortune],
    ['Languages', languageText]
  ]

  const getCharacterFields = () => {
    return characterFields.map((field) => {
      const fieldDescription = field[0]
      const fieldValue = field[1]

      return (
        <div
          key={fieldDescription}
          className={`character-container ${fieldValue}`}
        >
          <span className='charsheet-value-name'>{fieldDescription}</span>
          <span className='charsheet-value'>{fieldValue}</span>{' '}
        </div>
      )
    })
  }

  const toggleEditMode = () => {
    setEditMode((prevMode) => !prevMode)
  }

  return (
    <div ref={ref} className='character-sheet-component'>
      <h3 className='character--name'>{character.name}</h3>
      <h4 className='character--subheader'> Level 1 {characterClass.name}</h4>
      <Button callback={toggleEditMode}>Edit</Button>
      <div className='character-sheet'>
        <div className='character-top-container'>{getCharacterFields()}</div>
        <div className='ability-scores-container'>
          <AbilityScoreRowFields
            editMode={editMode}
            abilityScores={abilityScores}
          />
        </div>

        <div className='charsheet-saving-throws-container'>
          <div className='character-container'>
            <span className='charsheet-value-name'>Saving Throws</span>
            <div className='charsheet-value charsheet-value--saving-throws'>
              {characterClass.savingThrows.map((savingThrow, index) => {
                return (
                  <div
                    key={index}
                    className={`charactersheet--saving-throw-container`}
                  >
                    <div>{savingThrowNames[index]} </div>
                    <div>
                      <NumberInput
                        defaultValue={savingThrow}
                        editMode={editMode}
                        key={index}
                      ></NumberInput>
                      {/* {savingThrow} */}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className='character-container'>
            <span className='charsheet-value-name'>Abilities</span>
            <span className='charsheet-value character-sheet--class-ability'>
              <ul>
                {characterClass.abilities.map((item, index) => {
                  return (
                    <li key={index} className='character-sheet--class-ability'>
                      {item}
                    </li>
                  )
                })}
              </ul>
            </span>
          </div>

          {character.hasSpells && (
            <div className='character-container'>
              <span className='charsheet-value-name'>Spells</span>
              <span className='charsheet-value character-sheet--class-ability'>
                {character.spells}
              </span>
            </div>
          )}
        </div>

        <div className='character-sheet-ability-list'>
          <div className='hit-points character-container'>
            <span className='charsheet-value-name'>Hit Points</span>{' '}
            <span className='charsheet-value'>
              <NumberInput
                defaultValue={characterStatistics.hitPoints}
                editMode={editMode}
              ></NumberInput>
            </span>
          </div>
          <div className='armor-class character-container'>
            <span className='charsheet-value-name'>Armour Class</span>{' '}
            <span className='charsheet-value'>
              <NumberInput
                defaultValue={characterStatistics.armourClass}
                editMode={editMode}
              ></NumberInput>
            </span>
          </div>
          <div className='character-container'>
            <span className='charsheet-value-name'>Weapons</span>

            <div className='charsheet-value charsheet--weapons' contentEditable>
              {/* {joinDuplicates(characterEquipment.weapons).map((item, index) => {
                return (
                  <span key={index} className='charsheet--weapon-item'></span>
                )
              })} */}

              <TextInput
                defaultValue={`${joinDuplicates(
                  characterEquipment.weapons
                ).join(', ')}`}
                editMode={editMode}
              />
            </div>
          </div>

          <div className='character-container'>
            <span className='charsheet-value-name'>Armour</span>

            <div
              className='charsheet-value charsheet--armour'
              contentEditable={editMode}
            >
              {characterEquipment.armour.map((item, index) => {
                return (
                  <span key={index} className='charsheet--armour-item'>
                    {' '}
                    {item}{' '}
                  </span>
                )
              })}
            </div>
          </div>

          <div className='character-container'>
            <span className='charsheet-value-name'>Gear</span>

            <span className='charsheet-value charsheet--gear'>
              {joinDuplicates(characterEquipment.adventuringGear).map(
                (item, index) => {
                  return (
                    <span key={index} className='charsheet--gear-item'>
                      {item}
                    </span>
                  )
                }
              )}
            </span>
          </div>

          <div className='character-container'>
            <span className='charsheet-value-name'>Gold</span>

            <span className='charsheet-value charsheet--gold'>
              {characterEquipment.gold}gp
            </span>
          </div>
        </div>
      </div>
    </div>
  )
})

CharacterSheet.displayName = 'Character Sheet'

CharacterSheet.propTypes = {
  character: PropTypes.object,
  characterStatistics: PropTypes.shape({
    hitPoints: PropTypes.number,
    armourClass: PropTypes.number,
    spell: PropTypes.string,
    hasSpells: PropTypes.bool,
    unarmouredAC: PropTypes.number
  }),
  characterClass: PropTypes.object,
  characterEquipment: PropTypes.shape({
    armour: PropTypes.array,
    weapons: PropTypes.array,
    adventuringGear: PropTypes.array,
    gold: PropTypes.number
  }),
  characterModifiers: PropTypes.objectOf(PropTypes.string),
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
  }),
  setCharacterRolled: PropTypes.func
}

export default CharacterSheet
