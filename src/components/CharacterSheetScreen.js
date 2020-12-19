/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from "react";
import classOptionsData from "../data/classOptionsData";
import CharacterSheet from "./CharacterSheet";
import {
  exportComponentAsJPEG,
  exportComponentAsPDF,
  exportComponentAsPNG
} from "react-component-export-image";

export default function CharacterSheetScreen(props) {
  const componentRef = useRef();

  useEffect(() => {
    updateLocalStorage();
  }, []);

  const updateLocalStorage = () => {
    const myCharacters = JSON.parse(window.localStorage.getItem("characters"));
    console.log("PARENT STATE ID", props.parentState.id);
    const id = props.parentState.id;

    if (myCharacters) {
      const alreadyExists = myCharacters.find(obj => {
        return obj.id === id;
      });
      if (alreadyExists) {
        console.log("Duplicate Character ID Found");
        return;
      }
    }

    if (localStorage.getItem("characters") === null) {
      let arr = [];
      arr.push(props.parentState);
      window.localStorage.setItem("characters", JSON.stringify(arr));
    } else {
      console.log("MY CHARACTERS", myCharacters);
      myCharacters.push(props.parentState);
      window.localStorage.setItem("characters", JSON.stringify(myCharacters));
    }
  };

  const resetPage = () => {
    props.showAbilityScreen();
  };

  let char = props.parentState;
  let characterClass = classOptionsData.find(
    obj => obj.name === props.parentState.characterClass
  );

  return (
    <div className="character-sheet-container container">
      <CharacterSheet
        parentState={props.parentState}
        ref={componentRef}
      ></CharacterSheet>

      {/* {state.displayShort && (
        <div className="character-short">
          <div>Name: {char.name}</div>
          <div>Class: Level 1 {char.characterClass}</div>
          <div>Alignment: {char.alignment}</div>
          <div>Armour Class: AC ({char.armour.join(", ")})</div>
          <div>
            Hit Points: {char.hitPoints}/{char.hitPoints}
          </div>
          <div>Hit Die: d{characterClass.hd}</div>
          <div>Weapons: {char.weapons.join(", ")}</div>
          <div>
            Saves: D{characterClass.savingThrows[0]} W
            {characterClass.savingThrows[1]} P{characterClass.savingThrows[2]} B
            {characterClass.savingThrows[3]} S{characterClass.savingThrows[4]}
          </div>
          <div>
            STR {char.strength} INT {char.intelligence} WIS {char.wisdom} DEX{" "}
            {char.dexterity} CON {char.constitution} CHA {char.charisma}
          </div>
          <div>Equipment: {char.equipment.join(", ")}</div>
        </div>
      )} */}

      <div className="button-container">
        <button onClick={props.showStorageSheetScreen}>Tavern</button>
        <button onClick={resetPage}>Main</button>
        <button
          onClick={() =>
            exportComponentAsPNG(componentRef, {
              fileName: char.name + " the " + char.characterClass
            })
          }
        >
          Export As PNG
        </button>
      </div>
    </div>
  );
}

// class CharacterSheetScreen extends React.Component {
//   constructor(props) {
//     super();
//     this.componentRef = React.createRef();
//     this.state = {};
//   }

//   componentDidMount() {
//     this.updateLocalStorage();
//   }

//   // savePDF = () => {
//   //   const input = document.getElementById("print-wrapper");
//   //   const pdf = new jsPDF("1", "mm", [158.75, 158.75]);
//   //   if (pdf) {
//   //     domtoimage.toPng(input).then((imgData) => {
//   //       pdf.addImage(imgData, "PNG", 0, 0);
//   //       pdf.save("download.pdf");
//   //     });
//   //   }
//   // };

//   updateLocalStorage = () => {
//     const myCharacters = JSON.parse(window.localStorage.getItem("characters"));
//     console.log("PARENT STATE ID", this.props.parentState.id);
//     const id = this.props.parentState.id;

//     if (myCharacters) {
//       const alreadyExists = myCharacters.find(obj => {
//         return obj.id === id;
//       });
//       if (alreadyExists) {
//         console.log("Duplicate ID Found");
//         return;
//       }
//     }

//     if (localStorage.getItem("characters") === null) {
//       let arr = [];
//       arr.push(this.props.parentState);
//       window.localStorage.setItem("characters", JSON.stringify(arr));
//     } else {
//       console.log("MY CHARACTERS", myCharacters);
//       myCharacters.push(this.props.parentState);
//       window.localStorage.setItem("characters", JSON.stringify(myCharacters));
//     }
//   };

//   resetPage = () => {
//     this.props.showAbilityScreen();
//   };

//   render() {
//     let char = this.props.parentState;
//     let characterClass = classOptionsData.find(
//       obj => obj.name === this.props.parentState.characterClass
//     );

//     return (
//       <div className="character-sheet-container container">
//         <CharacterSheet
//           parentState={this.props.parentState}
//           ref={this.componentRef}
//         ></CharacterSheet>

//         {this.state.displayShort && (
//           <div className="character-short">
//             <div>Name: {char.name}</div>
//             <div>Class: Level 1 {char.characterClass}</div>
//             <div>Alignment: {char.alignment}</div>
//             <div>Armour Class: AC ({char.armour.join(", ")})</div>
//             <div>
//               Hit Points: {char.hitPoints}/{char.hitPoints}
//             </div>
//             <div>Hit Die: d{characterClass.hd}</div>
//             <div>Weapons: {char.weapons.join(", ")}</div>
//             <div>
//               Saves: D{characterClass.savingThrows[0]} W
//               {characterClass.savingThrows[1]} P{characterClass.savingThrows[2]}{" "}
//               B{characterClass.savingThrows[3]} S
//               {characterClass.savingThrows[4]}
//             </div>
//             <div>
//               STR {char.strength} INT {char.intelligence} WIS {char.wisdom} DEX{" "}
//               {char.dexterity} CON {char.constitution} CHA {char.charisma}
//             </div>
//             <div>Equipment: {char.equipment.join(", ")}</div>
//           </div>
//         )}

//         <div className="button-container">
//           <button onClick={this.props.showStorageSheetScreen}>Tavern</button>
//           <button onClick={this.resetPage}>Main</button>
//           <button
//             onClick={() =>
//               exportComponentAsPNG(this.componentRef, {
//                 fileName: char.name + " the " + char.characterClass
//               })
//             }
//           >
//             Export As PNG
//           </button>
//         </div>
//       </div>
//     );
//   }
// }

// export default CharacterSheetScreen;
