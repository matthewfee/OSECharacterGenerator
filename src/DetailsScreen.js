/* eslint-disable react/prop-types */
import React from "react";
import jsPDF from "jspdf";
import domtoimage from "dom-to-image";

class DetailsScreen extends React.Component {
  constructor(props) {
    super();
    this.state = {
      name: "",
      alignment: null
    };
  }

  choose = array => {
    return array[Math.floor(Math.random() * array.length)];
  };

  savePDF = () => {
    const input = document.getElementById("print-wrapper");
    const pdf = new jsPDF("1", "mm", [158.75, 158.75]);
    if (pdf) {
      domtoimage.toPng(input).then(imgData => {
        pdf.addImage(imgData, "PNG", 0, 0);
        pdf.save("download.pdf");
      });
    }
  };

  handleName = event => {
    this.setState({ name: event.currentTarget.value });
  };

  handleAlignment = event => {
    console.log(event.currentTarget.value);
    this.setState({ alignment: event.currentTarget.value });

    // this.setState({alignment: "neutral"})
  };

  getName = () => {
    const firstNames = [
      "Balthazar",
      "Basil",
      "Bertram",
      "Blaxton",
      "Chadwick",
      "Clovis",
      "Jules",
      "Leopold",
      "Merrick",
      "Mortimer",
      "Ogden",
      "Orion",
      "Destrian",
      "Ellis",
      "Erasmus",
      "Faustus",
      "Finn",
      "Fitzhugh",
      "Oswald",
      "Percival",
      "Quentin",
      "Redmaine",
      "Reinhold",
      "Florian",
      "Fox",
      "Godwin",
      "Hannibal",
      "Jasper",
      "Jiles",
      "Silas",
      "Stilton",
      "Stratford",
      "Tenpiece",
      "Waverly",
      "Webster",
      "Adelaide",
      "Alma",
      "Barsaba",
      "Beatrix",
      "Bianca",
      "Cleopha",
      "Morgot",
      "Minerva",
      "Nerissa",
      "Odette",
      "Olga",
      "Orchid",
      "Clover",
      "Constance",
      "Damaris",
      "Daphne",
      "Demona",
      "Elsbeth",
      "Pepper",
      "Phoebe",
      "Piety",
      "Poppy",
      "Silence",
      "Sybil",
      "Esme",
      "Fern",
      "Hester",
      "Hippolyta",
      "Jessamine",
      "Jilly",
      "Trillby",
      "Tuesday",
      "Ursula",
      "Vivian",
      "Wendy",
      "Zora"
    ];

    const lastNames = [
      "Belvedere",
      "Bithesea",
      "Calaver",
      "Carvolo",
      "De Rippe",
      "Drolle",
      "La Marque",
      "Malmora",
      "Miter",
      "Oblington",
      "Onymous",
      "Phillifent",
      "Dunlow",
      "Edevane",
      "Erelong",
      "Febland",
      "Fernsby",
      "Fisk",
      "Portendorfer",
      "Romatet",
      "Rothery",
      "Skorbeck",
      "Slora",
      "Southwark",
      "Gastrell",
      "Girdwood",
      "Gorgon",
      "Grimeson",
      "Gruger",
      "Hitheryon",
      "Stavish",
      "Vandermeer",
      "Wellbelove",
      "Westergren",
      "Wexley",
      "Wilberforce",

      "Barrow",
      "Beetleman",
      "Berrycloth",
      "Birdwhistle",
      "Bobich",
      "Chips",
      "Knibbs",
      "Midnighter",
      "Needle",
      "Nethercoat",
      "Pestle",
      "Relish",
      "Coffin",
      "Crumpling",
      "Culpepper",
      "Dankworth",
      "Digworthy",
      "Dreggs",
      "Rumbold",
      "Rummage",
      "Sallow",
      "Saltmarsh",
      "Silverless",
      "Skitter",
      "Gimble",
      "Graveworm",
      "Greelish",
      "Hardwick",
      "Hatman",
      "Hovel",
      "Slee",
      "Slitherly",
      "Stoker",
      "Tarwater",
      "Tumbler",
      "Villin"
    ];

    let fullName = `${this.choose(firstNames)} ${this.choose(lastNames)}`;

    this.setState({ name: fullName });
  };

  getAppearance = () => {
    console.log("APPEARANCE BUTTON CLICKED");

    const appearances = [
      "aquiline",
      "athletic",
      "barrel-chested",
      "boney",
      "brawny",
      "brutish",
      "bullnecked",
      "chiseled",
      "coltish",
      "corpulent",
      "craggy",
      "delicate",
      "furrowed",
      "gaunt",
      "gorgeous",
      "grizzled",
      "haggard",
      "handsome",
      "hideous",
      "lanky",
      "pudgy",
      "ripped",
      "rosy",
      "scrawny",
      "sinewy",
      "slender",
      "slumped",
      "solid",
      "square-jawed",
      "statuesque",
      "towering",
      "trim",
      "weathered",
      "willowy",
      "wiry",
      "wrinkly"
    ];

    let object = { appearance: this.choose(appearances) };
    this.setState(object);
  };

  getBackground = () => {
    let bgs = [];
    bgs = bgs.concat(Array(3).fill("Animal trainer"));
    bgs = bgs.concat(Array(2).fill("Armorer"));
    bgs = bgs.concat(Array(4).fill("Baker"));
    bgs = bgs.concat(Array(3).fill("Blacksmith"));
    bgs = bgs.concat(Array(1).fill("Bookbinder"));
    bgs = bgs.concat(Array(4).fill("Bowyer/fletcher"));
    bgs = bgs.concat(Array(4).fill("Brewer"));
    bgs = bgs.concat(Array(3).fill("Butcher"));
    bgs = bgs.concat(Array(3).fill("Carpenter"));
    bgs = bgs.concat(Array(3).fill("Chandler"));
    bgs = bgs.concat(Array(3).fill("Cooper"));
    bgs = bgs.concat(Array(2).fill("Coppersmith"));
    bgs = bgs.concat(Array(10).fill("Farmer"));
    bgs = bgs.concat(Array(4).fill("Fisher"));
    bgs = bgs.concat(Array(4).fill("Furrier"));
    bgs = bgs.concat(Array(1).fill("Glassblower"));
    bgs = bgs.concat(Array(4).fill("Hunter"));
    bgs = bgs.concat(Array(3).fill("Jeweller"));
    bgs = bgs.concat(Array(3).fill("Lorimer"));
    bgs = bgs.concat(Array(1).fill("Cartographer"));
    bgs = bgs.concat(Array(3).fill("Mason"));
    bgs = bgs.concat(Array(3).fill("Miner"));
    bgs = bgs.concat(Array(3).fill("Potter"));
    bgs = bgs.concat(Array(2).fill("Roper"));
    bgs = bgs.concat(Array(3).fill("Sailor"));
    bgs = bgs.concat(Array(3).fill("Shipwright"));
    bgs = bgs.concat(Array(3).fill("Tailor"));
    bgs = bgs.concat(Array(3).fill("Tanner"));
    bgs = bgs.concat(Array(3).fill("Thatcher"));
    bgs = bgs.concat(Array(3).fill("Lumberjack"));
    bgs = bgs.concat(Array(2).fill("Vinter"));
    bgs = bgs.concat(Array(1).fill("Noble bastard"));
    let object = { background: this.choose(bgs) };

    this.setState(object);
  };

  getPersonality = () => {
    var traits = [
      "boorish",
      "aggressive",
      "arrogant",
      "cruel",
      "compulsive",
      "rude",
      "paranoid",
      "greedy",
      "hateful",
      "ambitious",
      "insane",
      "intolerant",
      "lustful",
      "pessimistic",
      "absent-minded",
      "amiable",
      "nervous",
      "eccentric",
      "bookish",
      "chill",
      "mischievous",
      "loquacious",
      "homesick",
      "humble",
      "curious",
      "flirtatious",
      "foolhardy",
      "flamboyant",
      "stoic",
      "gregarious",
      "secretive",
      "naive",
      "proud",
      "taciturn",
      "superstitious",
      "devoted",
      "friendly",
      "faithful",
      "eloquent",
      "brave",
      "cautious",
      "celibate",
      "generous",
      "cheerful",
      "confident",
      "polite",
      "resolute",
      "persuasive",
      "industrious",
      "strict",
      "merciful",
      "gentle-hearted",
      "protective",
      "helpful",
      "honorable",
      "loyal",
      "shrewd",
      "pure"
    ];
    var num = 2;
    var selected = [];
    for (let i = 0; i < num; i++) {
      var trait = this.choose(traits);
      selected.push(trait);
      traits = traits.filter(k => k !== trait);
    }

    console.log(selected, selected.join(", "));

    this.setState({ personality: selected.join(", ") });
  };

  render() {
    return (
      <div className="details-screen-container">
        <div id="print-wrapper">
          <h3 className="header-default">Character Details</h3>

          <div className="character-details-form">
            <label className="form-label form-label--name">
              <div className="form-text">Choose Name:</div>
              <input
                className="form-input"
                type="text"
                value={this.state.name}
                onChange={this.handleName}
              />
              <button
                className="button button--random-name"
                onClick={this.getName}
                type="button"
              >
                Random Name
              </button>
            </label>

            <div className="form-label form-label--alignment">
              <div className="form-text">Select Alignment:</div>

              <button
                type="button"
                value="lawful"
                className={
                  this.state.alignment === "lawful"
                    ? "button button--alignment button--alignment--selected"
                    : "button button--alignment"
                }
                onClick={e => this.handleAlignment(e, "value")}
              >
                Lawful
              </button>
              <button
                type="button"
                value="neutral"
                className={
                  this.state.alignment === "neutral"
                    ? "button button--alignment button--alignment--selected"
                    : "button button--alignment"
                }
                onClick={e => this.handleAlignment(e, "value")}
              >
                Neutral
              </button>
              <button
                type="button"
                value="chaotic"
                className={
                  this.state.alignment === "chaotic"
                    ? "button button--alignment button--alignment--selected"
                    : "button button--alignment"
                }
                onClick={e => this.handleAlignment(e, "value")}
              >
                Chaotic
              </button>
            </div>

            <div className="form-label form-label--optional-details">
              <div type="button" className="form-text">
                Optional Details
              </div>

              {!this.state.appearance && (
                <button
                  type="button"
                  className="button button--optional-details"
                  onClick={this.getAppearance}
                >
                  Roll Appearance
                </button>
              )}

              {this.state.appearance && (
                <div className="details-result">
                  <span className="details-result--name"> Appearance: </span>
                  <span className="details-result--data">
                    {" "}
                    {this.state.appearance}
                  </span>
                </div>
              )}

              {!this.state.personality && (
                <button
                  type="button"
                  className="button button--optional-details"
                  onClick={this.getPersonality}
                >
                  Roll Personality
                </button>
              )}

              {this.state.personality && (
                <div className="details-result">
                  <span className="details-result--name">Personality:</span>
                  <span className="details-result--data">
                    {this.state.personality}
                  </span>
                </div>
              )}

              {!this.state.background && (
                <button
                  type="button"
                  className="button button--optional-details"
                  onClick={this.getBackground}
                >
                  Roll Background
                </button>
              )}

              {this.state.background && (
                <div className="details-result">
                  <span className="details-result--name">Failed Career:</span>
                  <span className="details-result--data">
                    {this.state.background}
                  </span>
                </div>
              )}
            </div>
          </div>

          <button
            className="button button--character-sheet"
            onClick={() => {
              let stateObject = {
                name: this.state.name,
                alignment: this.state.alignment,
                appearance: this.state.appearance,
                background: this.state.background,
                personality: this.state.personality
              };
              this.props.updateParentState(stateObject);
              this.props.showCharacterSheetScreen();
            }}
          >
            Go to Character Sheet
          </button>
        </div>
      </div>
    );
  }
}

export default DetailsScreen;
