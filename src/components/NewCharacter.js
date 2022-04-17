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
import CircleLoader from "react-spinners/CircleLoader";
import Header from "./Header";
import AbilityScores from "./AbilityScores";
import { UnbalancedParenthesisError } from "pdf-lib";
import abilityScoreMods from "../data/abilityScoreMods";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
// These days everyone is using useState()
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
    const requestBody = {
      jsonrpc: "2.0",
      method: "generateIntegers",
      params: {
        apiKey: process.env.REACT_APP_API_KEY,
        n: "70",
        min: "1",
        max: "6"
      },
      id: "42"
    };
    // use axios
    // https://github.com/axios/axios
    fetch("https://api.random.org/json-rpc/4/invoke", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          randomNumbers: data.result.random.data,
          loading: false
        });
      })
      .catch(error => {
        console.error(error);
        this.setState({ loading: false });
      });
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

  d6 = howMany => {
    //uses default JS random number seed if randomNumber API doesn't load correctly

    if (this.state.randomNumbers.length < 2) {
      return this.d(3, 6);
    }

    let sum = 0;

    for (let i = 0; i < howMany; i++) {
      sum = sum + this.choose(this.state.randomNumbers);
    }

    return sum;
  };

  reRoll = () => {
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
      this.updateMods();
    });
  };

  //generates the appropriate modifiers for each ability score

  getModValue = (abilityScoreName, abilityScore) => {
    let newAbilityModifiers = {};

    switch (abilityScoreName) {
      case "strength":
        newAbilityModifiers = {
          strengthModMelee: abilityScoreMods.abilityMod[abilityScore],
          strengthModDoors: abilityScoreMods.openDoors[abilityScore]
        };
        break;
      case "intelligence":
        newAbilityModifiers = {
          intelligenceModLanguages:
            abilityScoreMods.spokenLanguages[abilityScore]
        };
        break;
      case "dexterity":
        newAbilityModifiers = {
          dexterityModAC: abilityScoreMods.abilityMod[abilityScore],
          dexterityModMissiles: abilityScoreMods.abilityMod[abilityScore],
          dexterityModInitiative: abilityScoreMods.initiative[abilityScore]
        };
        break;
      case "wisdom":
        newAbilityModifiers = {
          wisdomMod: abilityScoreMods.abilityMod[abilityScore]
        };
        break;
      case "constitution":
        newAbilityModifiers = {
          constitutionMod: abilityScoreMods.abilityMod[abilityScore]
        };
        break;
      case "charisma":
        newAbilityModifiers = {
          charismaModNPCReactions: abilityScoreMods.npcReactions[abilityScore],
          charismaModRetainersMax: abilityScoreMods.retainersMax[abilityScore],
          charismaModLoyalty: abilityScoreMods.loyalty[abilityScore]
        };
        break;
    }

    this.setState(newAbilityModifiers, () => {
      this.getPrimeReqMod();
    });
  };

  updateMods = () => {
    this.classOptionsListButton();
    this.advancedClassesListButton();

    let STR = this.state.strength;
    let INT = this.state.intelligence;
    let WIS = this.state.wisdom;
    let DEX = this.state.dexterity;
    let CON = parseInt(this.state.constitution);
    let CHA = this.state.charisma;

    const newMods = {
      strengthModMelee: abilityScoreMods.abilityMod[STR],
      strengthModDoors: abilityScoreMods.openDoors[STR],
      intelligenceModLanguages: abilityScoreMods.spokenLanguages[INT],
      languageCount: abilityScoreMods.extraLanguageCount[INT],
      intelligenceModLiteracy: abilityScoreMods.literacy[INT],
      wisdomMod: abilityScoreMods.abilityMod[WIS],
      dexterityModAC: abilityScoreMods.abilityMod[DEX],
      dexterityModMissiles: abilityScoreMods.abilityMod[DEX],
      dexterityModInitiative: abilityScoreMods.initiative[DEX],
      constitutionMod: abilityScoreMods.abilityMod[CON],
      charismaModNPCReactions: abilityScoreMods.npcReactions[CHA],
      charismaModRetainersMax: abilityScoreMods.retainersMax[CHA],
      charismaModLoyalty: abilityScoreMods.loyalty[CHA]
    };

    this.setState(newMods, () => {
      this.getPrimeReqMod();
    });

    return;
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
    // this code is extremally unreadable
    // You should use data structures first. It happens in many parts of the code actually
    // The right way is to have for example object like
    // {
    // className: "Barbarian"
    // modifiers: {
    //   primeReqMod: [10, 5, 0]
    // }
    // }
    // and then once you established this structure you can code
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
      if (this.state.intelligence > 15 && this.state.strength > 12) {
        return this.setState({ primeReqMod: "+10%" });
      } else if (this.state.intelligence > 12 && this.state.strength > 12) {
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

    this.setState(newStateObject, () => {
      this.updateMods();
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
        <Header
          updateParentState={this.updateParentState}
          showStorageSheetScreen={this.showStorageSheetScreen}
          parentState={this.state}
          reRoll={this.reRoll}
        ></Header>

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

                <ClassDescription
                  characterClass={this.state.characterClass}
                ></ClassDescription>
              </div>

              <h2 className="ability-scores--header header-default">
                Ability Scores
              </h2>

              <AbilityScores
                parentState={this.state}
                setParentState={this.updateParentState}
                updateMods={this.updateMods}
                scoreIncrease={this.scoreIncrease}
                scoreDecrease={this.scoreDecrease}
                getModValue={this.getModValue}
              ></AbilityScores>

              {this.state.strength && (
                <div>
                  <button
                    className="button button--reroll"
                    onClick={this.reRoll}
                  >
                    Reroll
                  </button>
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
// Also way to big file, chunk it down
