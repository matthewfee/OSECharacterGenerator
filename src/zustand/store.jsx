import create from 'zustand'

export const useCharacterStore = create((set) => ({
  id: 1,
  characterDetails: {
    name: null,
    languages: [],
    hasLanguages: null,
    personality: null,
    misfortune: null,
    appearance: null,
    backgroundSkill: null,
    alignment: null,
    actions: {
      incrementID: () =>
        set((state) => ({
          characterDetails: {
            ...state.characterDetails,
            id: state.characterDetails.id + 1
          }
        })),
      setID: (id) =>
        set((state) => ({
          characterDetails: {
            ...state.characterDetails,
            id: id
          }
        }))
    }
  },
  incrementID: () =>
    set((state) => ({
      id: state.id + 1
    })),
  setState: (state) => set(state)
}))
