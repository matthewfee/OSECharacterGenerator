// generates the appropriate modifier for an ability value
import abilityScoreMods from '../data/abilityScoreMods'
import {
  abilityScoreNames,
  primeRequisiteModifiers,
  armourTypes
} from '../constants/constants'
import classOptionsData from '../data/classOptionsData'
import React from 'react'
import PropTypes from 'prop-types'

export const LinkText = ({ href, children }) => {
  return (
    <a href={href || ''} target="_blank" rel="noreferrer">
      {children}
    </a>
  )
}

LinkText.propTypes = {
  href: PropTypes.string,
  children: PropTypes.array
}

export const getModValue = (abilityScoreName, abilityScore) => {
  let newAbilityModifiers = {}

  switch (abilityScoreName) {
    case 'strength':
      newAbilityModifiers = {
        strengthModMelee: abilityScoreMods.abilityMod[abilityScore],
        strengthModDoors: abilityScoreMods.openDoors[abilityScore]
      }
      break
    case 'intelligence':
      newAbilityModifiers = {
        intelligenceModLanguages:
          abilityScoreMods.spokenLanguages[abilityScore],
        intelligenceModLiteracy: abilityScoreMods.literacy[abilityScore],
        intelligenceModExtraLanguageCount:
          abilityScoreMods.extraLanguageCount[abilityScore]
      }
      break
    case 'dexterity':
      newAbilityModifiers = {
        dexterityModAC: abilityScoreMods.abilityMod[abilityScore],
        dexterityModMissiles: abilityScoreMods.abilityMod[abilityScore],
        dexterityModInitiative: abilityScoreMods.initiative[abilityScore]
      }
      break
    case 'wisdom':
      newAbilityModifiers = {
        wisdomMod: abilityScoreMods.abilityMod[abilityScore]
      }
      break
    case 'constitution':
      newAbilityModifiers = {
        constitutionMod: abilityScoreMods.abilityMod[abilityScore]
      }
      break
    case 'charisma':
      newAbilityModifiers = {
        charismaModNPCReactions: abilityScoreMods.npcReactions[abilityScore],
        charismaModRetainersMax: abilityScoreMods.retainersMax[abilityScore],
        charismaModLoyalty: abilityScoreMods.loyalty[abilityScore]
      }
      break
  }

  return newAbilityModifiers
}

export const updateAbilityModifiers = (abilityScoreValues) => {
  // updates all ability modifiers and returns an object containing the updates
  const abilityModifiers = {}

  abilityScoreNames.forEach((abilityScoreName) => {
    const value = abilityScoreValues[abilityScoreName]
    const newModifiers = getModValue(abilityScoreName, value)

    for (const key in newModifiers) {
      abilityModifiers[key] = newModifiers[key]
    }
  })

  return abilityModifiers



}


export const getPrimeReqMod = (abilityScoreValues, characterClass) => {
  // generates the correct prime req by matching a class to a prime requisite

  const firstAbilityName = characterClass.primeReqs[0]
  const firstAbilityScoreValue = abilityScoreValues[firstAbilityName]

  let primeReqPercentage = 0

  // if class has only one prime requisite, we use the standard calculation

  if (characterClass.primeReqs.length === 1) {
    const primeReqValue = primeRequisiteModifiers[firstAbilityScoreValue]
    primeReqPercentage = primeReqValue
  }

  // if class has more than one prime requisite, then we need to check the specific class rules for calculating

  if (characterClass.primeReqs.length > 1) {
    const secondAbilityName = characterClass.primeReqs[1]
    const secondAbilityScoreValue = abilityScoreValues[secondAbilityName]

    // find data object to match class

    const characterClassData = classOptionsData.find((item) => {
      return item.name === characterClass.name
    })

    primeReqPercentage = characterClassData.checkPrimeReqRequirements(
      firstAbilityScoreValue,
      secondAbilityScoreValue
    )
  }

  if (!primeReqPercentage) {
    primeReqPercentage = '0'
  }

  primeReqPercentage = primeReqPercentage + '%'

  return primeReqPercentage
}

export const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const d = (howMany, sides) => {
  let total = 0
  let i
  for (i = 0; i < howMany; i++) {
    total += getRndInteger(1, sides)
  }
  return total
}

export const chooseRandomItem = (array) => {
  return array[Math.floor(Math.random() * array.length)]
}

export const d6 = (howMany, randomNumbersArray) => {
  // uses default JS random number seed if randomNumber API doesn't load correctly

  if (randomNumbersArray.length < 2) {
    return d(3, 6)
  }

  let sum = 0

  for (let i = 0; i < howMany; i++) {
    sum = sum + chooseRandomItem(randomNumbersArray)
  }

  return sum
}

export const getWeightedValue = (weightedList, diceResult, listLength) => {
  for (let i = diceResult; i <= listLength; i++) {
    if (Object.prototype.hasOwnProperty.call(weightedList, i)) {
      return weightedList[i]
    }
  }
}

export const joinDuplicates = (array) => {
  const stuff = {}
  for (let i = 0; i < array.length; i++) {
    if (Object.prototype.hasOwnProperty.call(stuff, array[i])) {
      stuff[array[i]] += 1
    } else {
      stuff[array[i]] = 1
    }
  }
  const consolidated = []
  const keys = Object.keys(stuff)
  for (const key of keys) {
    if (stuff[key] > 1) {
      consolidated.push(`${key} (x${stuff[key]})`)
    } else {
      consolidated.push(key)
    }
  }

  return consolidated
}

export const calculateArmourClass = (dexMod, armour) => {
  let baseArmour = 10
  let armourClass = baseArmour

  if (dexMod.includes('+')) {
    dexMod = dexMod.substring(1)
  }
  dexMod = parseInt(dexMod)
  baseArmour += dexMod

  if (!armour) {
    return [baseArmour, armourClass]
  }

  if (armour.includes(armourTypes.leather)) {
    armourClass = baseArmour + 2
  }
  if (armour.includes(armourTypes.chainMail)) {
    armourClass = baseArmour + 4
  }
  if (armour.includes(armourTypes.plateMail)) {
    armourClass = baseArmour + 6
  }
  if (armour.includes(armourTypes.shield)) {
    armourClass += 1
  }

  return [baseArmour, armourClass]
}
