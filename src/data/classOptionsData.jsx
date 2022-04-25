const classOptionsData = [
  {
    name: "Fighter",
    category: "basic",
    requirements: null,
    primeReqs: ["strength"],
    multiplePrimeReqs: false,
    hd: 8,
    maxLevel: 14,
    armour: "Any leather, chainmail, plate, shields",
    weapons: "any",
    languages: "Alignment, Common",
    description:
      "Fighters are adventurers dedicated to mastering the arts of combat and war. In a group of adventurers, the role of fighters is to battle monsters and to defend other characters.",
    savingThrows: [12, 13, 14, 15, 16],
    nextLevel: 2000,
    abilities: ["Stronghold"],
    link: "https://oldschoolessentials.necroticgnome.com/srd/index.php/Fighter",
    arcane: false,
    divine: false,
  },
  {
    name: "Cleric",
    category: "basic",
    requirements: null,
    primeReqs: ["wisdom"],
    multiplePrimeReqs: false,
    hd: 6,
    maxLevel: 14,
    armour: "any leather, chainmail, plate, shields",
    weapons: "only blunt weapons",
    languages: "Alignment, Common",
    description:
      "Clerics are adventurers who have sworn to serve a deity. They are trained for battle and channel the power of their deity.",
    savingThrows: [11, 12, 14, 16, 15],
    nextLevel: 1500,
    abilities: ["Divine Magic", "Turning the Undead"],
    link: "https://oldschoolessentials.necroticgnome.com/srd/index.php/Cleric",
    arcane: false,
    divine: true,
  },
  {
    name: "Magic-User",
    category: "basic",
    requirements: null,
    primeReqs: ["intelligence"],
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
    link: "https://oldschoolessentials.necroticgnome.com/srd/index.php/Magic-User",
    arcane: true,
    arcaneSpells: true,
    divine: false,
  },
  {
    name: "Thief",
    category: "basic",
    requirements: null,
    primeReqs: ["dexterity"],
    hd: 4,
    maxLevel: 0,
    armour: "leather",
    weapons: "any",
    languages: "alignment, common",
    description:
      "Thieves are adventurers who live by their skills of deception and stealth. Their range of unique skills makes them very handy companions in adventures. However, thieves are not always to be trusted.",
    savingThrows: [13, 14, 13, 16, 15],
    nextLevel: 1200,
    abilities: [
      "Backstab",
      "Thief Skills (climb sheer surfaces, find or remove treasure traps, hear noise, hide in shadows, move silently, open locks, pick pockets)",
      "Read Lanuages (level 4)",
      "Scroll Use (level 10)",
    ],
    link: "https://oldschoolessentials.necroticgnome.com/srd/index.php/Thief",
    arcane: false,
    divine: false,
  },
  {
    name: "Dwarf",
    category: "basic",
    requirements: "Minimum 9 constitution ",
    primeReqs: ["strength"],
    hd: 8,
    maxLevel: 12,
    armour: "any leather, chainmail, plate, shields",
    weapons:
      "any small or normal sized, but cannot use longbows or two-handed swords",
    languages: "Alignment, Common, Dwarvish, Gnomish, Goblin, Kobold",
    description:
      "Dwarves are stout, bearded demihumans, about 4’ tall and weighing about 150 pounds. Dwarves typically live underground and love fine craftsmanship, gold, hearty food, and strong drink. They have skin, hair, and eye colours in earth tones. Dwarves are known for their stubbornness and practicality. They are a hardy people and have a strong resistance to magic, as reflected in their saving throws.",
    savingThrows: [8, 9, 10, 13, 12],
    nextLevel: 2200,
    abilities: [
      "Detect Construction Tricks",
      "Detect Room Traps",
      "Infravision",
      "Listening at Doors",
    ],
    link: "https://oldschoolessentials.necroticgnome.com/srd/index.php/Dwarf",
    arcane: false,
    divine: false,
  },
  {
    name: "Elf",
    category: "basic",
    requirements: "Minimum 9 intelligence",
    primeReqs: ["intelligence", "strength"],
    checkPrimeReqRequirements: function (abilityScore1, abilityScore2) {
      if (abilityScore1 >= 16 && abilityScore2 >= 13) {
        return 10
      }

      if (abilityScore1 >= 13 && abilityScore2 >= 13) {
        return 5
      }

      return 0
    },
    hd: 6,
    maxLevel: 10,
    armour: "any leather, chainmail, plate, shields",
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
      "Listening at Doors",
      "Immunity to Ghoul Paralysis",
    ],
    link: "https://oldschoolessentials.necroticgnome.com/srd/index.php/Elf",
    arcane: true,
    arcaneSpells: true,
    divine: false,
  },
  {
    name: "Halfling",
    category: "basic",
    requirements: "Minimum 9 constitution, minimum 9 dexterity",
    primeReqs: ["dexterity", "strength"],
    checkPrimeReqRequirements: function (abilityScore1, abilityScore2) {
      if (abilityScore1 >= 13 && abilityScore2 >= 13) {
        return 10
      }

      if (abilityScore1 >= 13 || abilityScore2 >= 13) {
        return 5
      }

      return 0
    },
    hd: 6,
    maxLevel: 8,
    armour: "any leather, chainmail, plate, shields",
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
      "Missile Attack Bonus",
      "Initiative Bonus (optional)",
      "Stronghold",
    ],
    link: "https://oldschoolessentials.necroticgnome.com/srd/index.php/Halfling",
    arcane: false,
    divine: false,
  },
  {
    name: "Acrobat",
    category: "advanced",
    requirements: null,
    primeReqs: ["dexterity"],
    hd: 4,
    maxLevel: 14,
    armour: "leather",
    weapons:
      "missile weapons, dagger, sword, short sword, polearm, spear, staff",
    languages: "Alignment, Common",
    description:
      "Acrobats are trained in skills of balance, gymnastics, and stealth. They often work in conjunction with thieves and may belong to a Thieves’ Guild.",
    savingThrows: [13, 14, 13, 16, 15],
    nextLevel: 1200,
    abilities: [
      "Acrobat Skills (climb sheer surfaces, falling, hide in shadows, move silently, tightrope walking)",
      "Evasion",
      "Jumping",
      "Tumbling Attack",
    ],
    link: "https://oldschoolessentials.necroticgnome.com/srd/",
    arcane: false,
    divine: false,
    classEquivalent: "Thief",
  },
  {
    name: "Assassin",
    category: "advanced",
    requirements: null,
    primeReqs: ["dexterity"],
    hd: 4,
    maxLevel: 14,
    armour: "leather, shields",
    weapons: "any",
    languages: "Alignment, Common",
    description:
      "Assassins are adventurers who specialise in the arts of infiltration and killing by stealth. They sometimes form guilds whereby their illicit services may be hired.",
    savingThrows: [13, 14, 13, 16, 15],
    nextLevel: 1500,
    abilities: [
      "Assassin Skills (assassination, climb sheer suraces, hear noise, hide in shadows, move silently)",
      "Disguise",
      "Poison",
      "Assassin Hirelings (level 4)",
    ],
    link: "https://oldschoolessentials.necroticgnome.com/srd/",
    arcane: false,
    divine: false,
    classEquivalent: "Thief",
  },
  {
    name: "Barbarian",
    category: "advanced",
    requirements: "Minimum 9 dexterity",
    primeReqs: ["constitution", "strength"],
    checkPrimeReqRequirements: function (abilityScore1, abilityScore2) {
      if (abilityScore1 >= 16 && abilityScore2 >= 16) {
        return 10
      }

      if (abilityScore1 >= 13 || abilityScore2 >= 13) {
        return 5
      }

      return 0
    },
    hd: 8,
    maxLevel: 14,
    armour: "leather, chainmail, shields",
    weapons: "any",
    languages: "Alignment, Common",
    description:
      "Barbarians are tribal warriors from wild lands. They are formidable fighters with many useful survival skills but have a deep mistrust of the arcane",
    savingThrows: [10, 13, 12, 15, 16],
    nextLevel: 2500,
    abilities: [
      "Barbarian Skills (climb sheer surfaces, hiding in undergrowth, move silently)",
      "Cure Poison",
      "Foraging",
      "Hunting",
      "Fear of Magic",
      "Agile Fighting (level 4)",
      "Strike Invulnerable Monsters (level 4)",
    ],
    link: "https://oldschoolessentials.necroticgnome.com/srd/",
    arcane: false,
    divine: false,
  },
  {
    name: "Bard",
    category: "advanced",
    requirements: "Minimum 9 dexterity, minimum 9 intelligence",
    primeReqs: ["charisma"],
    hd: 6,
    maxLevel: 14,
    armour: "leather, chainmail",
    weapons: "missile weapons, one-handed melee weapons",
    languages: "Alignment, Common",
    description:
      "Bards are members of a sect of minstrels and warrior poets associated with the druids. Like druids, bards worship the force of nature and the myriad deities that personify it. Their strengths lie in their deep knowledge of myth and legend, the magic that they wield on behalf of their gods, and the enchanting power of their music.",
    savingThrows: [13, 14, 13, 16, 15],
    nextLevel: 2000,
    abilities: [
      "Anti-Charm",
      "Divine Magic",
      "Enchantment",
      "Languages (level 4)",
      "Lore (level 2)",
    ],
    link: "https://oldschoolessentials.necroticgnome.com/srd/",
    arcane: false,
    divine: true,
  },
  {
    name: "Drow",
    category: "advanced",
    requirements: "Minimum 9 intelligence",
    primeReqs: ["wisdom", "strength"],
    checkPrimeReqRequirements: function (abilityScore1, abilityScore2) {
      if (abilityScore1 >= 16 && abilityScore2 >= 13) {
        return 10
      }

      if (abilityScore1 >= 13 && abilityScore2 >= 13) {
        return 5
      }

      return 0
    },
    hd: 6,
    maxLevel: 14,
    armour: "any leather, chainmail, plate, shields",
    weapons: "any",
    languages:
      "Alignment, Common, Deepcommon, Elvish, Gnomish, the secret language of spiders",
    description:
      "Drow are slender, fey demihumans with pointed ears, skin as black as the night sky, and hair of silver or white. They have extremely long lifespans, being nigh immortal. Drow dwell exclusively underground, carving great cities of stone and crystal. They are related to the elves of the surface world and share their love of nature and magic. Drow typically weigh about 120 pounds and are from 5 to 5½ feet tall. They are talented fighters and gain powerful magic through the worship of their strange subterranean deities. They have a strong resistance to magic, as reflected in their saving throws.",
    savingThrows: [12, 13, 13, 15, 12],
    nextLevel: 4000,
    abilities: [
      "Detect Secret Doors",
      "Listening at Doors",
      "Divine Magic",
      "Infravision",
      "Light Sensitivity",
      "Spider Affinity",
      "Immunity to Ghoul Paralysis",
      "Spell: Light (Darkness)",
    ],
    link: "https://oldschoolessentials.necroticgnome.com/srd/",
    arcane: false,
    divine: true,
  },
  {
    name: "Druid",
    category: "advanced",
    requirements: null,
    primeReqs: ["wisdom"],
    hd: 6,
    maxLevel: 14,
    armour: "leather, wooden shields",
    weapons: "Club, dagger, sling, spear, staff",
    languages: "Alignment, Common, the secret druidic tongue",
    description:
      "Druids are priests of nature, protecting wild lands from the encroachment of “civilised” Law and the corrupting touch of Chaos. They worship the force of nature itself, personified in the form of various nature deities.",
    savingThrows: [11, 12, 14, 16, 15],
    nextLevel: 2000,
    abilities: [
      "Divine Magic",
      "Energy Resistance",
      "Identification",
      "Path-Finding",
      "Sylvan Languages (level 3)",
      "Shape Change (level 7)",
      "Charm Immunity (level 7)",
    ],
    link: "https://oldschoolessentials.necroticgnome.com/srd/",
    arcane: false,
    divine: true,
    druidSpells: true,
  },
  {
    name: "Duergar",
    category: "advanced",
    requirements: "Minimum 9 constitution, minimum 9 intelligence",
    primeReqs: ["strength"],
    hd: 6,
    maxLevel: 10,
    armour: "any leather, chainmail, plate, shields",
    weapons: "small or normal sized",
    languages:
      "Alignment, Common, Deepcommon, Dwarvish, Gnomish, Goblin, Kobold",
    description:
      "Duergars (also known as grey dwarves) are short, scrawny, bearded demihumans with grey skin and hair and ugly visages. They are around 4’ tall, weigh about 120 pounds, and have life spans of up to 500 years. Duergars dwell in strongholds and cities deep underground. They are renowned for their greed and for metals and stones and for their xenophobia toward other races. Duergars have a naturally strong constitution and are highly resistant to magic.",
    savingThrows: [8, 9, 10, 13, 12],
    nextLevel: 2800,
    abilities: [
      "Detect Construction Tricks",
      "Detect Room Traps",
      "Infravision",
      "Light-Sensitivity",
      "Mental Powers (enlargment, invisibility, shrinking, heat)",
      "Stealth",
    ],
    link: "https://oldschoolessentials.necroticgnome.com/srd/",
    arcane: false,
    divine: false,
  },
  {
    name: "Gnome",
    category: "advanced",
    requirements: "Minimum 9 constitution",
    primeReqs: ["intelligence", "dexterity"],
    checkPrimeReqRequirements: function (abilityScore1, abilityScore2) {
      if (abilityScore1 >= 16 && abilityScore2 >= 13) {
        return 10
      }

      if (abilityScore1 >= 13 && abilityScore2 >= 13) {
        return 5
      }

      return 0
    },
    hd: 4,
    maxLevel: 8,
    armour: "leather, shields",
    weapons: "any appropriate to size",
    languages:
      "Alignment, Common, Deepcommon, Dwarvish, Gnomish, Goblin, Kobold",
    description:
      "Gnomes are a race of short demihumans with long noses and beards. They are cousins of the dwarves and the two races are on friendly terms. Gnomes prefer to dwell in underground complexes in forests or foothills. They love mining, precious stones, and machinery—from miniature marvels of clockwork to great construction 3½’ tall and weigh around 100 pounds.",
    savingThrows: [8, 9, 10, 14, 11],
    nextLevel: 3000,
    abilities: [
      "Arcane Magic",
      "Defensive Bonus",
      "Detect Construction Tricks",
      "Hiding",
      "Infravision",
      "Listening at Doors",
      "Speak with Burrowing Mammals",
    ],
    link: "https://oldschoolessentials.necroticgnome.com/srd/",
    arcane: true,
    arcaneSpells: true,
    divine: false,
  },
  {
    name: "Half-Elf",
    category: "advanced",
    requirements: "Minimum 9 charisma, minimum 9 constitution",
    primeReqs: ["intelligence", "strength"],
    checkPrimeReqRequirements: function (abilityScore1, abilityScore2) {
      if (
        (abilityScore1 >= 16 && abilityScore2 >= 13) ||
        (abilityScore2 >= 16 && abilityScore1 >= 13)
      ) {
        return 10
      }

      if (abilityScore1 >= 13 && abilityScore2 >= 13) {
        return 5
      }

      return 0
    },
    hd: 6,
    maxLevel: 12,
    armour: "any leather, chainmail, plate, shields",
    weapons: "any",
    languages: "Alignment, Common, Elvish",
    description:
      "Half-elves are the rare offspring of elves and humans. Physically, they tend to combine the best features of the robust physique of humans. They are human-like in stature but always have a feature that marks their elven heritage (e.g. pointed ears or unusually bright eyes). Half-elves are skilled fighters and dabble with magic, though they lack their elvish parents’ mastery of the arcane.",
    savingThrows: [12, 13, 13, 15, 15],
    nextLevel: 2500,
    abilities: ["Arcane Magic", "Detect Secret Doors", "Infravision"],
    link: "https://oldschoolessentials.necroticgnome.com/srd/",
    arcane: true,
    divine: false,
  },
  {
    name: "Half-Orc",
    category: "advanced",
    requirements: null,
    primeReqs: ["dexterity", "strength"],
    checkPrimeReqRequirements: function (abilityScore1, abilityScore2) {
      if (abilityScore1 >= 16 && abilityScore2 >= 16) {
        return 10
      }

      if (abilityScore1 >= 13 && abilityScore2 >= 13) {
        return 5
      }

      return 0
    },
    hd: 6,
    maxLevel: 8,
    armour: "leather, chainmail, shields",
    weapons: "any",
    languages: "Alignment, Common, Orcish",
    description:
      "Half-orcs are the rare offspring of orcs and humans. They are human-like in stature and appearance, but usually have at least one feature that marks their orcish heritage (e.g. fangs or a pig-like snout). Due to the common animosity between orcs and humans, half-orcs are typically outcasts from both their parent cultures, living on the fringes of society and making a living by whatever means they can. Half-orc adventurers are capable combatants and have some skill as thieves.",
    savingThrows: [13, 14, 13, 16, 15],
    nextLevel: 1800,
    abilities: [
      "Backstab",
      "Infravision",
      "Thieving Skills (hide in shadows, move silently, pick pockets)",
    ],
    link: "https://oldschoolessentials.necroticgnome.com/srd/",
    arcane: false,
    divine: false,
  },
  {
    name: "Illusionist",
    category: "advanced",
    requirements: "Minimum 9 dexterity",
    primeReqs: ["intelligence"],
    hd: 4,
    maxLevel: 14,
    armour: "none",
    weapons: "dagger, staff",
    languages: "Alignment, Common",
    description:
      "Illusionists are adventurers who study the arcane arts of illusion and deception. Through this study, they have learned to cast magic spells.",
    savingThrows: [13, 14, 13, 16, 15],
    nextLevel: 2500,
    abilities: ["Arcane Magic"],
    link: "https://oldschoolessentials.necroticgnome.com/srd/",
    arcane: true,
    divine: false,
    illusionistSpells: true,
  },
  {
    name: "Knight",
    category: "advanced",
    requirements: "Minimum 9 constitution, minimum 9 dexterity",
    primeReqs: ["strength"],
    hd: 8,
    maxLevel: 14,
    armour: "any chainmail, plate mail, shields",
    weapons: "melee weapons",
    languages: "Alignment, Common",
    description:
      "Knights are warriors who serve a noble house or knightly order, carrying out their liege’s command and combat, preferring the lance above all other weapons. Knights are often members of the noble classes, but a person of lowlier origin may be initiated as a knight as a reward for noble deeds.",
    savingThrows: [12, 13, 14, 15, 16],
    nextLevel: 2500,
    abilities: [
      "Chivalic Code",
      "Horsemanship",
      "Mounted Combat",
      "Strength of Will",
      "Hospitality (level 3)",
      "Stronghold (level 3)",
      "Flying Mounts (level 5)",
    ],
    link: "https://oldschoolessentials.necroticgnome.com/srd/",
    arcane: false,
    divine: false,
  },
  {
    name: "Paladin",
    category: "advanced",
    requirements: "Minimum 9 charisma",
    primeReqs: ["strength", "wisdom"],
    checkPrimeReqRequirements: function (abilityScore1, abilityScore2) {
      if (abilityScore1 >= 16 && abilityScore2 >= 16) {
        return 10
      }

      if (abilityScore1 >= 13 || abilityScore2 >= 13) {
        return 5
      }

      return 0
    },
    hd: 8,
    maxLevel: 14,
    armour: "any leather, chainmail, plate, shields",
    weapons: "any",
    languages: "Alignment, Common",
    description:
      "Paladins are warriors sworn by sacred oath to the service of a Lawful holy order.",
    savingThrows: [10, 11, 12, 13, 14],
    nextLevel: 2750,
    abilities: [
      "Divine Magic",
      "Holy Resistance",
      "Laying on Hands",
      "Turning the Undead",
      "Vow of Humility",
      "War Horse (level 4)",
    ],
    link: "https://oldschoolessentials.necroticgnome.com/srd/",
    arcane: false,
    divine: true,
  },
  {
    name: "Ranger",
    category: "advanced",
    requirements: "Minimum 9 constitution, minimum 9 wisdom",
    primeReqs: ["strength"],
    hd: 8,
    maxLevel: 14,
    armour: "leather, chainmail, shields",
    weapons: "any",
    languages: "Alignment, Common",
    description:
      "Rangers are members of a secret society which protects their native lands from invasion and the influence of Chaos. They are skilled warriors who are adapted to life in the wilds. At higher levels, their connection with nature grants them the ability to cast spells.",
    savingThrows: [12, 13, 14, 15, 16],
    nextLevel: 2250,
    abilities: [
      "Awareness",
      "Divine Magic",
      "Foragin and Hunting",
      "Limited Possessions",
      "Pursuit",
      "Surprise Attack",
      "Tracking",
    ],
    link: "https://oldschoolessentials.necroticgnome.com/srd/",
    arcane: true,
    divine: false,
  },
  {
    name: "Svirfneblin",
    category: "advanced",
    requirements: "Minimum 9 constitution",
    primeReqs: ["strength"],
    hd: 6,
    maxLevel: 8,
    armour: "any leather, chainmail, plate, shields",
    weapons: "any",
    languages:
      "Alignment, Common, Deepcommon, Gnomish, Dwarvish, Kobold, the language of earth elementals",
    description:
      "Short, thickset demihumans with long noses and gnarled, hairless, grey skin. Svirfneblins (also known as deep gnomes) are subterranean cousins of the gnomes who live close to the surface. Svirfneblins are skilled tunnellers and makers of mechanical contraptions and cunning secret doors. They love gems above all else and excavate their communities around veins of precious stones. Svirfneblins are typically around 3½’ tall and weigh around 120 pounds.",
    savingThrows: [8, 9, 10, 14, 11],
    nextLevel: 2400,
    abilities: [
      "Blend into Stone",
      "Defensive Bonus",
      "Detect Construction Tricks",
      "Illusion Resistance",
      "Infravision",
      "Light Sensitivity",
      "Speak with Earth Elementals",
      "Stone Murmurs",
      "Using Magic Items",
    ],
    link: "https://oldschoolessentials.necroticgnome.com/srd/",
    arcane: false,
    divine: false,
  },
]

export default classOptionsData
