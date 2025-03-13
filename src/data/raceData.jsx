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
        languages: ["Alignment", "Common", "Deepcommon"],
        traits: ["Detect Construction Tricks", "Detect Room Traps", "Infravision", "Listening at Doors", "Resilience", "Stealth"]
    },
    Dwarf:
    {
        modifiers: { CON: +1, CHA: -1 },
        traits: ["Detect Construction Tricks", "Detect Room Traps", "Infravision", "Listening at Doors", "Resilience"]
    },
    Elf:
    {
        modifiers: { DEX: +1, CON: -1 },
        traits: ["Detect Secret Doors", "Immunity to Ghoul Paralysis", "Infravision", "Listening at Doors"]
    },
    Gnome:
    {
        modifiers: { INT: +1, WIS: -1 },
        traits: []
    },
    "Half-Elf": { modifiers: { CHA: +1 }, traits: ["Infravision", "Versatility"] },
    Halfling: { modifiers: { DEX: +1, STR: -1 }, traits: ["Lucky", "Stealthy"] },
    "Half-Orc": { modifiers: { STR: +1, INT: -1 }, traits: ["Infravision", "Savage Attacks"] },
    Human: { modifiers: {}, traits: ["Adaptability"] },
    Svirfneblin: { modifiers: { DEX: +1, CHA: -1 }, traits: ["Infravision", "Magic Resistance"] },
};