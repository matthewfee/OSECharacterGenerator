import React from "react";
import CircleLoader from "react-spinners/CircleLoader";
import { css } from "@emotion/react";

export default function Header(props) {
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;
  let characterRolled = props.parentState.strength ? true : false;
  const myCharacters = JSON.parse(window.localStorage.getItem("characters"));

  return (
    <header className={characterRolled ? "header" : "header header--initial"}>
      <h2
        className={props.parentState.rollButtonHover ? "title fade" : "title"}
        style={{ fontSize: characterRolled ? "1.2rem" : "" }}
      >
        OSE Character Generator
      </h2>
      {props.parentState.abilityScreen && !characterRolled && (
        <button
          className={`button button--roll button-primary`}
          onClick={props.reRoll}
          disabled={props.parentState.loading ? true : false}
          onMouseEnter={() =>
            props.updateParentState({ rollButtonHover: true })
          }
          onMouseLeave={() =>
            props.updateParentState({ rollButtonHover: false })
          }
        >
          {!props.parentState.loading && <div>Roll</div>}
          <div className="sweet-loading">
            <CircleLoader
              css={override}
              size={50}
              color={"white"}
              loading={props.parentState.loading}
            />
          </div>
        </button>
      )}
      {props.parentState.abilityScreen && !characterRolled && myCharacters && (
        <button
          className={`button button--storage button-primary ${
            props.parentState.rollButtonHover ? "fade" : ""
          }`}
          onClick={props.showStorageSheetScreen}
        >
          Tavern
        </button>
      )}

      {props.parentState.abilityScreen && !characterRolled && (
        <div
          className={`main-page--subheader ${
            props.parentState.rollButtonHover ? "fade" : ""
          } `}
        >
          Designed for use with{" "}
          <a href="https://necroticgnome.com/"> Old School Essentials</a>. OSE
          Advanced Fantasy classes included with the permission of Necrotic
          Gnome.
          <br></br>
          All dice values are generated from{" "}
          <a href="https://www.random.org/">RANDOM.ORG</a>. <br></br> <br></br>
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

    //   {/* {this.state.abilityScreen && !this.state.strength && (
    //     <button
    //       className={`button button--roll button-primary`}
    //       onClick={this.reRoll}
    //       disabled={this.state.loading ? true : false}
    //       onMouseEnter={() => this.setState({ rollButtonHover: true })}
    //       onMouseLeave={() => this.setState({ rollButtonHover: false })}
    //     >
    //       {!this.state.loading && <div>Roll</div>}
    //       <div className="sweet-loading">
    //         <CircleLoader
    //           css={override}
    //           size={50}
    //           color={"white"}
    //           loading={this.state.loading}
    //         />
    //       </div>
    //     </button>
    //   )}
    //   {this.state.abilityScreen && !this.state.strength && myCharacters && (
    //     <button
    //       className={`button button--storage button-primary ${
    //         this.state.rollButtonHover ? "fade" : ""
    //       }`}
    //       onClick={this.showStorageSheetScreen}
    //     >
    //       Tavern
    //     </button>
    //   )}
    //   {this.state.abilityScreen && !this.state.strength && (
    //     <div
    //       className={`main-page--subheader ${
    //         this.state.rollButtonHover ? "fade" : ""
    //       } `}
    //     >
    //       Designed for use with{" "}
    //       <a href="https://necroticgnome.com/"> Old School Essentials</a>. OSE
    //       Advanced Fantasy classes included with the permission of Necrotic
    //       Gnome.
    //       <br></br>
    //       All dice values are generated from{" "}
    //       <a href="https://www.random.org/">RANDOM.ORG</a>. <br></br> <br></br>
    //       <br></br>
    //       <br></br>
    //       <br></br>
    //       <br></br>
    //       <br></br>
    //       <a
    //         href="https://eviltables.dev/ose-character-generator/"
    //         className="main-page--subheadername"
    //       >
    //         Created by EvilTables
    //       </a>
    //     </div>
    //   )} */}
  );
}
