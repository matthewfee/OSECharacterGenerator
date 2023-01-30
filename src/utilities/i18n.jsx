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
          AppName: 'Old-School Character Generator',
          Roll: 'Roll',
          Tavern: 'Tavern',
          Footer: 'Old-School Character Generator is an independent open-source project by <0>EvilTables</0> & <1>contributors</1> and is not affiliated with <2>Necrotic Gnome</2>. Permission to include additional classes from Advanced Fantasy and Carcass Crawler granted by <2>Necrotic Gnome</2> & <3>James Maliszewski</3>. Old-School Essentials is a trademark of <2>Necrotic Gnome</2>. The trademark and Old-School Essentials logo are used with permission of <2>Necrotic Gnome</2>, under license.',
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
          AppName: 'Old-School Charaktergenerator',
          Roll: 'Würfeln',
          Tavern: 'Taverne',
          Footer: 'Old-School Charaktergenerator ist ein unabhängiges Open-Source-Projekt von <0>EvilTables</0> & <1>Mitwirkenden</1> und steht in keiner Verbindung zu <2>Necrotic Gnome</2>. Die Erlaubnis zur Aufnahme weiterer Klassen aus Advanced Fantasy und Carcass Crawler wurde von <2>Necrotic Gnome</2> & <3>James Maliszewski</3> erteilt. Old-School Essentials ist ein Warenzeichen von <2>Necrotic Gnome</2>. Die Marke und das Old-School Essentials Logo werden mit Genehmigung von <2>Necrotic Gnome</2> unter Lizenz verwendet.',
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
