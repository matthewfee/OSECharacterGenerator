import React, { useState, useEffect } from 'react'
import { characterBackgrounds } from '../../data/backgrounds'
import {
  getWeightedValue,
  chooseRandomItem,
  d
} from '../../utilities/utilities'
import PropTypes from 'prop-types'
import { Dice } from '../../utilities/DiceBox'
import { isMobile } from 'react-device-detect'
import Button from '../../components/general/Button'
import {
  firstNames,
  lastNames,
  appearances,
  traits,
  misfortunes,
  languageOptions
} from '../../constants/constants'
import DetailsResult from '../../components/details/DetailsResult'

export default function CharacterDetails(props) {
  const {
    screen,
    setScreen,
    character,
    setCharacter,
    characterClass,
    characterModifiers,
    diceEnabled
  } = props

  const [characterName, setCharacterName] = useState('')
  const [alignment, setAlignment] = useState('')
  const [appearance, setAppearance] = useState('')
  const [personality, setPersonality] = useState('')
  const [background, setBackground] = useState('')
  const [misfortune, setMisfortune] = useState('')
  const [languages, setLanguages] = useState([])
  const [languageSelected, setLanguageSelected] = useState('')
  const [languageCount, setLanguageCount] = useState()
  const [classLanguageCount, setClassLanguageCount] = useState(0)
  const [hasLanguages, setHasLanguages] = useState(true)

  useEffect(() => {
    const languagesArr = characterClass.languages.split(',')

    if (languagesArr.length <= 2) {
      if (characterModifiers.intelligenceModExtraLanguageCount < 1) {
        setHasLanguages(false)
      }
    } else {
      // first two langauges are not class-specific languages
      const classLanguageNumber = languagesArr.length - 2
      setClassLanguageCount(classLanguageNumber)
      setLanguages(languagesArr)
    }
  }, [])

  useEffect(() => {
    setLanguageCount(
      characterModifiers.extraLanguageCount +
        classLanguageCount -
        characterClass.languages.length
    )
  }, [languages])

  const handleName = (event) => {
    setCharacterName(event.currentTarget.value)
  }

  const handleAlignment = (event) => {
    setAlignment(event.currentTarget.value)
  }

  const getName = () => {
    const fullName = `${chooseRandomItem(firstNames)} ${chooseRandomItem(
      lastNames
    )}`

    setCharacterName(fullName)
  }

  const getAppearance = () => {
    let appearanceArray = [...appearances]
    const num = 2
    const selectedAppearances = []
    for (let i = 0; i < num; i++) {
      const randomAppearance = chooseRandomItem(appearanceArray)
      selectedAppearances.push(randomAppearance)
      appearanceArray = appearanceArray.filter((k) => k !== randomAppearance)
    }

    setAppearance(selectedAppearances.join(', '))
  }

  const getBackground = () => {
    const listLength = 100

    if (isMobile || !diceEnabled) {
      let diceResult = d(1, 100)
      let diceResult2 = d(1, 100)
      let background = getWeightedValue(characterBackgrounds, diceResult, 100)

      while (background?.includes('Roll for two skills')) {
        diceResult = d(1, 100)
        diceResult2 = d(1, 100)

        background = `${getWeightedValue(
          characterBackgrounds,
          diceResult,
          100
        )}, ${getWeightedValue(characterBackgrounds, diceResult2, 100)}`
      }

      setBackground(background)
      return
    }

    if (!background.includes('Roll for two skills')) {
      Dice.show()
        .roll('1d100')
        .then((result) => {
          const value = result[0].value

          if (isNaN(value)) {
            throw new Error('Dice result was not a number')
          }

          const newBackground = getWeightedValue(
            characterBackgrounds,
            value,
            listLength
          )
          setBackground(newBackground)
        })
    }

    if (background.includes('Roll for two skills')) {
      Dice.show()
        .roll(['1d100', '1d100'])
        .then((result) => {
          const newBackground1 = getWeightedValue(
            characterBackgrounds,
            result[0].value,
            listLength
          )
          const newBackground2 = getWeightedValue(
            characterBackgrounds,
            result[1].value,
            listLength
          )
          const newBackgrounds = `${newBackground1}, ${newBackground2}`
          setBackground(newBackgrounds)
        })
    }
  }

  const getPersonality = () => {
    const num = 2
    const selectedPersonalities = []
    for (let i = 0; i < num; i++) {
      const randomTrait = chooseRandomItem(traits)
      selectedPersonalities.push(randomTrait)
    }

    setPersonality(selectedPersonalities.join(', '))
  }

  const getMisfortune = () => {
    const randomMisfortune = chooseRandomItem(misfortunes)
    setMisfortune(randomMisfortune)
  }

  const languageOption = (item) => {
    return (
      <option key={item} value={item}>
        {item}
      </option>
    )
  }

  const languagesList = () => {
    return languageOptions.map((item) => {
      return languageOption(item)
    })
  }

  const chooseLanguage = () => {
    setLanguageSelected(chooseRandomItem(languageOption))
  }

  const handleLanguageChange = (event) => {
    setLanguageSelected(event.target.value)
  }

  const addLanguage = () => {
    if (languages.includes(languageSelected) || languageSelected === '') {
      return
    }
    setLanguages((oldArray) => [...oldArray, languageSelected])
  }

  return (
    <React.Fragment>
      <div className='character-details-form'>
        <label className='form-label form-label--name'>
          <div className='form-text'>Choose Name:</div>
          <input
            className='form-input'
            type='text'
            value={characterName}
            onChange={handleName}
          />
          <button
            className='button button--random-name'
            onClick={getName}
            type='button'
          >
            Random Name
          </button>
        </label>

        <div className='form-label form-label--alignment'>
          <div className='form-text'>Select Alignment:</div>

          <div className='alignment-button-container'>
            <button
              type='button'
              value='lawful'
              className={
                alignment === 'lawful'
                  ? 'button button--alignment button--alignment--selected'
                  : 'button button--alignment'
              }
              onClick={(e) => handleAlignment(e, 'value')}
            >
              Lawful
            </button>
            <button
              type='button'
              value='neutral'
              className={
                alignment === 'neutral'
                  ? 'button button--alignment button--alignment--selected'
                  : 'button button--alignment'
              }
              onClick={(e) => handleAlignment(e, 'value')}
            >
              Neutral
            </button>
            <button
              type='button'
              value='chaotic'
              className={
                alignment === 'chaotic'
                  ? 'button button--alignment button--alignment--selected'
                  : 'button button--alignment'
              }
              onClick={(e) => handleAlignment(e, 'value')}
            >
              Chaotic
            </button>
          </div>
        </div>

        <div className='form-label form-label--languages'>
          <div className='form-text'>
            {languageCount > 0
              ? `Additional Languages (${languageCount}):`
              : 'Languages:'}{' '}
          </div>

          <div className='language-container'>
            {`${alignment || 'Alignment'}, Common${
              languages.length > 0 ? ', ' + languages.join(', ') : ''
            }`}
          </div>

          {languageCount > 0 && (
            <div className='language-select-container'>
              <select
                className='spells-select'
                value={languageSelected}
                onChange={handleLanguageChange}
              >
                <option value='' disabled>
                  Select Language
                </option>
                {languagesList()}
              </select>
              <button
                className='button--random-language'
                onClick={() => chooseLanguage()}
              >
                Random
              </button>
              <button
                className='button--add-language'
                onClick={() => addLanguage()}
              >
                Add
              </button>
            </div>
          )}
        </div>

        <div className='form-label form-label--optional-details'>
          <div type='button' className='form-text'>
            Optional Details
          </div>

          {!background && (
            <Button name='optional-details' callback={getBackground}>
              Background (d100)
            </Button>
          )}

          {background && (
            <DetailsResult
              name='Background Skill'
              value={background}
              callback={getBackground}
            ></DetailsResult>
          )}

          {!appearance && (
            <Button name='optional-details' callback={getAppearance}>
              Appearance
            </Button>
          )}

          {appearance && (
            <DetailsResult
              name='Appearance'
              value={appearance}
              callback={getAppearance}
            ></DetailsResult>
          )}

          {!personality && (
            <Button name='optional-details' callback={getPersonality}>
              Personality
            </Button>
          )}

          {personality && (
            <DetailsResult
              name='Personality'
              value={personality}
              callback={getPersonality}
            ></DetailsResult>
          )}

          {!misfortune && (
            <Button name='optional-details' callback={getMisfortune}>
              Misfortune
            </Button>
          )}

          {misfortune && (
            <DetailsResult
              name='Misfortune'
              value={misfortune}
              callback={getMisfortune}
            ></DetailsResult>
          )}
        </div>
      </div>

      <Button
        name={'character-sheet'}
        callback={() => {
          setCharacter({
            ...character,
            name: characterName,
            alignment,
            appearance,
            background,
            personality,
            misfortune,
            languages,
            hasLanguages
          })

          setScreen({
            ...screen,
            detailsScreen: false,
            characterSheetScreen: true
          })
        }}
      >
        Go to Character Sheet
      </Button>
    </React.Fragment>
  )
}

CharacterDetails.propTypes = {
  diceEnabled: PropTypes.bool,
  screen: PropTypes.objectOf(PropTypes.bool),
  setScreen: PropTypes.func,
  character: PropTypes.object,
  setCharacter: PropTypes.func,
  characterClass: PropTypes.object,
  characterModifiers: PropTypes.objectOf(PropTypes.string)
}
