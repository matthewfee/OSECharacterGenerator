import create from 'zustand'
import produce from 'immer'
import { v4 as uuidv4 } from 'uuid'

const newID = uuidv4()

export const useCharacterStore = create((set) => ({
  id: newID,
  characterDetails: {
    name: null,
    languages: [],
    hasLanguages: null,
    personality: null,
    misfortune: null,
    appearance: null,
    backgroundSkill: null,
    alignment: null
  },
  abilityScores: {
    strength: null,
    strengthOriginal: null,
    intelligence: null,
    intelligenceOriginal: null,
    wisdom: null,
    wisdomOriginal: null,
    dexterity: null,
    dexterityOriginal: null,
    constitution: null,
    constitutionOriginal: null,
    charisma: null,
    charismaOriginal: null,
    pointBuy: 0,
    characterRolled: false
  },
  characterModifiers: {
    primeReq: '0',
    strengthModMelee: '0',
    strengthModDoors: '0',
    intelligenceModLanguages: '0',
    intelligenceModLiteracy: '',
    intelligenceModExtraLanguageCount: '0',
    wisdomMod: '0',
    dexterityModAC: '0',
    dexterityModMissiles: '0',
    dexterityModInitiative: '0',
    constitutionMod: '0',
    charismaModNPCReactions: '0',
    charismaModRetainersMax: '0',
    charismaModLoyalty: '0'
  },
  combatStatistics: {
    hitPoints: null,
    armourClass: null,
    spell: null,
    hasSpells: false,
    unarmouredAC: null
  },
  characterClass: {
    name: null,
    primeReqs: []
  },
  characterEquipment: {
    armour: [],
    weapons: [],
    adventuringGear: [],
    gold: null
  },

  setState: (state) => set(state),

  mergeState: (object) =>
    set(
      produce((state) => {
        const newState = { ...state, ...object }
        return newState
      })
    ),

  actions: {
    setCharacterDetails: (payload) =>
      set((state) => ({
        characterDetails: {
          ...state.characterDetails,
          ...payload
        }
      })),
    setAbilityScores: (payload) =>
      set((state) => ({
        abilityScores: {
          ...state.abilityScores,
          ...payload
        }
      })),
    setCharacterModifiers: (payload) =>
      set((state) => ({
        characterModifiers: {
          ...state.characterModifiers,
          ...payload
        }
      })),
    setCombatStatistics: (payload) =>
      set((state) => ({
        combatStatistics: {
          ...state.setCombatStatistics,
          ...payload
        }
      })),
    setCharacterClass: (payload) =>
      set((state) => ({
        characterClass: {
          ...state.characterClass,
          ...payload
        }
      })),
    setCharacterEquipment: (payload) =>
      set((state) => ({
        characterEquipment: {
          ...state.characterEquipment,
          ...payload
        }
      }))
  }
}))
