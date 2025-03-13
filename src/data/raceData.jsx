const races = {
    Drow:
    {
        modifiers: { CON: -1, DEX: +1 },
        languages: ["Alignment", "Common", "Deepcommon", "Elvish", "Gnomish"],
        traits: ["Detect Secret Doors", "Immunity to Ghoul Paralysis", "Infravision", "Innate Magic", "Light Sensitivity", "Listening at Doors"]
    },
    Duergar:
    {
        modifiers: { CON: +1, CHA: -1 },
        languages: ["Alignment", "Common", "Deepcommon", "Dwarvish", "Gnomish", "Goblin", "Kobold"],
        traits: ["Detect Construction Tricks", "Detect Room Traps", "Infravision", "Listening at Doors", "Resilience", "Stealth"]
    },
    Dwarf:
    {
        modifiers: { CON: +1, CHA: -1 },
        languages: ["Alignment", "Common", "Dwarvish", "Gnomish", "Goblin", "Kobold"],
        traits: ["Detect Construction Tricks", "Detect Room Traps", "Infravision", "Listening at Doors", "Resilience"]
    },
    Elf:
    {
        modifiers: { DEX: +1, CON: -1 },
        languages: ["Alignment", "Common", "Elvish", "Gnoll", "Hobgoblin", "Orcish"],
        traits: ["Detect Secret Doors", "Immunity to Ghoul Paralysis", "Infravision", "Listening at Doors"]
    },
    Gnome:
    {
        modifiers: { INT: +1, WIS: -1 },
        languages: ["Alignment", "Common", "Dwarvish", "Gnomish", "Kobold", "The secret language of burrowing mammals"],
        traits: ["Defensive Bonus", "Detect Construction Tricks", "Infravision", "Listening at Doors", "Magic Resistance", "Speak with Burrowing Mammals"]
    },
    "Half-Elf":
    {
        modifiers: {},
        languages: ["Alignment", "Common", "Elvish"],
        traits: ["Detect SecretDoors", "Infravision"]
    },
    Halfling:
    {
        modifiers: { DEX: +1, STR: -1 },
        languages: ["Alignment", "Common", "Halfling"],
        traits: ["Defensive Bonus", "Initiative Bonus (Optional Rule)", "Listening to Doors", "Missile Attack Bonus", "Resilience"]
    },
    "Half-Orc":
    {
        modifiers: { STR: +1, CON: +1, CHA: -2 },
        languages: ["Alignment", "Common", "Orcish"],
        traits: ["Infravision"]
    },
    Human:
    {
        modifiers: {},
        languages: ["Alignment", "Common"],
        traits: ["Racial Abilities"]
    },
    Svirfneblin:
    {
        modifiers: {},
        languages: ["Alignment", "Common", "Deepcommon", "Dwarvish", "Gnomish", "Kobold", "The language of earth elementals"],
        traits: ["Blend in Stone", "Defensive Bonus", "Detect Construction Tricks", "Infravision", "Light Sensitivity", "Listening at Doors", "Illusion Resistance", "Speak with Earth Elementals"]
    },
};