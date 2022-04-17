import React from "react";
import CircleLoader from "react-spinners/CircleLoader";
import { css } from "@emotion/react";

export default function Header(props) {
  const {
    characterRolled,
    rollButtonHover,
    setRollButtonHover,
    loadingRandomNumbers,
    setLoadingRandomNumbers,
    pages,
    setPages,
    rollCharacter
  } = props;

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  const showStorageSheetScreen = () => {
    setPages(pages => {
      return {
        ...pages,
        characterStorageScreen: true,
        characterSheetScreen: false,
        abilityScreen: false
      };
    });
  };

  const myCharacters = JSON.parse(window.localStorage.getItem("characters"));

  return (
    <header className={`header ${characterRolled ? "" : "header--initial"}`}>
      <h2
        className={`title ${rollButtonHover ? "fade" : ""}`}
        style={{ fontSize: characterRolled ? "1.2rem" : "" }}
      >
        OSE Character Generator
      </h2>
      {pages.abilityScreen && !characterRolled && (
        <button
          className={`button button--roll button-primary`}
          onClick={rollCharacter}
          disabled={loadingRandomNumbers ? true : false}
          onMouseEnter={() => setRollButtonHover(true)}
          onMouseLeave={() => setRollButtonHover(false)}
        >
          {!loadingRandomNumbers && <div>Roll</div>}

          <div className="sweet-loading">
            <CircleLoader
              css={override}
              size={50}
              color={"white"}
              loading={loadingRandomNumbers}
            />
          </div>
        </button>
      )}

      {pages.abilityScreen && !characterRolled && myCharacters && (
        <button
          className={`button button--storage button-primary ${
            rollButtonHover ? "fade" : ""
          }`}
          onClick={showStorageSheetScreen}
        >
          Tavern
        </button>
      )}

      {pages.abilityScreen && !characterRolled && (
        <div
          className={`main-page--subheader ${rollButtonHover ? "fade" : ""} `}
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
  );
}
