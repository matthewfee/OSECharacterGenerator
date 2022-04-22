import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    },
    resources: {
      en: {
        translation: {
          AppName: "Old School Essentials Character Generator",
          Roll: "Roll",
          Tavern: "Tavern",
          AppDescription:
            "Designed for use with <0>Old School Essentials</0>. OSE Advanced Fantasy classes included with the permission of Necrotic Gnome.  All dice values are generated from <1>RANDOM.ORG</1>.",
          CreatedBy: "<0>Created by EvilTables</0>"
        }
      },
      de: {
        translation: {
          AppName: "Old School Essentials Charaktergenerator",
          Roll: "Würfeln",
          Tavern: "Taverne",
          AppDescription:
            "Entwickelt für die Verwendung mit <0>Old School Essentials</0>. OSE Advanced Fantasy-Klassen enthalten mit Genehmigung von Necrotic Gnome. Alle Würfelwerte werden von <1>RANDOM.ORG generiert</1>.",
          CreatedBy: "<0>Erstellt von EvilTables</0>"
        }
      }
    }
  });

export default i18n;
