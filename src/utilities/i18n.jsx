import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    resources: {
      en: {
        translation: {
          AppName: 'OSE Character Generator',
          Roll: 'Roll',
          Tavern: 'Tavern',
          AppDescription:
            'Designed for use with <0>Old School Essentials</0>. Advanced Fantasy classes included with the permission of Necrotic Gnome.',
          CreatedBy: '<0>Created by EvilTables</0>',
          abilityScoreNames: {
            strength: 'Strength',
            intelligence: 'Intelligence',
            dexterity: 'Dexterity',
            wisdom: 'Wisdom',
            constitution: 'Constitution',
            charisma: 'Charisma'
          },
          abilityScores: 'Ability Scores',
          characterClass: 'Character Class',
          classOptions: 'Class Options',
          equipment: 'Equipment',
          inventory: 'Inventory',
          characterDetails: 'Character Details',
          characterSheet: 'Character Sheet',
          mainPage: 'Main Page',
          start: 'Start'
        }
      },
      de: {
        translation: {
          AppName: 'OSE Charaktergenerator',
          Roll: 'Würfeln',
          Tavern: 'Taverne',
          AppDescription:
            'Entwickelt für die Verwendung mit <0>Old School Essentials</0>. OSE Advanced Fantasy-Klassen enthalten mit Genehmigung von Necrotic Gnome.',
          CreatedBy: '<0>Erstellt von EvilTables</0>',
          abilityScoreNames: {
            strength: 'Stärke',
            intelligence: 'Intelligenz',
            dexterity: 'Geschicklichkeit',
            wisdom: 'Weisheit',
            constitution: 'Konstitution',
            charisma: 'Charisma'
          },
          abilityScores: 'Eigenschaften',
          characterClass: 'Charakterklasse',
          classOptions: 'Klassenoptionen',
          equipment: 'Ausrüstung',
          inventory: 'Inventar',
          characterDetails: 'Charakterdetails',
          characterSheet: 'Charakterbogen',
          mainPage: 'Startseite',
          start: 'Anfang'
        }
      }
    }
  })

export default i18n
