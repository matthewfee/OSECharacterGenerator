const classOptionsData = [
  {
    name: "Fighter",
    requirements: null,
    primeReq: "Strength",
    hd: 8,
    maxLevel: 14,
    armour: "any",
    weapons: "any",
    languages: "Alignment, Common",
    description:
      "Fighters are adventurers dedicated to mastering the arts of combat and war. In a group of adventurers, the role of fighters is to battle monsters and to defend other characters.",
    savingThrows: [12, 13, 14, 15, 16],
    nextLevel: 2000,
    abilities: ["Stronghold"],
    link: "https://oldschoolessentials.necroticgnome.com/srd/index.php/Fighter",
    arcane: false,
    divine: false
  },
  {
    name: "Cleric",
    requirements: null,
    primeReq: "Wisdom",
    hd: 6,
    maxLevel: 14,
    armour: "any",
    weapons: "only blunt weapons",
    languages: "Alignment, Common",
    description:
      "Clerics are adventurers who have sworn to serve a deity. They are trained for battle and channel the power of their deity.",
    savingThrows: [11, 12, 14, 16, 15],
    nextLevel: 1500,
    abilities: ["Divine Magic", "Turn Undead"],
    link: "https://oldschoolessentials.necroticgnome.com/srd/index.php/Cleric",
    arcane: false,
    divine: true
  },
  {
    name: "Magic-User",
    requirements: null,
    primeReq: "Intelligence",
    hd: 4,
    maxLevel: 14,
    armour: "none",
    weapons: "dagger, staff",
    languages: "Alignment, Common",
    description:
      "Magic-users are adventurers whose study of arcane secrets has taught them how to cast spells. Magic-users are able to cast a greater number of increasingly powerful spells as they advance in level.",
    savingThrows: [13, 14, 13, 16, 15],
    nextLevel: 2500,
    abilities: ["Arcane Magic"],
    link:
      "https://oldschoolessentials.necroticgnome.com/srd/index.php/Magic-User",
    arcane: true,
    divine: false
  },
  {
    name: "Thief",
    requirements: null,
    primeReq: "Dexterity",
    hd: 4,
    maxLevel: 0,
    armour: "leather, no shields",
    weapons: "any",
    languages: "alignment, common",
    description:
      "Thieves are adventurers who live by their skills of deception and stealth. Their range of unique skills makes them very handy companions in adventures. However, thieves are not always to be trusted.",
    savingThrows: [13, 14, 13, 16, 15],
    nextLevel: 1200,
    abilities: ["Backstab", "Thief Skills"],
    link: "https://oldschoolessentials.necroticgnome.com/srd/index.php/Thief",
    arcane: false,
    divine: false
  },
  {
    name: "Dwarf",
    requirements: "Minimum CON 9",
    primeReq: "Strength",
    hd: 8,
    maxLevel: 12,
    armour: "any",
    weapons:
      "any small or normal sized, but cannot use longbows or two-handed swords",
    languages: " Alignment, Common, Dwarvish, Gnomish, Goblin, Kobold",
    description:
      "Dwarves are stout, bearded demihumans, about 4’ tall and weighing about 150 pounds. Dwarves typically live underground and love fine craftsmanship, gold, hearty food, and strong drink. They have skin, hair, and eye colours in earth tones. Dwarves are known for their stubbornness and practicality. They are a hardy people and have a strong resistance to magic, as reflected in their saving throws.",
    savingThrows: [8, 9, 10, 13, 12],
    nextLevel: 2200,
    abilities: [
      "Detect Construction",
      "Detect Room Traps",
      "Infravision",
      "Listening at Doors"
    ],
    link: "https://oldschoolessentials.necroticgnome.com/srd/index.php/Dwarf",
    arcane: false,
    divine: false
  },
  {
    name: "Elf",
    requirements: "Minimum INT 9",
    primeReq: "Intelligence, Strength",
    hd: 6,
    maxLevel: 10,
    armour: "any",
    weapons: "any",
    languages: "Alignment, Common, Elvish, Gnoll, Hobgoblin, Orcish",
    description:
      "Elves are slender, fey demihumans with pointed ears. They typically weigh about 120 pounds and are between 5 and 5½ feet tall. Elves are seldom met in human settlements, preferring to feast and make merry in the woods. If crossed, they are dangerous enemies, as they are masters of both sword and spell. Elves are fascinated by spells and beautifully constructed magic items and love to collect both.",
    savingThrows: [12, 13, 13, 15, 15],
    nextLevel: 4000,
    abilities: [
      "Arcane Magic",
      "Detect Secret Doors",
      "Infravision",
      "Listening at Doors"
    ],
    link: "https://oldschoolessentials.necroticgnome.com/srd/index.php/Elf",
    arcane: true,
    divine: false
  },
  {
    name: "Halfling",
    requirements: "Minimum CON 9, minimum DEX 9",
    primeReq: "Dexterity, Strength",
    hd: 6,
    maxLevel: 8,
    armour: "any appropriate to size",
    weapons: "any appropriate to size",
    languages: "Alignment, Common, Halfling",
    description:
      "Halflings are small, rotund demihumans with furry feet and curly hair. They weigh about 60 pounds and are around 3’ tall. Halflings are a friendly and welcoming folk. Above all, they love the comforts of home and are not known for their bravery. Halflings who gain treasure through adventuring will often use their wealth in pursuit of a quiet, comfortable life.",
    savingThrows: [8, 9, 10, 13, 12],
    nextLevel: 2000,
    abilities: [
      "Defensive Bonus",
      "Hiding",
      "Listening at Doors",
      "Missile Attack Bonus"
    ],
    link:
      "https://oldschoolessentials.necroticgnome.com/srd/index.php/Halfling",
    arcane: false,
    divine: false
  }
];

export default classOptionsData;
