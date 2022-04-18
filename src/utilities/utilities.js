//generates the appropriate modifier for an ability value
import abilityScoreMods from "../data/abilityScoreMods";
import {
  abilityScoreNames,
  primeRequisiteModifiers
} from "../constants/constants";

export const getModValue = (abilityScoreName, abilityScore) => {
  let newAbilityModifiers = {};

  switch (abilityScoreName) {
    case "strength":
      newAbilityModifiers = {
        strengthModMelee: abilityScoreMods.abilityMod[abilityScore],
        strengthModDoors: abilityScoreMods.openDoors[abilityScore]
      };
      break;
    case "intelligence":
      newAbilityModifiers = {
        intelligenceModLanguages:
          abilityScoreMods.spokenLanguages[abilityScore],
        intelligenceModLiteracy: abilityScoreMods.literacy[abilityScore],
        intelligenceModExtraLanguageCount:
          abilityScoreMods.extraLanguageCount[abilityScore]
      };
      break;
    case "dexterity":
      newAbilityModifiers = {
        dexterityModAC: abilityScoreMods.abilityMod[abilityScore],
        dexterityModMissiles: abilityScoreMods.abilityMod[abilityScore],
        dexterityModInitiative: abilityScoreMods.initiative[abilityScore]
      };
      break;
    case "wisdom":
      newAbilityModifiers = {
        wisdomMod: abilityScoreMods.abilityMod[abilityScore]
      };
      break;
    case "constitution":
      newAbilityModifiers = {
        constitutionMod: abilityScoreMods.abilityMod[abilityScore]
      };
      break;
    case "charisma":
      newAbilityModifiers = {
        charismaModNPCReactions: abilityScoreMods.npcReactions[abilityScore],
        charismaModRetainersMax: abilityScoreMods.retainersMax[abilityScore],
        charismaModLoyalty: abilityScoreMods.loyalty[abilityScore]
      };
      break;
  }

  return newAbilityModifiers;
};

export const updateAbilityModifiers = abilityScoreValues => {
  // updates all ability modifiers and returns an object containing the updates
  let abilityModifiers = {};

  abilityScoreNames.forEach(abilityScoreName => {
    const value = abilityScoreValues[abilityScoreName];
    const newModifiers = getModValue(abilityScoreName, value);

    for (const key in newModifiers) {
      abilityModifiers[key] = newModifiers[key];
    }
  });

  return abilityModifiers;
};

export const getPrimeReqMod = (abilityScoreValues, characterClass) => {
  //generates the correct prime req by matching a class to a prime requisite

  const firstAbilityName = characterClass.primeReqs[0];
  const firstAbilityScoreValue = abilityScoreValues[firstAbilityName];

  let primeReqPercentage = 0;

  //if class has only one prime requisite, we use the standard calculation

  if (characterClass.primeReqs.length === 1) {
    const primeReqValue = primeRequisiteModifiers[firstAbilityScoreValue];
    primeReqPercentage = primeReqValue;
  }

  //if class has more than one prime requisite, then we need to check the specific class rules for calculating

  if (characterClass.primeReqs.length > 1) {
    const secondAbilityName = characterClass.primeReqs[1];
    const secondAbilityScoreValue = abilityScoreValues[secondAbilityName];

    primeReqPercentage = characterClass.checkPrimeReqRequirements(
      firstAbilityScoreValue,
      secondAbilityScoreValue
    );
  }

  primeReqPercentage = primeReqPercentage + "%";

  return primeReqPercentage;
};

export const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const d = (how_many, sides) => {
  let total = 0;
  let i;
  for (i = 0; i < how_many; i++) {
    total += getRndInteger(1, sides);
  }
  return total;
};

export const chooseRandomItem = array => {
  return array[Math.floor(Math.random() * array.length)];
};

export const d6 = (howMany, randomNumbersArray) => {
  //uses default JS random number seed if randomNumber API doesn't load correctly

  if (randomNumbersArray.length < 2) {
    return d(3, 6);
  }

  let sum = 0;

  for (let i = 0; i < howMany; i++) {
    sum = sum + chooseRandomItem(randomNumbersArray);
  }

  return sum;
};

export const joinDuplicates = array => {
  let stuff = {};
  for (let i = 0; i < array.length; i++) {
    if (stuff.hasOwnProperty(array[i])) {
      stuff[array[i]] += 1;
    } else {
      stuff[array[i]] = 1;
    }
  }
  let consolidated = [];
  const keys = Object.keys(stuff);
  for (const key of keys) {
    if (stuff[key] > 1) {
      consolidated.push(`${key} (x${stuff[key]})`);
    } else {
      consolidated.push(key);
    }
  }

  return consolidated;
};
