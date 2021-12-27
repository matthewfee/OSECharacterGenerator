import React from "react";
import classOptionsData from "../data/classOptionsData";
import ClassOptionsButton from "./ClassOptionsButton";
import EquipmentScreen from "./EquipmentScreen";
import ClassDescription from "./ClassDescription";
import ClassScreen from "./ClassScreen";
import DetailsScreen from "./DetailsScreen";
import CharacterSheetScreen from "./CharacterSheetScreen";
import CharacterStorageScreen from "./CharacterStorageScreen";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import CircleLoader from "react-spinners/CircleLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class NewCharacter extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      id: null,
      strength: null,
      intelligence: null,
      wisdom: null,
      dexterity: null,
      constitution: null,
      charisma: null,

      strengthOriginal: null,
      intelligenceOriginal: null,
      wisdomOriginal: null,
      dexterityOriginal: null,
      constitutionOriginal: null,
      charismaOriginal: null,

      pointBuy: 0,
      characterClass: null,
      level: 1,
      primeReq: "none",
      primeReq2: null,
      equipment: [],
      equipmentSelected: undefined,
      equipmentScreen: false,
      abilityScreen: true,
      classScreen: false,
      detailsScreen: false,
      characterSheetScreen: false,
      characterStorageScreen: false,
      goldStarting: undefined,
      randomNumbers: [],
      showAdvancedClasses: false,

      name: null,

      basicCharData: "Character Data Not Loaded",
      advCharData: "Advanced Character Data Not Loaded",

      rollButtonHover: false
    };
  }

  id = "ID_" + new Date().getTime();

  componentDidMount() {
    const RandomOrg = require("random-org");
    const random = new RandomOrg({
      apiKey: process.env.REACT_APP_API_KEY
    });

    random
      .generateIntegers({ min: 1, max: 6, n: 40 })
      .then(result => {
        this.setState({ randomNumbers: result.random.data, loading: false });
      })
      .catch(error => {
        this.setState({ loading: false });
        console.error(error);
      });

    if (this.state.id === null) {
      this.setState({ id: this.id });
    }
  }

  getRndInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  d = (how_many, sides) => {
    let total = 0;
    let i;
    for (i = 0; i < how_many; i++) {
      total += this.getRndInteger(1, sides);
    }
    return total;
  };

  choose = array => {
    return array[Math.floor(Math.random() * array.length)];
  };

  d6 = how_many => {
    //uses default JS random number seed if randomNumber API doesn't load correctly

    if (this.state.randomNumbers.length < 2) {
      console.log("ROLLING WITHOUT API");
      return this.d(3, 6);
    }

    let sum = 0;

    for (let i = 0; i < how_many; i++) {
      sum = sum + this.choose(this.state.randomNumbers);
    }

    return sum;
  };

  reRoll = () => {
    console.log("CHARACTER ROLLED");
    window.scrollTo(0, 0);
    const newID = "ID_" + new Date().getTime();

    let newObject = {
      id: newID,
      strength: this.d6(3),
      intelligence: this.d6(3),
      wisdom: this.d6(3),
      dexterity: this.d6(3),
      constitution: this.d6(3),
      charisma: this.d6(3),
      goldStarting: this.d6(3) * 10,
      pointBuy: 0,
      characterClass: null,
      primeReq: "none",
      primeReq2: undefined,
      characterStorageScreen: false,
      rollButtonHover: false
    };

    newObject.strengthOriginal = newObject.strength;
    newObject.intelligenceOriginal = newObject.intelligence;
    newObject.wisdomOriginal = newObject.wisdom;
    newObject.dexterityOriginal = newObject.dexterity;
    newObject.constitutionOriginal = newObject.constitution;
    newObject.charismaOriginal = newObject.charisma;

    this.setState(newObject, () => {
      this.getMod();
    });
  };

  //generates the appropriate modifiers for each ability score

  getMod = () => {
    this.classOptionsListButton();
    this.advancedClassesListButton();

    var STR = this.state.strength;
    var INT = this.state.intelligence;
    var WIS = this.state.wisdom;
    var DEX = this.state.dexterity;
    var CON = parseInt(this.state.constitution);
    var CHA = this.state.charisma;

    const abilityMod = [
      null,
      null,
      null,
      "-3",
      "-2",
      "-2",
      "-1",
      "-1",
      "-1",
      "0",
      "0",
      "0",
      "0",
      "+1",
      "+1",
      "+1",
      "+2",
      "+2",
      "+3"
    ];

    const openDoors = [
      null,
      null,
      null,
      "1-in-6",
      "1-in-6",
      "1-in-6",
      "1-in-6",
      "1-in-6",
      "1-in-6",
      "2-in-6",
      "2-in-6",
      "2-in-6",
      "2-in-6",
      "3-in-6",
      "3-in-6",
      "3-in-6",
      "4-in-6",
      "4-in-6",
      "5-in-6"
    ];
    const spokenLanguages = [
      null,
      null,
      null,
      "Broken speech",
      "Native",
      "Native",
      "Native",
      "Native",
      "Native",
      "Native",
      "Native",
      "Native",
      "Native",
      "+1",
      "+1",
      "+1 ",
      "+2",
      "+2",
      "+3"
    ];

    const extraLanguageCount = [
      null,
      null,
      null,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      1,
      1,
      2,
      2,
      3
    ];

    const literacy = [
      null,
      null,
      null,
      "Illiterate",
      "Illiterate",
      "Illiterate",
      "Basic",
      "Basic",
      "Basic",
      "Literate",
      "Literate",
      "Literate",
      "Literate",
      "Literate",
      "Literate",
      "Literate",
      "Literate",
      "Literate",
      "Literate"
    ];

    const initiative = [
      null,
      null,
      null,
      "-2",
      "-1",
      "-1",
      "-1",
      "-1",
      "-1",
      "0",
      "0",
      "0",
      "0",
      "+1",
      "+1",
      "+1",
      "+1",
      "+1",
      "+2"
    ];

    const npcReactions = [
      null,
      null,
      null,
      "-2",
      "-1",
      "-1",
      "-1",
      "-1",
      "-1",
      "0",
      "0",
      "0",
      "0",
      "+1",
      "+1",
      "+1",
      "+1",
      "+1",
      "+2"
    ];

    const retainersMax = [
      null,
      null,
      null,
      "1",
      "2",
      "2",
      "3",
      "3",
      "3",
      "4",
      "4",
      "4",
      "4",
      "5",
      "5",
      "5",
      "6",
      "6",
      "7"
    ];

    const loyalty = [
      null,
      null,
      null,
      "4",
      "5",
      "5",
      "6",
      "6",
      "6",
      "7",
      "7",
      "7",
      "7",
      "8",
      "8",
      "8",
      "9",
      "9",
      "10"
    ];

    const newMods = {
      strengthModMelee: abilityMod[STR],
      strengthModDoors: openDoors[STR],
      intelligenceModLanguages: spokenLanguages[INT],
      languageCount: extraLanguageCount[INT],
      intelligenceModLiteracy: literacy[INT],
      wisdomMod: abilityMod[WIS],
      dexterityModAC: abilityMod[DEX],
      dexterityModMissiles: abilityMod[DEX],
      dexterityModInitiative: initiative[DEX],
      constitutionMod: abilityMod[CON],
      charismaModNPCReactions: npcReactions[CHA],
      charismaModRetainersMax: retainersMax[CHA],
      charismaModLoyalty: loyalty[CHA]
    };

    this.setState(newMods, () => {
      this.getPrimeReqMod();
    });
  };

  getPrimeReqMod = () => {
    const modArr = [
      null,
      null,
      null,
      "-20%",
      "-20%",
      "-20%",
      "-10%",
      "-10%",
      "-10%",
      "+0%",
      "+0%",
      "+0%",
      "+0%",
      "+5%",
      "+5%",
      "+5%",
      "+10%",
      "+10%",
      "+10%"
    ];

    let abilityScoreMax = this.state[this.state.primeReq.toLowerCase()];

    if (this.state.primeReq2) {
      let abilityScore2 = this.state[this.state.primeReq2.toLowerCase()];

      if (abilityScore2 > abilityScoreMax) {
        abilityScoreMax = abilityScore2;
      }
    }

    if (this.state.characterClass === "Barbarian") {
      if (this.state.constitution > 15 && this.state.strength > 15) {
        return this.setState({ primeReqMod: "+10%" });
      } else if (this.state.constitution > 12 && this.state.strength > 12) {
        return this.setState({ primeReqMod: "+5%" });
      } else {
        return this.setState({ primeReqMod: "+0%" });
      }
    }

    if (this.state.characterClass === "Drow") {
      if (this.state.wisdom > 15 && this.state.strength > 12) {
        return this.setState({ primeReqMod: "+10%" });
      } else if (this.state.wisdom > 12 && this.state.strength > 12) {
        return this.setState({ primeReqMod: "+5%" });
      } else {
        return this.setState({ primeReqMod: "+0%" });
      }
    }

    if (this.state.characterClass === "Elf") {
      if (this.state.intellience > 15 && this.state.strength > 12) {
        return this.setState({ primeReqMod: "+10%" });
      } else if (this.state.intellience > 12 && this.state.strength > 12) {
        return this.setState({ primeReqMod: "+5%" });
      } else {
        return this.setState({ primeReqMod: "+0%" });
      }
    }

    if (this.state.characterClass === "Gnome") {
      if (this.state.intelligence > 15 && this.state.dexterity > 12) {
        return this.setState({ primeReqMod: "+10%" });
      } else if (this.state.intelligence > 12 && this.state.dexterity > 12) {
        return this.setState({ primeReqMod: "+5%" });
      } else {
        return this.setState({ primeReqMod: "+0%" });
      }
    }

    if (this.state.characterClass === "Half-Elf") {
      if (
        (this.state.intelligence > 15 && this.state.strength > 12) ||
        (this.state.intelligence > 12 && this.state.strength > 15)
      ) {
        return this.setState({ primeReqMod: "+10%" });
      } else if (this.state.intellience > 12 && this.state.strength > 12) {
        return this.setState({ primeReqMod: "+5%" });
      } else {
        return this.setState({ primeReqMod: "+0%" });
      }
    }

    if (this.state.characterClass === "Halfling") {
      if (this.state.dexterity > 12 && this.state.strength > 12) {
        return this.setState({ primeReqMod: "+10%" });
      } else if (this.state.dexterity > 12 || this.state.strength > 12) {
        return this.setState({ primeReqMod: "+5%" });
      }
    }

    if (this.state.characterClass === "Half-Orc") {
      if (this.state.dexterity > 15 && this.state.strength > 15) {
        return this.setState({ primeReqMod: "+10%" });
      } else if (this.state.dexterity > 12 && this.state.strength > 12) {
        return this.setState({ primeReqMod: "+5%" });
      } else {
        return this.setState({ primeReqMod: "+0%" });
      }
    }

    if (this.state.characterClass === "Paladin") {
      if (this.state.wisdom > 15 && this.state.strength > 15) {
        return this.setState({ primeReqMod: "+10%" });
      } else if (this.state.wisdom > 12 || this.state.strength > 12) {
        return this.setState({ primeReqMod: "+5%" });
      } else {
        return this.setState({ primeReqMod: "+0%" });
      }
    }

    this.setState({ primeReqMod: modArr[abilityScoreMax] });
  };

  resetCharacter = () => {
    const newStateObject = {
      strength: this.state.strengthOriginal,
      intelligence: this.state.intelligenceOriginal,
      wisdom: this.state.wisdomOriginal,
      dexterity: this.state.dexterityOriginal,
      constitution: this.state.constitutionOriginal,
      charisma: this.state.charismaOriginal,
      pointBuy: 0
    };

    this.setState(newStateObject);
  };

  scoreIncrease = key => {
    const keyOriginal = key + "Original";

    var value = this.state[key];

    var newPointBuy = this.state.pointBuy - 1;

    var increment = 1;

    //check if score has already been decreased

    if (value < this.state[keyOriginal]) {
      increment = 2;
    }

    //checks if there's points to buy

    if (this.state.pointBuy < 1) {
      return;
    }

    //maximum 18

    if (value === 18) {
      return;
    }

    var newObject = {
      [key]: value + increment,
      pointBuy: newPointBuy
    };

    this.setState(newObject, () => {
      this.getMod();
    });
  };

  scoreDecrease = key => {
    const keyOriginal = key + "Original";
    const value = this.state[key];
    let decrement = -2;

    if (value > this.state[keyOriginal]) {
      decrement = -1;
    }

    let newPointBuy = this.state.pointBuy + 1;

    if (this.state[key] <= 10) {
      return;
    }

    let newObject = {
      [key]: value + decrement,
      pointBuy: newPointBuy
    };

    this.setState(newObject, () => {
      this.getMod();
    });
  };

  changeCharacterClass = event => {
    this.resetCharacter();

    let characterClass = classOptionsData.find(
      obj => obj.name === event.target.value
    );

    if (characterClass.primeReq2) {
      return this.setState(
        {
          characterClass: event.target.value,
          primeReq: characterClass.primeReq,
          primeReq2: characterClass.primeReq2
        },
        () => {
          this.getPrimeReqMod();
        }
      );
    } else {
      this.setState(
        {
          characterClass: event.target.value,
          primeReq: characterClass.primeReq,
          primeReq2: null
        },
        () => {
          this.getPrimeReqMod();
        }
      );
    }
  };

  classOptionsListButton = () => {
    let basicCharacters = [];
    for (let i = 0; i < 7; i++) {
      let item = classOptionsData[i];
      basicCharacters.push(
        <ClassOptionsButton
          classOption={item.name}
          requirements={item.requirements}
          primeReq={item.primeReq}
          strength={this.state.strengthOriginal}
          intelligence={this.state.intelligenceOriginal}
          wisdom={this.state.wisdomOriginal}
          dexterity={this.state.dexterityOriginal}
          constitution={this.state.constitutionOriginal}
          charisma={this.state.charismaOriginal}
          key={item.name}
          classFunction={this.changeCharacterClass}
        ></ClassOptionsButton>
      );
    }
    return this.setState({ basicCharData: basicCharacters });
  };

  advancedClassesListButton = () => {
    let advancedCharacters = [];
    for (let i = 7; i < classOptionsData.length; i++) {
      let item = classOptionsData[i];
      advancedCharacters.push(
        <ClassOptionsButton
          classOption={item.name}
          requirements={item.requirements}
          primeReq={item.primeReq}
          strength={this.state.strengthOriginal}
          intelligence={this.state.intelligenceOriginal}
          wisdom={this.state.wisdomOriginal}
          dexterity={this.state.dexterityOriginal}
          constitution={this.state.constitutionOriginal}
          charisma={this.state.charismaOriginal}
          key={item.name}
          classFunction={this.changeCharacterClass}
        ></ClassOptionsButton>
      );
    }
    return this.setState({ advCharData: advancedCharacters });
  };

  showEquipmentScreen = () => {
    this.setState({
      equipmentScreen: true,
      abilityScreen: false,
      classScreen: false
    });
    window.scrollTo(0, 0);
  };

  showAbilityScreen = () => {
    this.setState({
      equipmentScreen: false,
      abilityScreen: true,
      characterSheetScreen: false,
      classScreen: false,
      characterStorageScreen: false,
      strength: null,
      basicCharData: "Character Data Not Loaded",
      advCharData: "Advanced Character Data Not Loaded"
    });
    window.scrollTo(0, 0);
  };

  showClassScreen = () => {
    this.setState({
      equipmentScreen: false,
      abilityScreen: false,
      classScreen: true
    });
    window.scrollTo(0, 0);
  };

  showDetailsScreen = () => {
    this.setState({
      equipmentScreen: false,
      abilityScreen: false,
      classScreen: false,
      detailsScreen: true
    });
    window.scrollTo(0, 0);
  };

  showCharacterSheetScreen = () => {
    this.setState({
      detailsScreen: false,
      characterSheetScreen: true,
      characterStorageScreen: false
    });
    window.scrollTo(0, 0);
  };

  showStorageSheetScreen = () => {
    this.setState({
      characterStorageScreen: true,
      characterSheetScreen: false,
      abilityScreen: false,
      strength: 10
    });
    window.scrollTo(0, 0);
  };

  toggleAdvanced = () => {
    if (this.state.showAdvancedClasses) {
      this.setState({ showAdvancedClasses: false });
    } else {
      this.setState({ showAdvancedClasses: true });
    }
  };

  updateParentState = object => {
    this.setState(object);
  };

  render() {
    const redFail = "#730505";
    const myCharacters = JSON.parse(window.localStorage.getItem("characters"));
    const primeReqs = this.state.primeReq2
      ? (this.state.primeReq + " " + this.state.primeReq2).toLowerCase()
      : this.state.primeReq.toLowerCase();

    return (
      <div
        className={`${
          this.state.rollButtonHover ? "wrapper wrapper-alt" : "wrapper"
        }`}
      >
        <header
          className={this.state.strength ? "header" : "header header--initial"}
        >
          <h2
            className={this.state.rollButtonHover ? "title fade" : "title"}
            style={{ fontSize: this.state.strength ? "1.2rem" : "" }}
          >
            OSE Character Generator
          </h2>

          {this.state.abilityScreen && !this.state.strength && (
            <button
              className={`button button--roll button-primary`}
              onClick={this.reRoll}
              disabled={this.state.loading ? true : false}
              onMouseEnter={() => this.setState({ rollButtonHover: true })}
              onMouseLeave={() => this.setState({ rollButtonHover: false })}
            >
              {!this.state.loading && <div>Roll</div>}
              <div className="sweet-loading">
                <CircleLoader
                  css={override}
                  size={50}
                  color={"white"}
                  loading={this.state.loading}
                />
              </div>
            </button>
          )}

          {this.state.abilityScreen && !this.state.strength && myCharacters && (
            <button
              className={`button button--storage button-primary ${
                this.state.rollButtonHover ? "fade" : ""
              }`}
              onClick={this.showStorageSheetScreen}
            >
              Tavern
            </button>
          )}

          {this.state.abilityScreen && !this.state.strength && (
            <div
              className={`main-page--subheader ${
                this.state.rollButtonHover ? "fade" : ""
              } `}
            >
              Designed for use with{" "}
              <a href="https://necroticgnome.com/"> Old School Essentials</a>.{" "}
              OSE Advanced Fantasy classes included with the permission of
              Necrotic Gnome.
              <br></br>
              All dice values are generated from{" "}
              <a href="https://www.random.org/">RANDOM.ORG</a>. <br></br>{" "}
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <a
                href="https://eviltables.dev/ose-character-generator/"
                className="main-page--subheadername"
              >
                Created by EvilTables
              </a>
            </div>
          )}
        </header>

        <div
          className={`character-menu container`}
          style={{ display: this.state.strength ? "inline-block" : "none" }}
        >
          {this.state.abilityScreen && this.state.strength && (
            <div className="ability-screen container">
              <h2 className="header-default character-class-header">
                Character Class
              </h2>

              <div className="class-options-container container">
                {/* <h3 className="basic-classes-header">Core Classes</h3> */}

                <div className="basic-class-container">
                  {this.state.basicCharData}
                </div>
                <h3 className="advanced-classes-header">
                  Advanced Classes{" "}
                  <input
                    type="checkbox"
                    value="Advanced Classes"
                    className="checkbox"
                    checked={this.state.showAdvancedClasses}
                    onChange={this.toggleAdvanced}
                  ></input>
                </h3>
                <div className="advanced-class-container">
                  {this.state.showAdvancedClasses && this.state.advCharData}
                </div>

                {this.state.strength && (
                  <ClassDescription
                    characterClass={this.state.characterClass}
                  ></ClassDescription>
                )}
              </div>

              <h2 className="ability-scores--header header-default">
                Ability Scores
              </h2>

              <div className="container ability-score-container">
                {this.state.pointBuy > 0 && (
                  <div className="point-buy">
                    Point Buy: {this.state.pointBuy}
                  </div>
                )}

                <div className="ability-score-name">
                  <h2>STRENGTH</h2>

                  {primeReqs.includes("strength") && (
                    <div className="prime-req">
                      Prime Req: {this.state.primeReqMod}
                    </div>
                  )}
                </div>

                <div
                  className={
                    this.state.strength > 15
                      ? "ability-score ability-score--high"
                      : "ability-score"
                  }
                  style={{ color: this.state.strength < 6 ? redFail : "" }}
                >
                  {this.state.strength}

                  {this.state.strength > 10 &&
                    this.state.characterClass !== "Thief" && (
                      <button
                        className="button button--ability button--ability--decrease"
                        onClick={() => {
                          this.scoreDecrease("strength");
                        }}
                      >
                        <div className="arrow-down"></div>
                      </button>
                    )}

                  {this.state.pointBuy > 0 &&
                    (primeReqs.includes("strength") ||
                      this.state.strength < this.state.strengthOriginal) &&
                    this.state.strength < 18 && (
                      <button
                        className="button button--ability button--ability--increase"
                        onClick={() => {
                          this.scoreIncrease("strength");
                        }}
                      >
                        <div className="arrow-up"></div>
                      </button>
                    )}
                </div>
                <div className="ability-mod">
                  <span>Melee Attacks: {this.state.strengthModMelee} </span>
                  <span>Open Doors: {this.state.strengthModDoors}</span>
                </div>

                <div className="ability-score-name">
                  <h2>INTELLIGENCE</h2>

                  {primeReqs.includes("intelligence") && (
                    <div className="prime-req">
                      Prime Req: {this.state.primeReqMod}
                    </div>
                  )}
                </div>

                <div
                  className={
                    this.state.intelligence > 15
                      ? "ability-score ability-score--high"
                      : "ability-score"
                  }
                  style={{ color: this.state.intelligence < 6 ? redFail : "" }}
                >
                  {this.state.intelligence}

                  {this.state.intelligence > 10 && (
                    <button
                      className="button button--ability button--ability--decrease"
                      onClick={() => {
                        this.scoreDecrease("intelligence");
                      }}
                    >
                      <div className="arrow-down"></div>
                    </button>
                  )}
                  {this.state.pointBuy > 0 &&
                    (primeReqs.includes("intelligence") ||
                      this.state.intelligence <
                        this.state.intelligenceOriginal) &&
                    this.state.intelligence < 18 && (
                      <button
                        className="button button--ability button--ability--increase"
                        onClick={() => {
                          this.scoreIncrease("intelligence");
                        }}
                      >
                        <div className="arrow-up"></div>
                      </button>
                    )}
                </div>
                <div className="ability-mod ability-mod2">
                  <span>Languages: {this.state.intelligenceModLanguages}</span>
                  <span>Literacy: {this.state.intelligenceModLiteracy}</span>
                </div>

                <div className="ability-score-name">
                  <h2>WISDOM</h2>

                  {primeReqs.includes("wisdom") && (
                    <div className="prime-req">
                      Prime Req: {this.state.primeReqMod}
                    </div>
                  )}
                </div>
                <div
                  style={{ color: this.state.wisdom < 6 ? redFail : "" }}
                  className={
                    this.state.wisdom > 15
                      ? "ability-score ability-score--high"
                      : "ability-score"
                  }
                >
                  {this.state.wisdom}

                  {this.state.wisdom > 10 && (
                    <button
                      className="button button--ability button--ability--decrease"
                      onClick={() => {
                        this.scoreDecrease("wisdom");
                      }}
                    >
                      <div className="arrow-down"></div>
                    </button>
                  )}
                  {this.state.pointBuy > 0 &&
                    (primeReqs.includes("wisdom") ||
                      this.state.wisdom < this.state.wisdomOriginal) &&
                    this.state.wisdom < 18 && (
                      <button
                        className="button button--ability button--ability--increase"
                        onClick={() => {
                          this.scoreIncrease("wisdom");
                        }}
                      >
                        <div className="arrow-up"></div>
                      </button>
                    )}
                </div>
                <div className="ability-mod">
                  <span>Magic Saves: {this.state.wisdomMod}</span>
                </div>

                <div className="ability-score-name">
                  <h2>DEXTERITY</h2>

                  {primeReqs.includes("dexterity") && (
                    <div className="prime-req">
                      Prime Req: {this.state.primeReqMod}
                    </div>
                  )}
                </div>

                <div
                  className={
                    this.state.dexterity > 15
                      ? "ability-score ability-score--high"
                      : "ability-score"
                  }
                  style={{ color: this.state.dexterity < 6 ? redFail : "" }}
                >
                  {this.state.dexterity}

                  {this.state.pointBuy > 0 &&
                    primeReqs.includes("dexterity") &&
                    this.state.dexterity < 18 && (
                      <button
                        className="button button--ability button--ability--increase"
                        onClick={() => {
                          this.scoreIncrease("dexterity");
                        }}
                      >
                        <div className="arrow-up"></div>
                      </button>
                    )}

                  {this.state.dexterity > this.state.dexterityOriginal && (
                    <button
                      className="button button--ability button--ability--decrease"
                      onClick={() => {
                        this.scoreDecrease("dexterity");
                      }}
                    >
                      <div className="arrow-down"></div>
                    </button>
                  )}
                </div>

                <div className="ability-mod">
                  <span> AC: {this.state.dexterityModAC}</span>
                  <span> Missile: {this.state.dexterityModMissiles}</span>
                  <span>Initiative: {this.state.dexterityModInitiative}</span>
                </div>

                <div className="ability-score-name">
                  <h2>CONSTITUTION</h2>

                  {primeReqs.includes("constitution") && (
                    <div className="prime-req">
                      Prime Req: {this.state.primeReqMod}
                    </div>
                  )}
                </div>

                <div
                  className={
                    this.state.constitution > 15
                      ? "ability-score ability-score--high"
                      : "ability-score"
                  }
                  style={{ color: this.state.constitution < 6 ? redFail : "" }}
                >
                  {this.state.constitution}

                  {this.state.pointBuy > 0 &&
                    primeReqs.includes("constitution") &&
                    this.state.constitution < 18 && (
                      <button
                        className="button button--ability button--ability--increase"
                        onClick={() => {
                          this.scoreIncrease("constitution");
                        }}
                      >
                        <div className="arrow-up"></div>
                      </button>
                    )}
                </div>
                <div className="ability-mod">
                  <span>Hit Points: {this.state.constitutionMod}</span>
                </div>

                <div className="ability-score-name">
                  <h2>CHARISMA</h2>

                  {primeReqs.includes("charisma") && (
                    <div className="prime-req">
                      Prime Req: {this.state.primeReqMod}
                    </div>
                  )}
                </div>

                <div
                  className={
                    this.state.charisma > 15
                      ? "ability-score ability-score--high"
                      : "ability-score"
                  }
                  style={{ color: this.state.charisma < 6 ? redFail : "" }}
                >
                  {this.state.charisma}

                  {this.state.pointBuy > 0 &&
                    primeReqs.includes("charisma") &&
                    this.state.charisma < 18 && (
                      <button
                        className="button button--ability button--ability--increase"
                        onClick={() => {
                          this.scoreIncrease("charisma");
                        }}
                      >
                        <div className="arrow-up"></div>
                      </button>
                    )}
                </div>

                <div className="ability-mod">
                  <span>
                    {" "}
                    NPC Reactions: {this.state.charismaModNPCReactions}
                  </span>
                  <span>
                    Retainers Max #: {this.state.charismaModRetainersMax}
                  </span>
                  <span>Loyalty: {this.state.charismaModLoyalty}</span>
                </div>
              </div>

              {this.state.strength && (
                <div>
                  <button
                    className="button button--class-option"
                    onClick={this.showClassScreen}
                    disabled={this.state.characterClass === null ? true : false}
                    style={
                      this.state.characterClass === null ? { opacity: 0.4 } : {}
                    }
                  >
                    Class Options
                  </button>{" "}
                </div>
              )}
            </div>
          )}

          {this.state.classScreen && (
            <ClassScreen
              updateParentState={this.updateParentState}
              showEquipmentScreen={this.showEquipmentScreen}
              showAbilityScreen={this.showAbilityScreen}
              characterClass={this.state.characterClass}
              conMod={parseInt(this.state.constitutionMod)}
              d={this.d}
            ></ClassScreen>
          )}

          {this.state.equipmentScreen && (
            <EquipmentScreen
              updateParentState={this.updateParentState}
              characterClass={this.state.characterClass}
              showAbilityScreen={this.showAbilityScreen}
              showDetailsScreen={this.showDetailsScreen}
              gold={this.state.goldStarting}
              dexterityModAC={this.state.dexterityModAC}
            />
          )}

          {this.state.detailsScreen && (
            <DetailsScreen
              showCharacterSheetScreen={this.showCharacterSheetScreen}
              updateParentState={this.updateParentState}
              parentState={this.state}
            ></DetailsScreen>
          )}

          {this.state.characterSheetScreen && (
            <CharacterSheetScreen
              parentState={this.state}
              updateParentState={this.updateParentState}
              showAbilityScreen={this.showAbilityScreen}
              showStorageSheetScreen={this.showStorageSheetScreen}
            ></CharacterSheetScreen>
          )}

          {this.state.characterStorageScreen && (
            <CharacterStorageScreen
              updateParentState={this.updateParentState}
              parentState={this.state}
              showAbilityScreen={this.showAbilityScreen}
              showCharacterSheetScreen={this.showCharacterSheetScreen}
            ></CharacterStorageScreen>
          )}
        </div>
      </div>
    );
  }
}

export default NewCharacter;
